import { tripRepository } from '../repositories/trip.repository';
import { Prisma } from '@prisma/client';

export class ItineraryService {
  async addActivityToStop(
    tripId: string,
    userId: string,
    tripStopId: string,
    data: Omit<Prisma.ActivityUncheckedCreateInput, 'tripStopId'>
  ) {
    // Check if trip belongs to user and stop belongs to trip
    const trip = await tripRepository.findById(tripId, userId);
    if (!trip) throw new Error('Trip not found');
    
    const stopExists = trip.stops.find((s) => s.id === tripStopId);
    if (!stopExists) throw new Error('Stop not found in this trip');

    return tripRepository.addActivity(tripStopId, {
      ...data,
      tripStopId,
    });
  }

  async generateTimeline(tripId: string, userId: string) {
    const trip = await tripRepository.findById(tripId, userId);
    if (!trip) throw new Error('Trip not found');

    const timeline: Record<string, any[]> = {};

    trip.stops.forEach((stop) => {
      stop.activities.forEach((activity) => {
        const dateKey = activity.scheduledDate.toISOString().split('T')[0];
        if (!timeline[dateKey]) {
          timeline[dateKey] = [];
        }
        timeline[dateKey].push({
          ...activity,
          city: stop.city.name,
        });
      });
    });

    return timeline;
  }
}

export const itineraryService = new ItineraryService();
