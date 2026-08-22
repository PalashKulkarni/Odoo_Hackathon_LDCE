# GlobeTrotter — Project Architecture Blueprint

## Project Overview

GlobeTrotter is a travel planning platform that allows users to create and manage multi-city trips, build day-wise itineraries, discover activities, track budgets, visualize timelines, receive AI travel recommendations, personalize travel preferences, and share or copy public trips.

This is an 8-hour hackathon project. The architecture is designed to be practical, fast to implement, scalable enough for the project, and easy to divide among developers or AI coding agents.

---

# 1. Architecture

The project uses a monorepo with three main workspaces:

globetrotter/
├── apps/
│   ├── web/          → React frontend
│   └── api/          → Express backend
│
├── packages/
│   └── contracts/    → Shared Zod schemas, types, constants
│
├── docs/
└── package.json

Architecture principles:

- Frontend and backend are clearly separated.
- Shared contracts prevent frontend/backend API mismatches.
- Frontend uses feature-based organization.
- Backend uses a modular layered architecture.
- PostgreSQL handles the relational travel domain.
- Zod validates data at application boundaries.
- TanStack Query manages server state.
- The architecture must remain practical for an 8-hour hackathon and should not be over-engineered.

---

# 2. Technology Stack

## Frontend

- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form
- Zod

## Backend

- Node.js
- Express
- TypeScript
- Zod
- Prisma ORM
- PostgreSQL

## Authentication and Security

- Google OAuth
- HTTP-only Secure Cookies
- CORS
- Helmet

Google OAuth is the primary authentication method.

## External Integrations

- Groq AI
- Optional Supermemory
- Optional Redis

---

# 3. System Architecture

Frontend:

Pages
→ Feature Components
→ Hooks
→ API Layer
→ Backend

Communication:

Frontend
→ HTTP + Secure Cookies
→ Express API

Backend:

Routes
→ Controllers
→ Services
→ Repositories
→ Prisma
→ PostgreSQL

External integrations such as Groq AI remain isolated from the core application logic.

---

# 4. Core Features

## Core Features

1. Authentication
2. User profile management
3. Create and manage trips
4. Multi-city itinerary planning
5. Activity discovery and planning
6. Day-wise itinerary view
7. Budget and cost tracking
8. Calendar/timeline view
9. Trip dashboard

## Standout Features

10. AI Travel Copilot
11. Travel Style Personalization
12. Public Trip Sharing
13. Copy/Clone Public Trip

## Optional Feature

14. Trip Health Score

---

# 5. Core Product Structure

The Trip is the central object in the application.

Once a user enters a trip, the experience should feel like one connected workspace rather than multiple unrelated tools.

Trip Workspace:

Trip
├── Overview
├── Itinerary
├── Activities
├── Budget
├── Calendar / Timeline
└── AI Copilot

Core user journey:

Landing
→ Login
→ Dashboard
→ Create Trip
→ Enter Trip Workspace
→ Add Cities / Stops
→ Discover and Add Activities
→ Build Day-wise Itinerary
→ Review Budget
→ Review Calendar / Timeline
→ Use AI Travel Copilot
→ Share Trip
→ View Public Trip
→ Copy / Clone Public Trip

---

# 6. Frontend Architecture

apps/web/src/

├── app/
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── queryClient.ts
│
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── CreateTripPage.tsx
│   ├── TripDetailsPage.tsx
│   ├── ItineraryPage.tsx
│   ├── CalendarPage.tsx
│   ├── BudgetPage.tsx
│   ├── SharedTripPage.tsx
│   ├── ProfilePage.tsx
│   └── NotFoundPage.tsx
│
├── layouts/
│   ├── AppLayout.tsx
│   ├── AuthLayout.tsx
│   └── PublicLayout.tsx
│
├── features/
│   ├── auth/
│   ├── trips/
│   ├── itinerary/
│   ├── activities/
│   ├── cities/
│   ├── budget/
│   ├── calendar/
│   ├── personalization/
│   ├── ai/
│   ├── sharing/
│   └── health/
│
├── components/
│   ├── ui/
│   ├── states/
│   └── common/
│
├── lib/
├── hooks/
├── types/
├── constants/
└── styles/

Frontend responsibility flow:

Page
→ Feature Component
→ Feature Hook
→ API Layer
→ Backend

Pages should orchestrate features and should not contain large amounts of API logic, business logic, or complex validation.

---

# 7. Important Frontend Feature Components

## Trips

- TripForm
- TripCard
- TripList
- TripHeader
- DeleteTripDialog

## Itinerary

- StopList
- StopCard
- AddStopDialog
- ActivityList
- ActivityCard
- AddActivityDialog
- DayTimeline

