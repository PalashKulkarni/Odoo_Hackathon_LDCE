import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class TripRepository {
  async findAllByUserId(userId: string) {
    return prisma.trip.findMany({
      where: { userId },
      orderBy: { startDate: 'asc' },
      include: { stops: { include: { city: true } } },
    });
  }

  async findById(id: string, userId: string) {
    return prisma.trip.findFirst({
      where: { id, userId },
      include: {
        stops: {
          orderBy: { order: 'asc' },
          include: {
            city: true,
            activities: {
              orderBy: { scheduledDate: 'asc' }
            }
          }
        },
        expenses: true
      },
    });
  }

  async create(data: Prisma.TripUncheckedCreateInput) {
    return prisma.trip.create({
      data,
    });
  }

  async update(id: string, userId: string, data: Prisma.TripUpdateInput) {
    return prisma.trip.update({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return prisma.trip.delete({
      where: { id, userId },
    });
  }

  async addStop(tripId: string, userId: string, stopData: Prisma.TripStopUncheckedCreateInput) {
    // Verify trip ownership first
    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) throw new Error('Trip not found or unauthorized');

    return prisma.tripStop.create({
      data: stopData,
    });
  }

  async addActivity(tripStopId: string, activityData: Prisma.ActivityUncheckedCreateInput) {
    return prisma.activity.create({
      data: activityData,
    });
  }
}

export const tripRepository = new TripRepository();
