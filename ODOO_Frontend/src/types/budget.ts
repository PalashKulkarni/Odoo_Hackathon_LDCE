/* Budget types — based on Architecture.md budget feature */

export interface BudgetSummary {
  tripId: string;
  totalEstimated: number;
  currency: string;
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
}
