# GlobeTrotter

**Personalized, intelligent, and collaborative travel planning.**

GlobeTrotter is a full-stack travel planning application for creating and managing multi-city trips. Users can build day-wise itineraries, organize activities, track estimated expenses, visualize trip timelines, and share public versions of their trips.

The project is designed around a practical constraint: it needs to be built quickly for an 8-hour hackathon without turning into a collection of rushed features or unnecessary infrastructure.

The approach is straightforward:

> Build the travel-planning core first. Add intelligence and personalization around it only where they improve the product.

---

## What GlobeTrotter Does

Planning a multi-city trip usually means keeping track of dates, destinations, activities, costs, and schedules across multiple tools. GlobeTrotter brings those pieces into one place.

A typical trip flow looks like this:

```text
Create Trip
    |
    v
Add Cities / Stops
    |
    v
Assign Dates
    |
    v
Add Activities
    |
    v
Build Daily Itinerary
    |
    v
Track Estimated Costs
    |
    v
Review and Share
```

The application is built around structured trip data rather than treating an itinerary as a single document. This makes activities, budgets, timelines, and future recommendations easier to manage independently.

---

# Core Features

## Authentication

Users can sign in using Google OAuth.

The authentication flow uses secure HTTP-only cookies so session credentials are not directly accessible from client-side JavaScript.

Planned functionality includes:

* Google OAuth login
* Secure session handling
* User profile management
* Authorization checks for user-owned trips and resources

---

## Dashboard

The dashboard gives users a quick overview of their travel plans.

It includes:

* Upcoming trips
* Recent trips
* Popular or recommended destinations
* Quick actions for creating or continuing a trip

The dashboard is intended to be the starting point of the application rather than just a list of records.

---

## Trip Management

Users can create and manage trips with:

* Trip name
* Start and end dates
* Description
* Optional cover image

Trips can also be edited or deleted.

The application separates active and completed trips so users can quickly understand their travel history.

---

## Multi-City Itinerary Builder

A trip can contain multiple stops.

For each stop, users can:

* Add a city or destination
* Assign dates
* Add activities
* Change the order of stops
* Update the itinerary as plans change

This is one of the central parts of GlobeTrotter.

The data model is designed so a trip is not limited to a single destination or a fixed itinerary structure.

---

## Activity Discovery

Users can search for destinations and activities while planning a trip.

Available filtering can include:

* Activity type
* Estimated cost
* Duration
* Destination

Activities can then be added to the relevant city and day in the itinerary.

---

## Itinerary View

The itinerary provides a structured view of the trip.

Users can view:

* Day-wise plans
* City-wise groupings
* Activity timing
* Estimated activity costs
* Activity order

The same underlying trip data can support both list and calendar-style views.

---

## Budget Tracking

GlobeTrotter provides an estimated cost breakdown for a trip.

The budget can include:

* Transport
* Accommodation
* Activities
* Meals

The application can calculate:

* Estimated total cost
* Category-wise spending
* Average daily cost
* Budget usage
* Over-budget warnings

Budget calculations remain part of the backend business logic rather than being scattered across frontend components.

---

## Calendar and Timeline

The timeline gives users a visual representation of the trip.

It can show:

* Trip duration
* Cities and stops
* Daily activities
* Activity order
* Empty or overloaded days

This helps users understand the overall flow of the trip instead of reviewing activities one by one.

---

## Public Trip Sharing

Trips can be shared through a public link.

A public trip is read-only and can be viewed without giving the viewer permission to modify the original itinerary.

Users can also copy a shared trip and use it as the starting point for their own plan.

# AI and Personalization

AI is treated as an additional layer, not a dependency for the main application.

The core product should remain fully functional even if the AI service is unavailable.

## AI Travel Copilot

The optional AI Travel Copilot uses Groq to analyze an existing itinerary and suggest improvements.

Possible suggestions include:

* Reducing unnecessary costs
* Balancing overloaded days
* Filling empty days
* Reordering activities
* Suggesting additional activities
* Improving the overall flow of the itinerary
* Adapting recommendations to user preferences

The AI does not receive direct database access.

It only receives the trip context required for generating recommendations.

```text
User
  |
  v
AI Copilot Interface
  |
  v
Express API
  |
  v
Fetch Relevant Trip Data
  |
  v
Groq
  |
  v
Return Recommendations
  |
  v
User Reviews Changes
  |
  v
Normal Application API
  |
  v
PostgreSQL
```

