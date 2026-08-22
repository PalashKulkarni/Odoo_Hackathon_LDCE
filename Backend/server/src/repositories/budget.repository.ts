import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class BudgetRepository {
  async getTripExpenses(tripId: string) {
    return prisma.tripExpense.findMany({
      where: { tripId },
    });
  }

  async getTripActivitiesCosts(tripId: string) {
    return prisma.activity.findMany({
      where: {
        tripStop: {
          tripId
        }
      },
      select: {
        id: true,
        name: true,
        cost: true,
        type: true
      }
    });
  }

  async addExpense(data: Prisma.TripExpenseUncheckedCreateInput) {
    return prisma.tripExpense.create({
      data,
    });
  }
}

export const budgetRepository = new BudgetRepository();
