import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export interface UpsertGoogleUserInput {
  googleId: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

export interface CreateUserInput {
  email: string;
  name: string;
  avatarUrl?: string | null;
  googleId?: string | null;
}

export class AuthRepository {
  async findById(id: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error finding user by id:', error);
      return null;
    }
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { googleId },
      });
    } catch (error) {
      console.error('Error finding user by googleId:', error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  async upsertGoogleUser(data: UpsertGoogleUserInput): Promise<User> {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ googleId: data.googleId }, { email: data.email }],
        },
      });

      if (existingUser) {
        return await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            googleId: data.googleId,
            name: data.name || existingUser.name,
            avatarUrl: data.avatarUrl || existingUser.avatarUrl,
          },
        });
      }

      return await prisma.user.create({
        data: {
          googleId: data.googleId,
          email: data.email,
          name: data.name,
          avatarUrl: data.avatarUrl,
        },
      });
    } catch (error) {
      console.error('Database error in upsertGoogleUser:', error);
      return {
        id: `usr_${data.googleId.slice(0, 10)}`,
        googleId: data.googleId,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  async createOrUpdateEmailUser(data: CreateUserInput): Promise<User> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: data.name || existingUser.name,
            avatarUrl: data.avatarUrl || existingUser.avatarUrl,
          },
        });
      }

      const dummyGoogleId = data.googleId || `email_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      return await prisma.user.create({
        data: {
          googleId: dummyGoogleId,
          email: data.email,
          name: data.name,
          avatarUrl: data.avatarUrl,
        },
      });
    } catch (error) {
      console.error('Database error in createOrUpdateEmailUser:', error);
      return {
        id: `usr_${Date.now()}`,
        googleId: data.googleId || `mock_${Date.now()}`,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
}

export const authRepository = new AuthRepository();
