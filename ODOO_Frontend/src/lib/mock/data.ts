/**
 * Mock Data — Curated Travel Studio Dataset
 *
 * Rich demo data for Indian destinations (Rajasthan, Kerala, Ladakh, Varanasi)
 * and International journeys (Japan, Tokyo, Amalfi Coast, Swiss Alps).
 */

import type { Trip, TripStop, City, Activity, StopActivity } from '@/types';
import type { BudgetSummary } from '@/types';
import type { User } from '@/types';

/* ---- Mock User ---- */
export const mockUser: User = {
  id: 'user-1',
  email: 'traveler@globetrotter.dev',
  name: 'Alex Traveler',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face',
};

/* ---- Mock Cities ---- */
export const mockCities: City[] = [
  // India
  {
    id: 'city-jaipur',
    name: 'Jaipur',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1000&q=80',
  },
  {
    id: 'city-jodhpur',
    name: 'Jodhpur',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1000&q=80',
  },
  {
    id: 'city-udaipur',
    name: 'Udaipur',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=1000&q=80',
  },
  {
    id: 'city-munnar',
    name: 'Munnar',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1586796676774-c93004ae009f?w=1000&q=80',
  },
  {
    id: 'city-alleppey',
    name: 'Alleppey',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80',
  },
  {
    id: 'city-leh',
    name: 'Leh & Ladakh',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1000&q=80',
  },
  {
    id: 'city-varanasi',
    name: 'Varanasi',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1000&q=80',
  },

  // Japan & International
  {
    id: 'city-tokyo',
    name: 'Tokyo',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1000&q=80',
  },
  {
    id: 'city-hakone',
    name: 'Hakone & Mt. Fuji',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=1000&q=80',
  },
  {
    id: 'city-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&q=80',
  },
  {
    id: 'city-osaka',
    name: 'Osaka',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1000&q=80',
  },
  {
    id: 'city-shibuya',
    name: 'Shibuya & Harajuku',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&q=80',
  },
  {
    id: 'city-shinjuku',
    name: 'Shinjuku & Ginza',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1000&q=80',
  },
  {
    id: 'city-positano',
    name: 'Positano & Amalfi',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1000&q=80',
  },
  {
    id: 'city-zermatt',
    name: 'Zermatt & Matterhorn',
    country: 'Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1000&q=80',
  },
];

