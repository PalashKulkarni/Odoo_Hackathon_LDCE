import { PrismaClient, TripStatus, ExpenseCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create dummy user with fixed ID matching controller fallback
  const user = await prisma.user.upsert({
    where: { id: 'mock-user-123' },
    update: {},
    create: {
      id: 'mock-user-123',
      googleId: 'mock-google-id',
      email: 'mockuser@example.com',
      name: 'Mock User',
      avatarUrl: 'https://example.com/avatar.png',
    },
  });

  console.log(`User ready: ${user.id}`);

  // 2. Create cities
  const tokyo = await prisma.city.upsert({
    where: { name_country: { name: 'Tokyo', country: 'Japan' } },
    update: {},
    create: { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
  });

  const kyoto = await prisma.city.upsert({
    where: { name_country: { name: 'Kyoto', country: 'Japan' } },
    update: {},
    create: { name: 'Kyoto', country: 'Japan', latitude: 35.0116, longitude: 135.7681 },
  });

  // 3. Upsert trip using publicSlug to avoid unique constraint collisions
  const trip = await prisma.trip.upsert({
    where: { publicSlug: 'japan-adventure-2024' },
    update: { userId: user.id },
    create: {
      userId: user.id,
      name: 'Japan Adventure',
      description: 'Two weeks exploring Tokyo and Kyoto',
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-10-14'),
      status: TripStatus.ACTIVE,
      isPublic: true,
      publicSlug: 'japan-adventure-2024',
      stops: {
        create: [
          {
            cityId: tokyo.id,
            order: 1,
            startDate: new Date('2024-10-01'),
            endDate: new Date('2024-10-07'),
            activities: {
              create: [
                {
                  name: 'Tokyo Tower',
                  type: 'sightseeing',
                  cost: 20,
                  durationMin: 120,
                  scheduledDate: new Date('2024-10-02'),
                  scheduledTime: '10:00',
                  order: 1,
                },
                {
                  name: 'Sushi Dai',
                  type: 'food',
                  cost: 50,
                  durationMin: 90,
                  scheduledDate: new Date('2024-10-02'),
                  scheduledTime: '13:00',
                  order: 2,
                },
              ],
            },
          },
          {
            cityId: kyoto.id,
            order: 2,
            startDate: new Date('2024-10-07'),
            endDate: new Date('2024-10-14'),
            activities: {
              create: [
                {
                  name: 'Fushimi Inari Shrine',
                  type: 'sightseeing',
                  cost: 0,
                  durationMin: 180,
                  scheduledDate: new Date('2024-10-08'),
                  scheduledTime: '08:00',
                  order: 1,
                },
              ],
            },
          },
        ],
      },
      expenses: {
        create: [
          {
            category: ExpenseCategory.TRANSPORT,
            amount: 800,
            note: 'Roundtrip Flights to Japan',
          },
          {
            category: ExpenseCategory.ACCOMMODATION,
            amount: 1200,
            note: 'Hotels for 14 nights',
          },
        ],
      },
    },
  });

  console.log(`Trip ready: ${trip.id}`);
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });