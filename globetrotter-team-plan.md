# GlobeTrotter — Team Split (Auth vs Database/Core)

Key idea: the schema (`prisma/schema.prisma`) is the contract. Agree on it in the first 20 minutes, then you can build almost entirely in parallel because your files barely overlap.

---

## 1. The schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  googleId    String   @unique
  email       String   @unique
  name        String
  avatarUrl   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  trips       Trip[]
  preferences TravelPreference[]
  auditLogs   AuditLog[]
}

model Trip {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  name        String
  description String?
  startDate   DateTime
  endDate     DateTime
  coverImage  String?
  status      TripStatus @default(ACTIVE)

  isPublic    Boolean   @default(false)
  publicSlug  String?   @unique

  stops       TripStop[]
  expenses    TripExpense[]
  auditLogs   AuditLog[]

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum TripStatus {
  ACTIVE
  COMPLETED
}

model City {
  id        String     @id @default(cuid())
  name      String
  country   String
  latitude  Float
  longitude Float

  stops     TripStop[]

  @@unique([name, country])
}

model TripStop {
  id        String     @id @default(cuid())
  tripId    String
  trip      Trip       @relation(fields: [tripId], references: [id], onDelete: Cascade)
  cityId    String
  city      City       @relation(fields: [cityId], references: [id])

  order     Int
  startDate DateTime
  endDate   DateTime

  activities Activity[]

  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Activity {
  id             String   @id @default(cuid())
  tripStopId     String
  tripStop       TripStop @relation(fields: [tripStopId], references: [id], onDelete: Cascade)

  name           String
  type           String   // e.g. "sightseeing", "food", "adventure"
  cost           Decimal  @default(0)
  durationMin    Int?
  scheduledDate  DateTime
  scheduledTime  String?  // "14:30" — kept simple for MVP
  order          Int

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

// Non-activity costs: transport, accommodation, meals at the trip level
model TripExpense {
  id        String          @id @default(cuid())
  tripId    String
  trip      Trip            @relation(fields: [tripId], references: [id], onDelete: Cascade)

  category  ExpenseCategory
  amount    Decimal
  note      String?

  createdAt DateTime        @default(now())
}

enum ExpenseCategory {
  TRANSPORT
  ACCOMMODATION
  MEALS
  OTHER
}

model TravelPreference {
  id       String @id @default(cuid())
  userId   String
  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  category String // e.g. "food", "adventure", "culture", "nature", "budget", "luxury"

  @@unique([userId, category])
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  tripId    String?
  trip      Trip?    @relation(fields: [tripId], references: [id])
  action    String   // e.g. "TRIP_CREATED", "ACTIVITY_ADDED"
  createdAt DateTime @default(now())
}
```

**Why activities hang off `TripStop`, not `Trip` directly:** a stop already carries the city + date range, so an activity automatically inherits "which city, which days" for free. That's what makes day-wise *and* city-wise views (and the timeline / empty-day detection) trivial queries instead of extra joins.

**Why `TripExpense` is separate from `Activity`:** transport/accommodation are often trip-level, not tied to one day or activity. Keeping them apart means the budget service just sums two tables instead of guessing which activities are "real" costs.

---

## 2. Who owns what

### Person A — Auth
- `server/src/config/passport.ts` (or equivalent OAuth setup)
- `server/src/integrations/google-oauth.ts`
- `server/src/middleware/auth.middleware.ts` (session/cookie check, attaches `req.user`)
- `server/src/controllers/auth.controller.ts`
- `server/src/services/auth.service.ts`
- `server/src/routes/auth.routes.ts`
- `client/src/features/auth/` (login page, callback handling)
- `client/src/hooks/useAuth.ts`
- `client/src/routes/` — the `ProtectedRoute` wrapper specifically

### Person B — Database / core trip features
- `prisma/schema.prisma` (owns the file; see coordination note below)
- `prisma/seed.ts`
- `server/src/repositories/*`
- `server/src/services/trip.service.ts`, `itinerary.service.ts`, `budget.service.ts`
- `server/src/controllers/trip.controller.ts`, `activity.controller.ts`
- `server/src/routes/trip.routes.ts`
- `client/src/features/trips/`, `itinerary/`, `budget/`

### Shared touch points (coordinate, don't just push)
- **`prisma/schema.prisma`** — Person B owns the file, but the `User` model's shape (what fields auth needs: `googleId`, `email`, `avatarUrl`) should be agreed on together *before* either of you starts, since both of you depend on it. Once fixed, Person A basically never needs to touch this file again.
- **`server/src/app.ts`** — both routers get mounted here. Agree on this being a 5-line file (`app.use('/api/auth', authRoutes)`, `app.use('/api/trips', tripRoutes)`) so merges are trivial, and whoever touches it second just adds a line rather than resolving a real conflict.
- **`shared/types/`** — define the `User`, `Trip`, `Activity` TypeScript shapes here on hour 1 so both of you can build against a contract instead of guessing each other's response shapes.

---

## 3. How to avoid conflicts (workflow, not just file boundaries)

1. **First 20–30 min, together:** agree on the schema above (tweak as needed) and the shapes in `shared/types/`. This is the one thing worth syncing on live — everything downstream depends on it.
2. **Branch per person:** `feature/auth` and `feature/trips`, both off `main`/`develop`. Small, frequent commits — merge into `develop` every hour or two rather than one giant merge at hour 7.
3. **Person B runs `prisma migrate dev` and commits the migration** — don't let both people generate migrations independently, you'll get conflicting migration files.
4. **Mock what you don't own yet.** Person B can build trip CRUD against a hardcoded fake `req.user = { id: 'test-user' }` before real auth exists. Person A can build the login UI without a single trip existing. Wire them together once both sides work standalone — this is what actually lets you work in parallel instead of blocking on each other.
5. **`app.ts` and `schema.prisma`**: whoever needs to touch these, do it, push immediately, tell the other person. Don't sit on changes to shared files.

---

## 4. Folder structure

Same as your README's structure — the ownership split above maps directly onto it, nothing new to memorize:

```
globetrotter/
├── client/src/
│   ├── features/
│   │   ├── auth/          ← Person A
│   │   ├── trips/         ← Person B
│   │   ├── itinerary/     ← Person B
│   │   └── budget/        ← Person B
│   ├── hooks/
│   │   └── useAuth.ts     ← Person A
│   └── routes/            ← shared (ProtectedRoute = Person A, rest = Person B)
│
├── server/src/
│   ├── config/            ← Person A (passport/oauth config)
│   ├── integrations/      ← Person A (google-oauth.ts)
│   ├── middleware/        ← Person A (auth.middleware.ts)
│   ├── controllers/
│   │   ├── auth.controller.ts     ← Person A
│   │   ├── trip.controller.ts     ← Person B
│   │   └── activity.controller.ts ← Person B
│   ├── services/
│   │   ├── auth.service.ts        ← Person A
│   │   ├── trip.service.ts        ← Person B
│   │   ├── itinerary.service.ts   ← Person B
│   │   └── budget.service.ts      ← Person B
│   ├── repositories/      ← Person B
│   ├── routes/            ← split by domain, same as controllers
│   └── app.ts              ← shared, keep it a thin router-mounting file
│
├── prisma/
│   ├── schema.prisma       ← Person B owns, User shape agreed with Person A upfront
│   └── seed.ts              ← Person B
│
└── shared/types/            ← agreed together, hour 1
```

---

## 5. Suggested 8-hour timeline

| Hour | Person A (Auth) | Person B (Database/Core) |
|---|---|---|
| 0–0.5 | Agree on schema + shared types together | |
| 0.5–2 | Google OAuth flow, cookie sessions | Prisma schema + migration + seed data |
| 2–4 | Auth middleware, protected routes, login UI | Trip CRUD (repository → service → controller → routes) |
| 4–5.5 | Wire login into dashboard, profile handling | Multi-city stops, activity CRUD, itinerary view |
| 5.5–6.5 | Help wire auth into trip ownership checks | Budget calculations, timeline view |
| 6.5–7.5 | Both: integration pass — connect auth + trips end to end | |
| 7.5–8 | Both: demo run-through, fix rough edges | |

The AI Copilot, public sharing, and Trip Health Score are "time permitting" per your README — slot them in only if the core flow (login → create trip → add stops/activities → view budget/timeline) is solid and demo-ready first.