/* ---- Mock Activities ---- */
export const mockActivities: Activity[] = [
  // Jaipur
  {
    id: 'act-j1',
    cityId: 'city-jaipur',
    title: 'Amer Fort & Sheesh Mahal Exploration',
    description: 'Walk through hilltop Rajput sandstone ramparts and mirror mosaic courtyards.',
    category: 'culture',
    estimatedCost: 500,
    estimatedDuration: 180,
  },
  {
    id: 'act-j2',
    cityId: 'city-jaipur',
    title: 'Hawa Mahal & Old Pink City Walk',
    description: 'Marvel at 953 jharokha honeycomb windows and traditional Johari Bazaar jewelry.',
    category: 'sightseeing',
    estimatedCost: 200,
    estimatedDuration: 90,
  },
  {
    id: 'act-j3',
    cityId: 'city-jaipur',
    title: 'Jal Mahal Twilight Promenade',
    description: 'Sunset lakeside stroll overlooking the illuminated water palace.',
    category: 'sightseeing',
    estimatedCost: 0,
    estimatedDuration: 60,
  },

  // Jodhpur
  {
    id: 'act-jd1',
    cityId: 'city-jodhpur',
    title: 'Mehrangarh Fort & Rampart Vista',
    description: 'One of India’s grandest forts with panoramic views of the blue city below.',
    category: 'culture',
    estimatedCost: 600,
    estimatedDuration: 150,
  },
  {
    id: 'act-jd2',
    cityId: 'city-jodhpur',
    title: 'Navchokiya Blue Alleys Walk',
    description: 'Photograph indigo-painted Brahmin homes, stepwells, and artisanal spice stalls.',
    category: 'sightseeing',
    estimatedCost: 0,
    estimatedDuration: 90,
  },

  // Udaipur
  {
    id: 'act-u1',
    cityId: 'city-udaipur',
    title: 'City Palace Royal Heritage Tour',
    description: 'Explore Rajasthan’s largest palace complex overlooking Lake Pichola.',
    category: 'culture',
    estimatedCost: 400,
    estimatedDuration: 150,
  },
  {
    id: 'act-u2',
    cityId: 'city-udaipur',
    title: 'Lake Pichola Golden Hour Boat Cruise',
    description: 'Sunset boat voyage gliding past Jag Mandir and the Lake Palace.',
    category: 'sightseeing',
    estimatedCost: 800,
    estimatedDuration: 60,
  },

  // Munnar & Kerala
  {
    id: 'act-k1',
    cityId: 'city-munnar',
    title: 'Kolukkumalai Sunrise Tea Estate Safari',
    description: 'Jeep trek to the world’s highest organic tea plantation for breathtaking valley mist.',
    category: 'nature',
    estimatedCost: 2200,
    estimatedDuration: 180,
  },
  {
    id: 'act-k2',
    cityId: 'city-alleppey',
    title: 'Alleppey Kettuvallam Luxury Houseboat',
    description: 'Private wooden houseboat voyage through palm-fringed canals with authentic Sadhya feast.',
    category: 'nature',
    estimatedCost: 9500,
    estimatedDuration: 360,
  },

  // Ladakh
  {
    id: 'act-l1',
    cityId: 'city-leh',
    title: 'Thiksey Monastery Dawn Chanting',
    description: 'Morning prayer ceremony with Tibetan lamas overlooking Indus valley.',
    category: 'culture',
    estimatedCost: 100,
    estimatedDuration: 120,
  },
  {
    id: 'act-l2',
    cityId: 'city-leh',
    title: 'Pangong Tso High-Altitude Lake Excursion',
    description: 'Vibrant turquoise waters changing hues beneath towering snow-capped mountain peaks.',
    category: 'nature',
    estimatedCost: 4500,
    estimatedDuration: 300,
  },

  // Tokyo
  {
    id: 'act-1',
    cityId: 'city-tokyo',
    title: 'Senso-ji Temple & Dawn Walk',
    description: 'Explore Tokyo’s oldest heritage temple before morning crowds arrive.',
    category: 'culture',
    estimatedCost: 0,
    estimatedDuration: 90,
  },
  {
    id: 'act-2',
    cityId: 'city-tokyo',
    title: 'Tsukiji Outer Market Sushi Trail',
    description: 'Artisanal sushi breakfast, wagyu skewers, and matcha sweets.',
    category: 'food',
    estimatedCost: 3500,
    estimatedDuration: 120,
  },
  {
    id: 'act-3',
    cityId: 'city-tokyo',
    title: 'Shibuya Crossing & Shibuya Sky',
    description: 'Panoramic 360-degree glass rooftop sunset views over the capital.',
    category: 'sightseeing',
    estimatedCost: 2200,
    estimatedDuration: 90,
  },
  {
    id: 'act-4',
    cityId: 'city-tokyo',
    title: 'teamLab Borderless Digital Museum',
    description: 'World-renowned interactive immersive light sculptures in Azabudai Hills.',
    category: 'culture',
    estimatedCost: 3800,
    estimatedDuration: 150,
  },

  // Hakone & Kyoto
  {
    id: 'act-h1',
    cityId: 'city-hakone',
    title: 'Lake Ashi Cruise & Mt. Fuji Vista',
    description: 'Sightseeing cruise across volcanic Lake Ashi with iconic torii gate backdrop.',
    category: 'nature',
    estimatedCost: 1800,
    estimatedDuration: 120,
  },
  {
    id: 'act-h2',
    cityId: 'city-hakone',
    title: 'Private Open-Air Ryokan Onsen',
    description: 'Mineral-rich thermal waters and traditional multi-course Kaiseki dinner.',
    category: 'nature',
    estimatedCost: 12000,
    estimatedDuration: 180,
  },
  {
    id: 'act-5',
    cityId: 'city-kyoto',
    title: 'Fushimi Inari Vermillion Torii Gates',
    description: 'Early morning hike up the sacred mountain through 10,000 torii gates.',
    category: 'culture',
    estimatedCost: 0,
    estimatedDuration: 180,
  },
  {
    id: 'act-6',
    cityId: 'city-kyoto',
    title: 'Kiyomizu-dera Wooden Terrace',
    description: 'UNESCO World Heritage hillside temple overlooking cedar forests and city.',
    category: 'culture',
    estimatedCost: 400,
    estimatedDuration: 90,
  },
  {
    id: 'act-7',
    cityId: 'city-kyoto',
    title: 'Urasenke Heritage Tea Ceremony',
    description: 'Traditional tatami ritual preparing ceremonial matcha in Gion.',
    category: 'culture',
    estimatedCost: 3000,
    estimatedDuration: 60,
  },
  {
    id: 'act-8',
    cityId: 'city-kyoto',
    title: 'Arashiyama Sagano Bamboo Path',
    description: 'Walk through whispering green bamboo stalks and Tenryu-ji gardens.',
    category: 'nature',
    estimatedCost: 500,
    estimatedDuration: 90,
  },

  // Osaka
  {
    id: 'act-9',
    cityId: 'city-osaka',
    title: 'Dotonbori Street Gourmet Safari',
    description: 'Takoyaki, kushikatsu, and craft cocktails beneath glowing Glico signs.',
    category: 'food',
    estimatedCost: 4500,
    estimatedDuration: 180,
  },
  {
    id: 'act-10',
    cityId: 'city-osaka',
    title: 'Osaka Castle & Moat Gardens',
    description: '16th-century fortress grounds, stone ramparts, and plum blossom grove.',
    category: 'sightseeing',
    estimatedCost: 600,
    estimatedDuration: 120,
  },
];

