import { TripStatus, ExpenseCategory } from '@prisma/client';

export interface User {
  id: string;
  googleId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  tripStopId: string;
  name: string;
  type: string;
  cost: number;
  durationMin: number | null;
  scheduledDate: Date;
  scheduledTime: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripStop {
  id: string;
  tripId: string;
  cityId: string;
  order: number;
  startDate: Date;
  endDate: Date;
  activities?: Activity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TripExpense {
  id: string;
  tripId: string;
  category: ExpenseCategory;
  amount: number;
  note: string | null;
  createdAt: Date;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  coverImage: string | null;
  status: TripStatus;
  isPublic: boolean;
  publicSlug: string | null;
  stops?: TripStop[];
  expenses?: TripExpense[];
  createdAt: Date;
  updatedAt: Date;
}