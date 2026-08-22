/* User preference types — based on Architecture.md personalization feature */

export interface UserPreference {
  id: string;
  userId: string;
  travelStyle?: TravelStyle;
  budgetPreference?: BudgetPreference;
  interests: string[];
}

export type TravelStyle =
  | 'adventurous'
  | 'relaxed'
  | 'cultural'
  | 'luxury'
  | 'budget'
  | 'balanced';

export type BudgetPreference =
  | 'budget'
  | 'moderate'
  | 'premium'
  | 'luxury';