Any modification to trip data still goes through the application's normal validation and authorization flow.

---

## Travel Preferences

Users can define preferences that help personalize recommendations.

Examples include:

* Food
* Adventure
* Culture
* Nature
* Budget travel
* Luxury travel

These preferences can later be used by the recommendation system and AI Copilot.

---

## Trip Health Score

The Trip Health Score is an optional feature that provides a quick assessment of an itinerary.

Possible factors include:

* Budget usage
* Activities per day
* Overloaded days
* Empty days
* Overall itinerary balance

Example:

```text
Trip Health: 86/100
Status: Well Balanced
```

This is intended as a useful summary rather than a complex scoring system.

---

# Tech Stack

## Frontend

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| React + Vite    | Frontend application         |
| TypeScript      | Type safety                  |
| Tailwind CSS    | Styling                      |
| React Router    | Client-side routing          |
| TanStack Query  | Server state and API caching |
| React Hook Form | Form handling                |
| Zod             | Client-side validation       |

## Backend

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| Node.js           | Runtime                    |
| Express.js        | REST API                   |
| TypeScript        | Type safety                |
| Zod               | Request validation         |
| Prisma            | Database ORM               |
| Google OAuth      | Authentication             |
| HTTP-only Cookies | Session handling           |
| Helmet            | Security headers           |
| CORS              | Cross-origin configuration |
| Groq API          | AI Travel Copilot          |

## Database

| Technology | Purpose                          |
| ---------- | -------------------------------- |
| PostgreSQL | Relational data storage          |
| Prisma     | Schema management and migrations |
# Architecture

The application follows a simple separation of responsibilities.

```text
React Client
    |
    | HTTP Requests
    v
Express API
    |
    +--------------------+
    |                    |
    v                    v
PostgreSQL             External Services
Prisma                 Google OAuth
                       Groq
```

## Frontend

The frontend is responsible for:

* UI rendering
* Routing
* Forms
* User interactions
* Client-side state
* API communication

The frontend should not contain database logic or critical business rules.

---

## Backend

The backend is responsible for:

* Authentication
* Authorization
* Request validation
* Business logic
* Database operations
* AI integrations
* API responses

Controllers should remain focused on HTTP handling. Business logic belongs in services, while database access is isolated in repositories where appropriate.

---

## Database

PostgreSQL is responsible for persistent application data.

The database layer handles:

* Relationships
* Foreign keys
* Constraints
* Data integrity
* Migrations
* Seed data

Prisma is used to manage the database schema and provide typed database access.

---

## Shared Code

The `shared` directory contains only code that is genuinely needed by both the frontend and backend.

Examples:

* Shared Zod schemas
* Shared domain types
* Constants

Shared code should remain independent and must not import frontend or backend-specific modules.

---

# Project Structure

```text
globetrotter/
│
├── client/
│   ├── src/
│   │   ├── api/                 # API client and request functions
│   │   ├── components/          # Reusable UI components
│   │   ├── constants/           # Frontend constants
│   │   ├── features/            # Feature-specific UI and logic
│   │   ├── forms/               # Form definitions and helpers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layouts/             # Application layouts
│   │   ├── pages/               # Route-level pages
│   │   ├── routes/              # Route configuration
│   │   ├── types/               # Frontend-specific types
│   │   ├── utils/               # Utility functions
│   │   └── main.tsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/              # Environment and app configuration
│   │   ├── controllers/         # HTTP request handlers
│   │   ├── integrations/        # External service integrations
│   │   ├── middleware/          # Auth, error and security middleware
│   │   ├── repositories/        # Database access
│   │   ├── routes/              # API route definitions
│   │   ├── schemas/             # Zod request schemas
│   │   ├── services/            # Business logic
│   │   ├── types/               # Backend-specific types
│   │   ├── utils/               # Backend utilities
│   │   └── app.ts
│   │
│   └── package.json
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── shared/
│   ├── constants/
│   ├── schemas/
│   └── types/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Database Design

The main relationships in GlobeTrotter are structured around users, trips, stops, cities, and activities.

```text
User
  |
  +---- Trip
          |
          +---- Trip Stop
          |       |
          |       +---- City
          |
          +---- Activity
```

The actual schema can expand as features are implemented, but the main design principles remain the same:

* Use relational tables for relational data
* Enforce ownership through foreign keys
* Keep the schema normalized where practical
* Avoid storing structured relational entities as arbitrary JSON
* Use migrations for schema changes
* Use seed data for demos and local development
