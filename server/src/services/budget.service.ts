import { budgetRepository } from '../repositories/budget.repository';
import { tripRepository } from '../repositories/trip.repository';
import { Prisma } from '@prisma/client';

export class BudgetService {
  async getTripBudgetSummary(tripId: string, userId: string) {
    // Verify user owns the trip
    const trip = await tripRepository.findById(tripId, userId);
    if (!trip) throw new Error('Trip not found or unauthorized');

    const expenses = await budgetRepository.getTripExpenses(tripId);
    const activities = await budgetRepository.getTripActivitiesCosts(tripId);

    let totalExpenses = 0;
    const expenseByCategory: Record<string, number> = {};

    expenses.forEach((exp) => {
      const amount = Number(exp.amount);
      totalExpenses += amount;
      expenseByCategory[exp.category] = (expenseByCategory[exp.category] || 0) + amount;
    });

    let totalActivities = 0;
    const activitiesByType: Record<string, number> = {};

    activities.forEach((act) => {
      const cost = Number(act.cost);
      totalActivities += cost;
      activitiesByType[act.type] = (activitiesByType[act.type] || 0) + cost;
    });

    return {
      totalBudget: totalExpenses + totalActivities,
      breakdown: {
        expenses: {
          total: totalExpenses,
          byCategory: expenseByCategory,
        },
        activities: {
          total: totalActivities,
          byType: activitiesByType,
        }
      }
    };
  }

  async addTripExpense(tripId: string, userId: string, data: Omit<Prisma.TripExpenseUncheckedCreateInput, 'tripId'>) {
    const trip = await tripRepository.findById(tripId, userId);
    if (!trip) throw new Error('Trip not found or unauthorized');

    return budgetRepository.addExpense({
      ...data,
      tripId,
    });
  }
}

export const budgetService = new BudgetService();