## Activities

- ActivitySearch
- ActivityFilters
- ActivitySearchResults

## Cities

- CitySearch
- CityCard

## Budget

- BudgetSummary
- BudgetBreakdown
- BudgetProgress

## Calendar

- TripCalendar
- TimelineView

## Personalization

- PreferenceSelector
- TravelStyleBadge

## AI

- AICopilot
- AIMessage
- AIRecommendationCard

## Sharing

- ShareTripDialog
- CopyTripButton

## Health

- TripHealthScore

---

# 8. Backend Architecture

Backend flow:

Route
↓
Controller
↓
Service
↓
Repository
↓
Prisma
↓
PostgreSQL

Responsibilities:

Routes:
- Define API endpoints.

Controllers:
- Handle HTTP request and response.
- Call the appropriate service.

Services:
- Contain business logic.
- Handle authorization and application rules.

Repositories:
- Handle database access only.

Prisma:
- ORM layer for PostgreSQL.

---

# 9. Database Architecture

Core relationships:

User
├── UserPreference
├── Trip
├── AuditLog
└── Authentication Session if required

Trip
├── TripStop
├── Budget-related data
└── TripShare

City
├── Activities
└── TripStops

TripStop
├── City
└── StopActivity

Activity
├── City
└── StopActivity

TripShare
├── Trip
└── Public share slug

Core database tables:

- users
- user_preferences
- cities
- activities
- trips
- trip_stops
- stop_activities
- trip_shares
- audit_logs

---

# 10. Shared Contracts

packages/contracts/

├── schemas/
├── types/
├── constants/
└── index.ts

Shared contracts may contain:

- Zod schemas
- TypeScript types
- Enums
- Constants
- API DTOs

Shared contracts must not contain:

- Prisma queries
- Database logic
- React components
- Express-specific business logic
- Environment secrets

The goal is to prevent frontend/backend type and validation mismatches without tightly coupling the applications.

---

# 11. AI Copilot Architecture

AI flow:

AICopilot
↓
POST AI request
↓
AI Controller
↓
AI Service
↓
Load Trip Context
↓
Load User Preferences
↓
Optional Memory Context
↓
Groq AI
↓
Structured Recommendation
↓
Frontend Recommendation Card
↓
User Reviews
↓
User Accepts or Rejects

Critical rule:

AI must never directly modify the database.

Correct flow:

AI Suggestion
↓
User Reviews
↓
User Explicitly Accepts
↓
Normal Application API Request
↓
Validation
↓
Backend Service
↓
Database Update

The AI should feel integrated into the Trip Workspace rather than functioning as an unrelated chatbot.

---

# 12. Frontend Design Constraints

The frontend should:

- Feel like a polished, modern travel product.
- Balance travel inspiration with productivity and planning.
- Avoid looking like a generic SaaS dashboard.
- Avoid making every page feel like an unrelated tool.
- Keep the Trip Workspace as the central product experience.
- Maintain consistent visual identity across public and authenticated pages.
- Include intentional loading, empty, error, and success states.
- Be responsive.
- Be realistic to implement during the hackathon.

Avoid unnecessary:

- Microservices
- Redux unless genuinely required
- Complex event systems
- Heavy animations
- Random decorative elements
- Overly complex visual effects

Do not add visual complexity without a clear UX purpose.

---

# 13. Hackathon Design Priority

## Must Look Excellent

- Landing Page
- Dashboard
- Trip Workspace
- Itinerary Builder
- AI Copilot

## Should Look Polished

- Create Trip
- Budget
- Calendar / Timeline
- Shared Trip

## Can Be Simpler

- Profile
- Secondary settings
- Not Found page
- Minor utility screens

The strongest visual and UX effort should focus on the screens most likely to appear during the hackathon demo.

---

# 14. Important Architectural Boundaries

Frontend owns:

- UI
- Routing
- Forms
- Client-side validation
- User interactions
- Loading, error, empty, and success states
- API calls
- Server-state presentation

Backend owns:

- Authentication
- Authorization
- Business logic
- Database access
- AI orchestration
- Security
- External service integrations

Database owns:

- Persistent data
- Relationships
- Foreign keys
- Constraints
- Referential integrity

---

# 15. Design Goal for GlobeTrotter

The final product should not feel like:

- A generic AI-generated dashboard
- A basic travel booking website
- A collection of cards placed on different pages
- A visually attractive but confusing concept

It should feel like:

A cohesive travel planning workspace that combines inspiration, planning, organization, and intelligent assistance.

The user should feel that they are actively designing and understanding their journey, not simply filling out forms.
The above content shows the entire, complete file contents of the requested file.
