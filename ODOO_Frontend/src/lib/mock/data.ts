/**
 * Mock Data — Japan Trip Demo
 * 
 * This mock data is CLEARLY SEPARATED from real API calls.
 * It exists solely for frontend development and demonstration.
 * It will be replaced by real API calls when the backend is ready.
 */

import type { Trip, TripStop, City, Activity, StopActivity } from '@/types';
import type { BudgetSummary } from '@/types';
import type { User } from '@/types';

/* ---- Mock User ---- */
export const mockUser: User = {
  id: 'user-1',
  email: 'traveler@globetrotter.dev',
  name: 'Alex Traveler',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
};

/* ---- Mock Cities ---- */
export const mockCities: City[] = [
  {
    id: 'city-tokyo',
    name: 'Tokyo',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  },
  {
    id: 'city-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  },
  {
    id: 'city-osaka',
    name: 'Osaka',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80',
  },
];

/* ---- Mock Activities ---- */
export const mockActivities: Activity[] = [
  // Tokyo
  {
    id: 'act-1',
    cityId: 'city-tokyo',
    title: 'Senso-ji Temple',
    description: 'Visit Tokyo\'s oldest temple in Asakusa',
    category: 'culture',
    estimatedCost: 0,
    estimatedDuration: 90,
  },
  {
    id: 'act-2',
    cityId: 'city-tokyo',
    title: 'Tsukiji Outer Market',
    description: 'Fresh sushi and street food',
    category: 'food',
    estimatedCost: 3000,
    estimatedDuration: 120,
  },
  {
    id: 'act-3',
    cityId: 'city-tokyo',
    title: 'Shibuya Crossing',
    description: 'Experience the world\'s busiest intersection',
    category: 'sightseeing',
    estimatedCost: 0,
    estimatedDuration: 30,
  },
  {
    id: 'act-4',
    cityId: 'city-tokyo',
    title: 'TeamLab Borderless',
    description: 'Immersive digital art museum',
    category: 'culture',
    estimatedCost: 3200,
    estimatedDuration: 150,
  },
  // Kyoto
  {
    id: 'act-5',
    cityId: 'city-kyoto',
    title: 'Fushimi Inari Shrine',
    description: 'Walk through thousands of vermillion torii gates',
    category: 'culture',
    estimatedCost: 0,
    estimatedDuration: 180,
  },
  {
    id: 'act-6',
    cityId: 'city-kyoto',
    title: 'Kiyomizu-dera',
    description: 'Historic temple with panoramic views',
    category: 'culture',
    estimatedCost: 400,
    estimatedDuration: 90,
  },
  {
    id: 'act-7',
    cityId: 'city-kyoto',
    title: 'Tea Ceremony',
    description: 'Traditional Japanese tea experience',
    category: 'culture',
    estimatedCost: 2500,
    estimatedDuration: 60,
  },
  {
    id: 'act-8',
    cityId: 'city-kyoto',
    title: 'Arashiyama Bamboo Grove',
    description: 'Walk through towering bamboo stalks',
    category: 'nature',
    estimatedCost: 0,
    estimatedDuration: 60,
  },
  // Osaka
  {
    id: 'act-9',
    cityId: 'city-osaka',
    title: 'Dotonbori Food Walk',
    description: 'Street food capital of Japan',
    category: 'food',
    estimatedCost: 4000,
    estimatedDuration: 180,
  },
  {
    id: 'act-10',
    cityId: 'city-osaka',
    title: 'Osaka Castle',
    description: 'Historic castle and surrounding park',
    category: 'sightseeing',
    estimatedCost: 600,
    estimatedDuration: 120,
  },
];

/* ---- Mock Stop Activities ---- */
const mockStopActivities: Record<string, StopActivity[]> = {
  'stop-1': [
    { id: 'sa-1', stopId: 'stop-1', activityId: 'act-1', activity: mockActivities[0], day: 1, startTime: '09:00', endTime: '10:30' },
    { id: 'sa-2', stopId: 'stop-1', activityId: 'act-2', activity: mockActivities[1], day: 1, startTime: '12:00', endTime: '14:00' },
    { id: 'sa-3', stopId: 'stop-1', activityId: 'act-3', activity: mockActivities[2], day: 2, startTime: '10:00', endTime: '10:30' },
    { id: 'sa-4', stopId: 'stop-1', activityId: 'act-4', activity: mockActivities[3], day: 2, startTime: '14:00', endTime: '16:30' },
  ],
  'stop-2': [
    { id: 'sa-5', stopId: 'stop-2', activityId: 'act-5', activity: mockActivities[4], day: 3, startTime: '09:00', endTime: '12:00' },
    { id: 'sa-6', stopId: 'stop-2', activityId: 'act-6', activity: mockActivities[5], day: 3, startTime: '15:00', endTime: '16:30' },
    { id: 'sa-7', stopId: 'stop-2', activityId: 'act-7', activity: mockActivities[6], day: 4, startTime: '10:00', endTime: '11:00' },
    { id: 'sa-8', stopId: 'stop-2', activityId: 'act-8', activity: mockActivities[7], day: 4, startTime: '14:00', endTime: '15:00' },
  ],
  'stop-3': [
    { id: 'sa-9', stopId: 'stop-3', activityId: 'act-9', activity: mockActivities[8], day: 5, startTime: '11:00', endTime: '14:00' },
    { id: 'sa-10', stopId: 'stop-3', activityId: 'act-10', activity: mockActivities[9], day: 5, startTime: '15:30', endTime: '17:30' },
  ],
};

/* ---- Mock Trip Stops ---- */
export const mockStops: TripStop[] = [
  {
    id: 'stop-1',
    tripId: 'trip-japan',
    cityId: 'city-tokyo',
    city: mockCities[0],
    sequence: 1,
    arrivalDate: '2026-06-14',
    departureDate: '2026-06-16',
    activities: mockStopActivities['stop-1'],
  },
  {
    id: 'stop-2',
    tripId: 'trip-japan',
    cityId: 'city-kyoto',
    city: mockCities[1],
    sequence: 2,
    arrivalDate: '2026-06-16',
    departureDate: '2026-06-19',
    activities: mockStopActivities['stop-2'],
  },
  {
    id: 'stop-3',
    tripId: 'trip-japan',
    cityId: 'city-osaka',
    city: mockCities[2],
    sequence: 3,
    arrivalDate: '2026-06-19',
    departureDate: '2026-06-21',
    activities: mockStopActivities['stop-3'],
  },
];

/* ---- Mock Trips ---- */
export const mockTrips: Trip[] = [
  {
    id: 'trip-japan',
    userId: 'user-1',
    name: 'Japan',
    description: 'A journey through Japan\'s ancient temples, modern cities, and culinary wonders.',
    startDate: '2026-06-14',
    endDate: '2026-06-25',
    status: 'ACTIVE',
    isPublic: false,
    stops: mockStops,
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
  },
  {
    id: 'trip-italy',
    userId: 'user-1',
    name: 'Italy',
    description: 'Rome, Florence, and the Amalfi Coast.',
    startDate: '2026-09-01',
    endDate: '2026-09-14',
    status: 'ACTIVE',
    isPublic: false,
    stops: [],
    coverImage: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80',
  },
];

/* ---- Mock Budget ---- */
export const mockBudget: BudgetSummary = {
  tripId: 'trip-japan',
  totalEstimated: 48600,
  currency: '₹',
  categories: [
    { name: 'Accommodation', amount: 18000, percentage: 37 },
    { name: 'Travel', amount: 14000, percentage: 29 },
    { name: 'Activities', amount: 9800, percentage: 20 },
    { name: 'Food', amount: 6800, percentage: 14 },
  ],
};

/* ---- Mock API Delay Helper ---- */
export function mockDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
