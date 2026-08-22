import { Request, Response } from 'express';
import { budgetService } from '../services/budget.service';

export class BudgetController {
  async getSummary(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const { tripId } = req.params as Record<string, string>;
      
      const summary = await budgetService.getTripBudgetSummary(tripId, userId);
      res.json(summary);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async addExpense(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'mock-user-123';
      const { tripId } = req.params as Record<string, string>;
      const expenseData = req.body;
      
      const expense = await budgetService.addTripExpense(tripId, userId, expenseData);
      res.status(201).json(expense);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const budgetController = new BudgetController();