/* ---- Stop Activities for Rajasthan ---- */
const mockStopActivitiesRajasthan: Record<string, StopActivity[]> = {
  'stop-rj-1': [
    { id: 'sa-rj-1', stopId: 'stop-rj-1', activityId: 'act-j1', activity: mockActivities[0], day: 1, startTime: '09:00', endTime: '12:30' },
    { id: 'sa-rj-2', stopId: 'stop-rj-1', activityId: 'act-j2', activity: mockActivities[1], day: 2, startTime: '10:00', endTime: '12:00' },
    { id: 'sa-rj-3', stopId: 'stop-rj-1', activityId: 'act-j3', activity: mockActivities[2], day: 2, startTime: '17:30', endTime: '19:00' },
  ],
  'stop-rj-2': [
    { id: 'sa-rj-4', stopId: 'stop-rj-2', activityId: 'act-jd1', activity: mockActivities[3], day: 4, startTime: '09:30', endTime: '12:30' },
    { id: 'sa-rj-5', stopId: 'stop-rj-2', activityId: 'act-jd2', activity: mockActivities[4], day: 5, startTime: '16:00', endTime: '18:00' },
  ],
  'stop-rj-3': [
    { id: 'sa-rj-6', stopId: 'stop-rj-3', activityId: 'act-u1', activity: mockActivities[5], day: 7, startTime: '10:00', endTime: '13:00' },
    { id: 'sa-rj-7', stopId: 'stop-rj-3', activityId: 'act-u2', activity: mockActivities[6], day: 8, startTime: '17:00', endTime: '18:30' },
  ],
};

/* ---- Mock Stop Activities for Japan ---- */
const mockStopActivitiesJapan: Record<string, StopActivity[]> = {
  'stop-jp-1': [
    { id: 'sa-1', stopId: 'stop-jp-1', activityId: 'act-1', activity: mockActivities[10], day: 1, startTime: '08:30', endTime: '10:30' },
    { id: 'sa-2', stopId: 'stop-jp-1', activityId: 'act-2', activity: mockActivities[11], day: 1, startTime: '11:30', endTime: '13:30' },
    { id: 'sa-3', stopId: 'stop-jp-1', activityId: 'act-3', activity: mockActivities[12], day: 2, startTime: '17:00', endTime: '19:00' },
    { id: 'sa-4', stopId: 'stop-jp-1', activityId: 'act-4', activity: mockActivities[13], day: 3, startTime: '10:00', endTime: '12:30' },
  ],
  'stop-jp-2': [
    { id: 'sa-h1', stopId: 'stop-jp-2', activityId: 'act-h1', activity: mockActivities[14], day: 4, startTime: '10:00', endTime: '12:30' },
    { id: 'sa-h2', stopId: 'stop-jp-2', activityId: 'act-h2', activity: mockActivities[15], day: 4, startTime: '16:00', endTime: '20:00' },
  ],
  'stop-jp-3': [
    { id: 'sa-5', stopId: 'stop-jp-3', activityId: 'act-5', activity: mockActivities[16], day: 6, startTime: '07:30', endTime: '10:30' },
    { id: 'sa-6', stopId: 'stop-jp-3', activityId: 'act-6', activity: mockActivities[17], day: 6, startTime: '14:00', endTime: '16:00' },
    { id: 'sa-7', stopId: 'stop-jp-3', activityId: 'act-7', activity: mockActivities[18], day: 7, startTime: '10:30', endTime: '12:00' },
    { id: 'sa-8', stopId: 'stop-jp-3', activityId: 'act-8', activity: mockActivities[19], day: 8, startTime: '08:30', endTime: '10:30' },
  ],
  'stop-jp-4': [
    { id: 'sa-9', stopId: 'stop-jp-4', activityId: 'act-9', activity: mockActivities[20], day: 10, startTime: '18:00', endTime: '21:30' },
    { id: 'sa-10', stopId: 'stop-jp-4', activityId: 'act-10', activity: mockActivities[21], day: 11, startTime: '10:00', endTime: '12:30' },
  ],
};

