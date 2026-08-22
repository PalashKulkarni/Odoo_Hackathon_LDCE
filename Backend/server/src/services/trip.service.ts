import { tripRepository } from '../repositories/trip.repository';
import { Prisma } from '@prisma/client';

export class TripService {
  async getTrips(userId: string) {
    return tripRepository.findAllByUserId(userId);
  }

  async getTripDetails(id: string, userId: string) {
    const trip = await tripRepository.findById(id, userId);
    if (!trip) throw new Error('Trip not found');
    return trip;
  }

  async createTrip(userId: string, data: Omit<Prisma.TripUncheckedCreateInput, 'userId'>) {
    return tripRepository.create({
      ...data,
      userId,
    });
  }

  async addStopToTrip(tripId: string, userId: string, data: Omit<Prisma.TripStopUncheckedCreateInput, 'tripId'>) {
    return tripRepository.addStop(tripId, userId, {
      ...data,
      tripId,
    });
  }
}

export const tripService = new TripService();
