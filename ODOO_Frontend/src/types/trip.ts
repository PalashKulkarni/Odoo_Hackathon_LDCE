/* Trip domain types — based on Architecture.md and shared contract */

export type TripStatus = 'ACTIVE' | 'COMPLETED';

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  isPublic: boolean;
  stops?: TripStop[];
  coverImage?: string;
}

export interface TripStop {
  id: string;
  tripId: string;
  cityId: string;
  city: City;
  sequence: number;
  arrivalDate?: string;
  departureDate?: string;
  activities?: StopActivity[];
}

export interface City {
  id: string;
  name: string;
  country: string;
  imageUrl?: string;
}

export interface StopActivity {
  id: string;
  stopId: string;
  activityId: string;
  activity: Activity;
  day?: number;
  startTime?: string;
  endTime?: string;
  notes?: string;
}

export interface Activity {
  id: string;
  cityId: string;
  title: string;
  description?: string;
  category?: ActivityCategory;
  estimatedCost?: number;
  estimatedDuration?: number; // minutes
  imageUrl?: string;
}

export type ActivityCategory =
  | 'sightseeing'
  | 'food'
  | 'culture'
  | 'nature'
  | 'shopping'
  | 'nightlife'
  | 'transport'
  | 'accommodation'
  | 'other';

export interface TripShare {
  id: string;
  tripId: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

/* Form types for creation */
export interface CreateTripInput {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface AddStopInput {
  cityId: string;
  arrivalDate?: string;
  departureDate?: string;
}

export interface AddActivityInput {
  activityId: string;
  day?: number;
  startTime?: string;
  endTime?: string;
  notes?: string;
}