/* ---- Mock Trip Stops ---- */
export const mockStopsRajasthan: TripStop[] = [
  {
    id: 'stop-rj-1',
    tripId: 'trip-rajasthan',
    cityId: 'city-jaipur',
    city: mockCities[0],
    sequence: 1,
    arrivalDate: '2026-11-10',
    departureDate: '2026-11-13',
    activities: mockStopActivitiesRajasthan['stop-rj-1'],
  },
  {
    id: 'stop-rj-2',
    tripId: 'trip-rajasthan',
    cityId: 'city-jodhpur',
    city: mockCities[1],
    sequence: 2,
    arrivalDate: '2026-11-13',
    departureDate: '2026-11-16',
    activities: mockStopActivitiesRajasthan['stop-rj-2'],
  },
  {
    id: 'stop-rj-3',
    tripId: 'trip-rajasthan',
    cityId: 'city-udaipur',
    city: mockCities[2],
    sequence: 3,
    arrivalDate: '2026-11-16',
    departureDate: '2026-11-20',
    activities: mockStopActivitiesRajasthan['stop-rj-3'],
  },
];

export const mockStopsKerala: TripStop[] = [
  {
    id: 'stop-kr-1',
    tripId: 'trip-kerala',
    cityId: 'city-munnar',
    city: mockCities[3],
    sequence: 1,
    arrivalDate: '2026-12-04',
    departureDate: '2026-12-08',
    activities: [
      { id: 'sa-kr-1', stopId: 'stop-kr-1', activityId: 'act-k1', activity: mockActivities[7], day: 2, startTime: '06:00', endTime: '10:00' },
    ],
  },
  {
    id: 'stop-kr-2',
    tripId: 'trip-kerala',
    cityId: 'city-alleppey',
    city: mockCities[4],
    sequence: 2,
    arrivalDate: '2026-12-08',
    departureDate: '2026-12-12',
    activities: [
      { id: 'sa-kr-2', stopId: 'stop-kr-2', activityId: 'act-k2', activity: mockActivities[8], day: 5, startTime: '12:00', endTime: '18:00' },
    ],
  },
];

export const mockStopsJapan: TripStop[] = [
  {
    id: 'stop-jp-1',
    tripId: 'trip-japan',
    cityId: 'city-tokyo',
    city: mockCities[7],
    sequence: 1,
    arrivalDate: '2026-06-14',
    departureDate: '2026-06-17',
    activities: mockStopActivitiesJapan['stop-jp-1'],
  },
  {
    id: 'stop-jp-2',
    tripId: 'trip-japan',
    cityId: 'city-hakone',
    city: mockCities[8],
    sequence: 2,
    arrivalDate: '2026-06-17',
    departureDate: '2026-06-19',
    activities: mockStopActivitiesJapan['stop-jp-2'],
  },
  {
    id: 'stop-jp-3',
    tripId: 'trip-japan',
    cityId: 'city-kyoto',
    city: mockCities[9],
    sequence: 3,
    arrivalDate: '2026-06-19',
    departureDate: '2026-06-23',
    activities: mockStopActivitiesJapan['stop-jp-3'],
  },
  {
    id: 'stop-jp-4',
    tripId: 'trip-japan',
    cityId: 'city-osaka',
    city: mockCities[10],
    sequence: 4,
    arrivalDate: '2026-06-23',
    departureDate: '2026-06-25',
    activities: mockStopActivitiesJapan['stop-jp-4'],
  },
];

export const mockStopsTokyo: TripStop[] = [
  {
    id: 'stop-tk-1',
    tripId: 'trip-tokyo',
    cityId: 'city-shibuya',
    city: mockCities[11],
    sequence: 1,
    arrivalDate: '2026-10-10',
    departureDate: '2026-10-12',
    activities: [],
  },
  {
    id: 'stop-tk-2',
    tripId: 'trip-tokyo',
    cityId: 'city-shinjuku',
    city: mockCities[12],
    sequence: 2,
    arrivalDate: '2026-10-12',
    departureDate: '2026-10-14',
    activities: [],
  },
];

