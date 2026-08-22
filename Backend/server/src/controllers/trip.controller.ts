import { Request, Response } from 'express';
import { tripService } from '../services/trip.service';

export class TripController {
  async getTrips(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const trips = await tripService.getTrips(userId);
      res.json(trips);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTrip(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const { id } = req.params as Record<string, string>;
      const trip = await tripService.getTripDetails(id, userId);
      res.json(trip);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async createTrip(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const tripData = req.body;
      const trip = await tripService.createTrip(userId, tripData);
      res.status(201).json(trip);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async addStop(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const { id } = req.params as Record<string, string>;
      const stopData = req.body;
      const stop = await tripService.addStopToTrip(id, userId, stopData);
      res.status(201).json(stop);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const tripController = new TripController();
