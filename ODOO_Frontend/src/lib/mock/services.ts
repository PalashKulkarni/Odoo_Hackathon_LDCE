/**
 * Mock API Services
 * 
 * These services simulate backend API calls using mock data.
 * They follow the same interface that real API calls would use,
 * making it trivial to swap to real endpoints later.
 */

import type { Trip, TripStop, CreateTripInput } from '@/types';
import type { BudgetSummary } from '@/types';
import type { User } from '@/types';
import type { AIMessage, AICopilotResponse } from '@/types';
import { mockUser, mockTrips, mockStops, mockBudget, mockDelay } from './data';

/* ---- Auth ---- */
export async function mockGetCurrentUser(): Promise<User | null> {
  await mockDelay(300);
  // Simulate authenticated state
  const isLoggedIn = localStorage.getItem('gt_mock_auth') === 'true';
  return isLoggedIn ? mockUser : null;
}

export async function mockLogin(): Promise<User> {
  await mockDelay(500);
  localStorage.setItem('gt_mock_auth', 'true');
  return mockUser;
}

export async function mockLogout(): Promise<void> {
  await mockDelay(200);
  localStorage.removeItem('gt_mock_auth');
}

/* ---- Trips ---- */
export async function mockGetTrips(): Promise<Trip[]> {
  await mockDelay(400);
  return mockTrips;
}

export async function mockGetTrip(tripId: string): Promise<Trip | null> {
  await mockDelay(300);
  const trip = mockTrips.find((t) => t.id === tripId);
  return trip ?? null;
}

export async function mockCreateTrip(input: CreateTripInput): Promise<Trip> {
  await mockDelay(600);
  const newTrip: Trip = {
    id: `trip-${Date.now()}`,
    userId: mockUser.id,
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate,
    status: 'ACTIVE',
    isPublic: false,
    stops: [],
  };
  mockTrips.push(newTrip);
  return newTrip;
}

/* ---- Trip Stops ---- */
export async function mockGetTripStops(tripId: string): Promise<TripStop[]> {
  await mockDelay(300);
  if (tripId === 'trip-japan') return mockStops;
  return [];
}

/* ---- Budget ---- */
export async function mockGetBudget(tripId: string): Promise<BudgetSummary | null> {
  await mockDelay(350);
  if (tripId === 'trip-japan') return mockBudget;
  return null;
}

/* ---- AI Copilot ---- */
const aiResponses: Record<string, string> = {
  default: "I've reviewed your Japan trip. Here are some thoughts:\n\nDay 2 looks relatively light compared to Days 1 and 3. You might consider adding the Meiji Shrine in the morning — it's nearby Shibuya and would balance your schedule nicely.\n\nYour Kyoto days have a good mix of culture and nature. The bamboo grove and tea ceremony on Day 4 create a nice contrast.",
  activities: "Based on your trip to Japan, here are some activity suggestions:\n\n• **Meiji Shrine** (Tokyo) — A peaceful contrast to Shibuya's energy\n• **Nishiki Market** (Kyoto) — Known as 'Kyoto's Kitchen'\n• **Shinsekai District** (Osaka) — Retro neighbourhood with amazing kushikatsu",
  budget: "Looking at your estimated budget of ₹48,600:\n\n• Accommodation takes the largest share at 37%. Consider mixing hotel nights with a traditional ryokan stay in Kyoto for a unique experience at a similar price point.\n• Food costs seem reasonable for Japan. Street food in Osaka's Dotonbori is both affordable and exceptional.",
  itinerary: "Your itinerary flow looks solid. One observation:\n\nDay 3 has Fushimi Inari (3 hours) followed by Kiyomizu-dera — both are physically demanding. Consider starting Fushimi Inari early (7 AM) when it's less crowded, giving you recovery time before the afternoon.",
};

export async function mockSendAIMessage(tripId: string, message: string): Promise<AICopilotResponse> {
  await mockDelay(1500);

  let responseContent = aiResponses.default;
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('activit') || lowerMessage.includes('suggest')) {
    responseContent = aiResponses.activities;
  } else if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
    responseContent = aiResponses.budget;
  } else if (lowerMessage.includes('itinerar') || lowerMessage.includes('schedule') || lowerMessage.includes('balance')) {
    responseContent = aiResponses.itinerary;
  }

  const responseMessage: AIMessage = {
    id: `ai-${Date.now()}`,
    role: 'assistant',
    content: responseContent,
    timestamp: new Date().toISOString(),
    recommendations: lowerMessage.includes('balance') || lowerMessage.includes('itinerar')
      ? [
          {
            id: `rec-${Date.now()}`,
            type: 'schedule',
            title: 'Rebalance Day 3',
            description: 'Start Fushimi Inari at 7:00 AM instead of 9:00 AM to avoid crowds and reduce afternoon fatigue.',
            impact: {
              before: 'Day 3 · 2 activities back-to-back',
              after: 'Day 3 · 2 activities with recovery time',
            },
            status: 'pending',
          },
        ]
      : undefined,
  };

  // Use tripId to scope response (for future real implementation)
  void tripId;

  return { message: responseMessage };
}