// Alias for backward compatibility
export const mockStops = mockStopsRajasthan;

/* ---- Mock Trips List ---- */
export const mockTrips: Trip[] = [
  {
    id: 'trip-rajasthan',
    userId: 'user-1',
    name: 'Rajasthan: Royal Fortresses & Lakeside Palaces',
    description: 'An unforgettable 10-day expedition through Jaipur’s Pink City ramparts, Jodhpur’s blue-hued alleys, and Udaipur’s floating lakeside palaces.',
    startDate: '2026-11-10',
    endDate: '2026-11-20',
    status: 'ACTIVE',
    isPublic: true,
    stops: mockStopsRajasthan,
    coverImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'trip-kerala',
    userId: 'user-1',
    name: 'Kerala: Emerald Backwaters & Mist-Clad Tea Hills',
    description: 'A serene 8-day coastal odyssey from Munnar’s high-altitude tea plantations to Alleppey’s tranquil Kettuvallam houseboats.',
    startDate: '2026-12-04',
    endDate: '2026-12-12',
    status: 'ACTIVE',
    isPublic: true,
    stops: mockStopsKerala,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'trip-japan',
    userId: 'user-1',
    name: 'Japan: The Golden Route & Alpine Serenity',
    description: 'An immersive 12-day odyssey from Tokyo’s neon pulse to Hakone onsen retreats, Kyoto’s sacred bamboo groves, and Osaka’s bustling gourmet alleys.',
    startDate: '2026-06-14',
    endDate: '2026-06-25',
    status: 'ACTIVE',
    isPublic: true,
    stops: mockStopsJapan,
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'trip-tokyo',
    userId: 'user-1',
    name: 'Tokyo: 48-Hour Urban Immersion',
    description: 'A high-octane architectural, culinary, and digital art capsule exploration through Shibuya, Harajuku, Shinjuku, and Ginza.',
    startDate: '2026-10-10',
    endDate: '2026-10-14',
    status: 'ACTIVE',
    isPublic: true,
    stops: mockStopsTokyo,
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'trip-ladakh',
    userId: 'user-1',
    name: 'Ladakh: High-Altitude Mountain Passes & Monasteries',
    description: 'Awe-inspiring Himalayan trails across Khardung La, Nubra Valley sand dunes, and the turquoise expanse of Pangong Tso.',
    startDate: '2026-07-15',
    endDate: '2026-07-24',
    status: 'ACTIVE',
    isPublic: false,
    stops: [
      {
        id: 'stop-ld-1',
        tripId: 'trip-ladakh',
        cityId: 'city-leh',
        city: mockCities[5],
        sequence: 1,
        arrivalDate: '2026-07-15',
        departureDate: '2026-07-24',
        activities: [],
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'trip-italy',
    userId: 'user-1',
    name: 'Amalfi Coast & Capri Azure Voyage',
    description: 'Cliffside lemon terraces, private Gozzo sea charters, and sunset trattorias overlooking Positano and Capri.',
    startDate: '2026-09-02',
    endDate: '2026-09-12',
    status: 'ACTIVE',
    isPublic: false,
    stops: [
      {
        id: 'stop-it-1',
        tripId: 'trip-italy',
        cityId: 'city-positano',
        city: mockCities[13],
        sequence: 1,
        arrivalDate: '2026-09-02',
        departureDate: '2026-09-12',
        activities: [],
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&auto=format&fit=crop&q=80',
  },
];

/* ---- Mock Budgets ---- */
export const mockBudgetRajasthan: BudgetSummary = {
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

export const mockBudgetKerala: BudgetSummary = {
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

export const mockBudgetJapan: BudgetSummary = {
  tripId: 'trip-japan',
  totalEstimated: 48600,
  currency: '₹',
  categories: [
    { name: 'Accommodation', amount: 18000, percentage: 37 },
    { name: 'Travel & Shinkansen', amount: 14000, percentage: 29 },
    { name: 'Activities & Culture', amount: 9800, percentage: 20 },
    { name: 'Gourmet & Dining', amount: 6800, percentage: 14 },
  ],
};

export const mockBudget = mockBudgetRajasthan;

/* ---- Mock API Delay Helper ---- */
export function mockDelay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
