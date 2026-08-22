import { Request, Response } from 'express';
import { copilotService } from '../services/copilot.service';

export class CopilotController {
  async chat(req: Request, res: Response): Promise<void> {
    const { tripId, message, tripContext } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    try {
      const response = await copilotService.generateCopilotResponse(
        tripId || 'default-trip',
        message,
        tripContext
      );
      res.json(response);
    } catch (error: any) {
      console.error('Copilot controller error:', error);
      res.status(500).json({ error: error.message || 'Failed to process copilot request' });
    }
  }
}

export const copilotController = new CopilotController();
