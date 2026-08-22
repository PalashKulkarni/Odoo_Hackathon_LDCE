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
  const isLoggedIn = localStorage.getItem('gt_mock_auth') === 'true';
  if (!isLoggedIn) return null;
  const storedProfile = localStorage.getItem('gt_user_profile');
  if (storedProfile) {
    try {
      return JSON.parse(storedProfile);
    } catch {
      return mockUser;
    }
  }
  return mockUser;
}

export async function mockLogin(email?: string): Promise<User> {
  await mockDelay(500);
  localStorage.setItem('gt_mock_auth', 'true');
  const storedProfile = localStorage.getItem('gt_user_profile');
  let user = mockUser;
  if (storedProfile) {
    try {
      user = JSON.parse(storedProfile);
    } catch {
      user = mockUser;
    }
  } else if (email) {
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    user = {
      ...mockUser,
      email,
      name: formattedName || mockUser.name,
    };
    localStorage.setItem('gt_user_profile', JSON.stringify(user));
  }
  return user;
}

export async function mockRegister(data: { name: string; email: string; travelStyle?: string }): Promise<User> {
  await mockDelay(600);
  localStorage.setItem('gt_mock_auth', 'true');
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name.trim() || 'Fellow Traveler',
    email: data.email.trim(),
    avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(data.name || 'Traveler')}&backgroundColor=d66d4e,f5ddd5`,
  };
  localStorage.setItem('gt_user_profile', JSON.stringify(newUser));
  if (data.travelStyle) {
    localStorage.setItem('gt_travel_style', data.travelStyle);
  }
  return newUser;
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
  const foundTrip = mockTrips.find((t) => t.id === tripId);
  if (foundTrip && foundTrip.stops) return foundTrip.stops;
  if (tripId === 'trip-japan') return mockStops;
  return [];
}

/* ---- Budget ---- */
export async function mockGetBudget(tripId: string): Promise<BudgetSummary | null> {
  await mockDelay(350);
  if (tripId === 'trip-rajasthan') {
    return {
      tripId: 'trip-rajasthan',
      totalEstimated: 38500,
      currency: '₹',
      categories: [
        { name: 'Heritage Havelis & Palaces', amount: 16000, percentage: 41 },
        { name: 'Private Chauffeur & Transit', amount: 11000, percentage: 29 },
        { name: 'Fort Entry & Guides', amount: 5500, percentage: 14 },
        { name: 'Royal Rajasthani Cuisine', amount: 6000, percentage: 16 },
      ],
    };
  }
  if (tripId === 'trip-kerala') {
    return {
      tripId: 'trip-kerala',
      totalEstimated: 29000,
      currency: '₹',
      categories: [
        { name: 'Houseboat & Plantation Stay', amount: 13500, percentage: 46 },
        { name: 'Scenic Transit & Transfers', amount: 7500, percentage: 26 },
        { name: 'Safari & Cultural Shows', amount: 4200, percentage: 15 },
        { name: 'Seafood & Traditional Meals', amount: 3800, percentage: 13 },
      ],
    };
  }
  if (tripId === 'trip-tokyo') {
    return {
      tripId: 'trip-tokyo',
      totalEstimated: 24500,
      currency: '₹',
      categories: [
        { name: 'Boutique Hotel', amount: 11000, percentage: 45 },
        { name: 'Omakase & Izakaya', amount: 7500, percentage: 31 },
        { name: 'TeamLab & Observation', amount: 4200, percentage: 17 },
        { name: 'Metro Pass', amount: 1800, percentage: 7 },
      ],
    };
  }
  if (tripId === 'trip-japan') return mockBudget;
  return {
    tripId,
    totalEstimated: 42000,
    currency: '₹',
    categories: [
      { name: 'Heritage Stay', amount: 18000, percentage: 43 },
      { name: 'Transit & Passes', amount: 12000, percentage: 28 },
      { name: 'Activities & Dining', amount: 12000, percentage: 29 },
    ],
  };
}

/* ---- AI Copilot ---- */
const aiResponses: Record<string, string> = {
  default: "I've reviewed your itinerary. Here are some observations:\n\n• In **Udaipur**, scheduling your Lake Pichola boat cruise at 5:15 PM guarantees golden hour light against the City Palace marble facade.\n• In **Jaipur**, visit Amer Fort at 8:30 AM before tour bus traffic, leaving the afternoon open for Hawa Mahal and Johari Bazaar.",
  activities: "Based on your travels across India and Asia, here are handpicked experiences:\n\n• **Sam Sand Dunes** (Jaisalmer) — Stargazing and folk music around desert campfires\n• **Kolukkumalai Tea Estate** (Munnar) — Highest organic tea plantation jeep safari at dawn\n• **Fushimi Inari** (Kyoto) — Serene morning hike through thousands of vermillion torii gates",
  budget: "Looking at your estimated budget:\n\n• Heritage stays and houseboats offer exceptional value when booked directly.\n• Local dining across Rajasthan and Kerala keeps food expenses very well optimized.",
  itinerary: "Your itinerary pacing is well balanced. One tip:\n\nFor high-altitude Ladakh and mountain routes, allow Day 1 entirely for acclimatization in Leh before heading to Khardung La and Pangong Tso.",
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
