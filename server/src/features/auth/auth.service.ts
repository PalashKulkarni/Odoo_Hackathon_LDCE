import type { AuthUser } from "./auth.types";

export async function findOrCreateGoogleUser(data: {
  googleId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}): Promise<AuthUser> {
  /*
   * TODO:
   * Connect this to Prisma once the database
   * teammate's User model is ready.
   */

  return {
    id: data.googleId,
    googleId: data.googleId,
    email: data.email,
    name: data.name,
    avatarUrl: data.avatarUrl,
  };
}