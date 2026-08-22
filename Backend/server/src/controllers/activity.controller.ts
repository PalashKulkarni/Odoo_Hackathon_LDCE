import { Request, Response } from 'express';
import { itineraryService } from '../services/itinerary.service';

export class ActivityController {
  async addActivity(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const { tripId, stopId } = req.params as Record<string, string>;
      const activityData = req.body;
      
      const activity = await itineraryService.addActivityToStop(tripId, userId, stopId, activityData);
      res.status(201).json(activity);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTimeline(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const { tripId } = req.params as Record<string, string>;
      const timeline = await itineraryService.generateTimeline(tripId, userId);
      res.json(timeline);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export const activityController = new ActivityController();
