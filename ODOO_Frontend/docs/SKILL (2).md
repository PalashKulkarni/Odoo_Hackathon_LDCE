# GlobeTrotter — Complete UX & Visual Design Blueprint

## Design Source of Truth

This blueprint treats the provided GlobeTrotter architecture and feature requirements as the functional source of truth. The Trendy Frontend Design Skill is used only as the creative direction layer. It explicitly calls for establishing a design concept before component styling, exploring multiple directions, adapting trends rather than copying them, and maintaining a durable usability foundation beneath contemporary expression.

Where the architecture does not define a behavior, data point, screen capability, or interaction, this blueprint states:

**Not specified in the provided architecture**

Suggestions that go beyond confirmed functionality are explicitly labeled **Recommended UX addition**, **Optional visual enhancement**, or **Future enhancement**.

---

# 1. Product Design Vision

## 1.1 Central Design Concept

### **GlobeTrotter should feel like a personal travel studio, not a travel dashboard.**

The defining concept is:

**“Design your journey spatially, then manage it precisely.”**

The product should move visually between two modes:

**Explore**

* imagery
* destinations
* travel atmosphere
* cities
* activities
* narrative journey

and

**Plan**

* dates
* itinerary
* costs
* timing
* trip structure
* decisions

The transition between these modes should happen inside the same visual system rather than through unrelated page designs.

The architecture already identifies the Trip Workspace as the center of the product, containing Overview, Itinerary, Activities, Budget, Calendar / Timeline, and AI Copilot. The design therefore treats these as different views of the **same trip object**, not separate products.

---

## 1.2 Visual Personality

GlobeTrotter should be:

**Editorial + warm + precise + quietly expressive**

More specifically:

* **Editorial** because travel is inherently visual and story-driven.
* **Warm** because planning a trip is personal rather than purely operational.
* **Precise** because users need reliable organization, dates, costs, and schedules.
* **Expressive** because the product should feel like travelling, not spreadsheet management.

The useful contrast is:

> **Calm utility underneath expressive travel storytelling.**

This gives GlobeTrotter character without turning it into a visually noisy travel poster.

The Trendy Frontend Design Skill recommends productive contrasts such as expressive typography with minimal layouts, dense data with calm visual styling, and complex systems with extremely simple workflows. That principle fits GlobeTrotter particularly well.

---

## 1.3 Emotional Experience

The user should move through these emotions:

**Landing**

> “I want to go somewhere.”

**Create Trip**

> “I can see my trip taking shape.”

**Trip Workspace**

> “This is my journey.”

**Itinerary**

> “I understand exactly what my days look like.”

**Budget**

> “I know what this trip is costing me.”

**Calendar**

> “I understand the rhythm of the trip.”

**AI Copilot**

> “I have a smart travel partner helping me think.”

**Sharing**

> “This trip is worth showing someone.”

That emotional progression is more important than visual decoration.

---

## 1.4 Design Philosophy

### Rule 1: One trip, one visual world

The user's trip should remain visually identifiable everywhere.

The trip name, destination identity, duration, and current planning context remain persistent while navigating between workspace views.

### Rule 2: Important information should feel contextual

Do not show a generic “budget card” merely because a budget feature exists.

Show budget in the context of:

> “This Japan trip is currently estimated at …”

Likewise, AI recommendations should reference the current trip rather than feeling like a generic chatbot.

### Rule 3: Information should tell a story

The itinerary should not feel like a CRUD table.

A sequence such as:

**Tokyo → Kyoto → Osaka**

should visually communicate movement.

### Rule 4: The product should become more operational inside the workspace

The landing page can be expressive.

The workspace becomes more structured.

This creates a clear transition from inspiration to action.

### Rule 5: One memorable idea beats ten decorative ideas

The Trendy Frontend Design Skill explicitly encourages establishing a signature element and a restraint rule instead of stacking trends.

For GlobeTrotter:

**Signature element:** the journey path.

**Restraint rule:** no decorative element should compete with the trip's route, itinerary, or destination imagery.

---

# 2. UX Strategy

## 2.1 Core UX Model

The primary mental model should be:

**Trip → Places → Activities → Days → Cost → Timeline → Assistance → Share**

Not:

**Dashboard → Page → Page → Page → Tool**

This distinction is critical.

The user is always editing one trip. Every workspace view answers a different question about that same trip.

| Workspace view      | Main question                |
| ------------------- | ---------------------------- |
| Overview            | What is this trip?           |
| Itinerary           | What am I doing?             |
| Budget              | What is it costing?          |
| Calendar / Timeline | When does everything happen? |
| AI Copilot          | How could I improve it?      |
| Sharing             | How can I show or reuse it?  |

---

## 2.2 Navigation Philosophy

Avoid the standard “admin SaaS sidebar full of unrelated modules.”

Instead use a **Trip Workspace navigation rail**.

Persistent structure:

**GlobeTrotter**

**Current Trip**

* Overview
* Itinerary
* Budget
* Calendar

Then a visually separate utility area:

* AI Copilot
* Share

The current trip's identity should sit above these controls.

For example:

**JAPAN · 12 DAYS**
Tokyo → Kyoto → Osaka

Then navigation.

This makes navigation contextual to the trip.

---

## 2.3 Context Preservation

When moving between workspace views:

* trip identity remains visible
* selected trip remains unchanged
* current date/day context remains understandable
* newly added items remain reflected across relevant views
* users should never feel that they “left” their trip

When switching from Itinerary → Budget:

The user should perceive it as:

> “I am looking at another layer of the same trip.”

Not:

> “I opened another application.”

---

# 3. Complete User Journey

## 3.1 Landing → Login

### User goal

Understand what GlobeTrotter does and decide to begin.

### Primary action

**Start planning**

### Experience

The hero should immediately communicate:

**Plan the whole journey, not just the destination.**

The visual anchor should show a multi-city route rather than a generic vacation photograph.

Suggested visual composition:

**Tokyo ─── Kyoto ─── Osaka**

with a large travel image or destination montage behind or beside the route.

### Navigation

Start Planning → Login

### Context preservation

The product promise and visual identity should remain consistent when moving into authentication.

---

## 3.2 Login → Dashboard

### User goal

Authenticate and see their trips.

### Primary action

**Continue with Google**

Google OAuth is the confirmed primary authentication method.

### Experience

The login screen should remain simple.

Do not create an elaborate authentication product.

One strong destination visual + concise messaging + OAuth CTA is sufficient.

### Next

Authenticated user → Dashboard.

---

## 3.3 Dashboard → Create Trip

### User goal

Start a new journey or continue an existing one.

### Primary actions

**Create Trip**

Secondary:
**Open existing trip**

### Dashboard behavior

Existing trips should be visually treated as journeys, not generic records.

Each TripCard should communicate:

* trip name
* destination or route
* relevant date information
* planning status based only on available confirmed data
* visual destination identity when available

**Not specified in the provided architecture:** exact trip card metadata beyond what the backend/frontend contracts ultimately expose.

---

## 3.4 Create Trip → Trip Workspace

### User goal

Define the initial trip.

### Primary action

**Create Trip**

The Create Trip flow should feel like the first act of designing a journey.

Once the trip is created:

**Create Trip → Trip Workspace**

Avoid sending the user to a generic confirmation screen.

The moment the trip exists should immediately become:

> **Your trip has started. Now build it.**

---

## 3.5 Trip Workspace → Add Stops

### User goal

Define the route.

### Primary action

**Add Stop**

### Experience

The Overview initially shows an empty journey structure.

Instead of a giant empty-state card:

**Your journey starts here.**

Then a visual route placeholder:

**Start → Add your first city**

Adding cities should create visible spatial progression.

Example:

**01 Tokyo → 02 Kyoto → 03 Osaka**

The route is one of GlobeTrotter's central visual metaphors.

---

## 3.6 Add Stops → Discover Activities

### User goal

Populate each city with meaningful activities.

### Primary action

**Add Activity**

### Experience

Activities are clearly associated with their destination.

For example:

**KYOTO**
Temple visit
Tea experience
Night walk

Activities should never lose their city/day context.

---

## 3.7 Activities → Itinerary

### User goal

Turn destinations and activities into an actual schedule.

### Primary action

**Add to itinerary / place into day context**

The itinerary becomes the most operational part of the product.

The user should understand:

* where they are
* what day it is
* what they are doing
* how dense the day is

---

## 3.8 Itinerary → Budget

### User goal

Understand trip cost.

Budget should be accessible without destroying itinerary context.

Navigation should preserve the trip header.

---

## 3.9 Itinerary / Budget → Calendar

### User goal

Understand timing and flow across the whole journey.

Calendar is the chronological layer of the same trip.

It should reveal:

* duration
* city changes
* scheduled activities
* gaps
* overloaded days

---

## 3.10 Workspace → AI Copilot

### User goal

Get contextual recommendations.

The user should invoke AI while viewing their trip.

For example:

**“Help me make Day 4 less rushed.”**

The Copilot should already know which trip is currently open through the application context described in the architecture.

---

## 3.11 Workspace → Share

### User goal

Make the current trip publicly viewable.

Share should be a workspace action rather than a separate product area.

---

## 3.12 Public Shared Trip → Copy Trip

### Visitor goal

Explore the journey.

### Authenticated visitor goal

Reuse the journey.

Primary CTA:

**Copy this trip**

The public page should clearly communicate that copying creates an independently editable trip.

---

# 4. Information Architecture

## 4.1 Landing Page

Sections:

1. Hero
2. Product promise
3. Trip planning visualization
4. Core workflow explanation
5. AI / personalization value
6. Shareable travel-planning concept
7. Primary CTA

Exact marketing copy is not specified in the architecture.

---

## 4.2 Dashboard

Structure:

**Global identity**
→ **Page introduction**
→ **Primary Create Trip action**
→ **Your Trips**
→ **Trip list / cards**

Optional supporting information should not become a generic analytics dashboard.

The architecture does not define user metrics such as total cities visited, total trips, or travel statistics.

Therefore:

**Not specified in the provided architecture**

Do not invent KPI cards.

---

## 4.3 Create Trip

Structure:

**Trip identity**
→ **Trip details**
→ **Create action**

The exact form fields beyond confirmed trip creation details are:

**Not specified in the provided architecture**

Do not invent additional mandatory fields.

---

## 4.4 Trip Workspace

This is the core hierarchy:

**Trip Header**

**Route / journey context**

**Workspace navigation**

**Main content**

**Contextual actions**

**AI utility**

The workspace navigation should not overpower the content.

---

## 4.5 Shared Trip

Structure:

**Trip story**
→ **Route**
→ **Itinerary**
→ **Budget/timeline information where architecturally available**
→ **Copy Trip**

A public visitor should understand the journey before being presented with an action.

---

## 4.6 Profile / Preferences

ProfilePage exists in the frontend architecture.

Confirmed personalization includes:

* travel style
* budget preference
* interests

The profile area should therefore prioritize:

**Identity**
→ **Travel Preferences**
→ **Save**

Exact account-management capabilities beyond the provided architecture are:

**Not specified in the provided architecture**

---

# 5. Page-by-Page UX Blueprint

# 5.1 LandingPage

## Purpose

Introduce GlobeTrotter as a complete multi-city travel planning workspace.

## Primary user goal

Understand the product and begin planning.

## Information hierarchy

1. Product promise
2. Journey visualization
3. Main CTA
4. Product capabilities
5. Supporting explanation
6. Final CTA

## Exact sections

### Section 1: Navigation

Left:
**GlobeTrotter**

Right:

* Login
* Start Planning

Minimal and lightweight.

### Section 2: Hero

Left:

Large headline:

**Plan the journey, not just the destination.**

Supporting text explaining multi-city planning.

CTA:
**Start Planning**

Right:

Large visual journey composition.

Example:

**TOKYO**
↓
**KYOTO**
↓
**OSAKA**

combined with destination imagery.

### Section 3: Journey Preview

Show a stylized fictional trip.

Use one visual journey rather than a grid of feature cards.

### Section 4: Planning Layers

Show the same trip transitioning through:

**Stops → Activities → Itinerary → Budget → Timeline → AI**

### Section 5: Final CTA

**Build your next trip**

## Desktop layout

Large asymmetric hero.

Approximately:

* 45% textual content
* 55% visual route/storytelling area

The page should use a strong vertical rhythm rather than dense cards.

## Mobile layout

Order:

Headline
→ supporting text
→ CTA
→ visual journey
→ feature narrative

The route remains vertical or horizontal-scroll based on available width.

## Loading

Landing should avoid a blocking application-style loader.

Use skeleton only for dynamically loaded imagery if necessary.

## Empty

No empty state needed.

## Error

If external imagery fails, fall back to a neutral destination visual rather than showing a broken-image experience.

## Success

Successful authentication navigation should feel like continuation into the product.

---

# 5.2 LoginPage

## Purpose

Authenticate the user.

## Primary goal

Continue securely with Google.

## Information hierarchy

1. GlobeTrotter identity
2. Authentication message
3. Google OAuth button
4. Supporting information

## Desktop

Split composition:

Left:
destination imagery / route identity

Right:
authentication panel

## Mobile

Single column.

Visual identity remains at the top.

## Loading

OAuth button becomes disabled and communicates progress.

## Error

Inline authentication error near the CTA.

Do not show a technical stack trace.

## Empty

Not applicable.

## Success

Redirect to Dashboard.

---

# 5.3 DashboardPage

## Purpose

Act as the user's trip launch point.

## Primary goal

Open an existing trip or create a new one.

## Information hierarchy

1. Welcome / page title
2. Create Trip
3. Existing Trips
4. Empty state if no trips

## Exact layout

### Header

**Your journeys**

Primary CTA:
**+ Create Trip**

### Trip area

A flowing travel-oriented trip grid.

Do not make every TripCard identical large rounded boxes.

Use a mix of:

* destination image
* trip title
* route metadata
* compact action area

### Empty state

Large, editorial:

**No journeys yet.**

Supporting:
“Start with a city. Build the rest from there.”

CTA:
**Create your first trip**

## Desktop

Two-column or asymmetric trip presentation depending on available number of trips.

Avoid a 4-column SaaS grid.

## Mobile

Single-column cards.

Priority:

Trip title → destination → dates/context → open.

## Loading

Use travel-shaped skeletons resembling trip previews rather than generic grey rectangles.

## Empty

Use a single meaningful starter composition.

## Error

Page-level error message with:
**We couldn't load your trips.**

Retry action.

## Success

After creating a trip, automatically transition into its workspace.

---

# 5.4 CreateTripPage

## Purpose

Create the initial trip object.

## Primary goal

Provide the minimum required trip information and start planning.

## Information hierarchy

1. Trip title / identity
2. Trip details supported by the schema
3. Create action

## Layout

Use a wide centered composition rather than a tiny modal.

Left:

Large visual heading:

**Where is this journey going?**

Right:

Form.

The visual column should remain simple and fast to implement.

## Primary CTA

**Create Trip**

## Secondary

**Back**

## Important components

* TripForm
* form fields defined by actual contract
* validation messaging

## Desktop

50/50 split.

## Mobile

Heading first, form second.

## Loading

CTA changes to a progress state.

## Empty

Required fields visibly indicate what needs input.

## Error

Validation errors should appear next to relevant fields.

Backend failures appear as a form-level message.

## Success

Navigate directly to TripDetailsPage.

---

# 5.5 TripDetailsPage

## Purpose

Act as the main Trip Workspace Overview.

## Primary user goal

Understand the trip and continue building it.

This page is arguably the single most important application screen.

## Information hierarchy

1. Trip identity
2. Route
3. Trip progress / current structure
4. Stops
5. Activities/planning summary
6. Primary actions
7. Optional health insight

## Exact sections

### 1. Trip Header

Large:

**JAPAN**

Secondary:
**Tokyo → Kyoto → Osaka**

Metadata underneath where available.

Actions:

**Add Stop**

Secondary:

**Share**

More actions:
Edit / Delete where appropriate.

### 2. Journey Strip

The strongest visual element.

A horizontal route:

**Tokyo ━━━━━ Kyoto ━━━━━ Osaka**

Each city is a destination node.

The line should visually communicate sequence rather than map geography unless actual geographic data is available.

Do not fake geographic accuracy.

### 3. Stop Explorer

Each stop includes:

* city
* sequence
* associated activities where available
* planning status based on actual state

### 4. Workspace Actions

Prominent actions:

**Plan itinerary**

**View budget**

**View timeline**

These are navigation into different representations of the same trip.

### 5. AI Entry

Compact invitation:

**Need help planning this trip?**

CTA:
**Open Copilot**

AI should not visually dominate the whole workspace.

## Optional

Trip Health Score can appear as a compact insight if that feature is actually implemented.

Because it is explicitly optional in the architecture, it must not become a required centerpiece.

## Desktop layout

Recommended structure:

Left 70%:
trip journey + stops

Right 30%:
planning summary + actions

AI remains available as a contextual utility.

## Mobile

Header → Journey → Stops → action shortcuts.

Use horizontal scrolling for route nodes when needed.

## Loading

Preserve structure:

Header skeleton
Route skeleton
Stop skeletons

## Empty

New trip:

**Your route is empty.**

CTA:
**Add your first stop**

## Error

Isolate failed sections where possible.

Do not blank the complete workspace if one feature fails.

## Success

Adding a stop immediately updates the journey representation.

The success should be subtle:

* node appears
* route extends
* lightweight confirmation

No large toast stack.

---

# 5.6 ItineraryPage

## Purpose

Build and understand the day-wise travel plan.

## Primary goal

Know exactly what happens on each day.

## Information hierarchy

1. Trip header
2. Day selector/context
3. City for that day
4. Day timeline
5. Activities
6. Add activity / planning actions

## Visual concept

### The itinerary should look like a travel journal crossed with a timeline.

Avoid a spreadsheet.

Example:

**DAY 03**
**KYOTO**

09:00
Fushimi Inari

12:30
Lunch

15:00
Kiyomizu-dera

19:30
Evening walk

The time axis should create a strong visual rhythm.

## Primary CTA

**Add Activity**

## Secondary actions

* Add Stop
* Edit activity
* remove activity
* move/edit scheduling according to supported feature behavior

Exact drag-and-drop support is:

**Not specified in the provided architecture**

Therefore do not require drag-and-drop.

## Desktop

Three visual layers:

Left:
day index

Center:
timeline

Right:
activity/context panel

The right panel can be contextual rather than a permanent dense column.

## Mobile

Day selector becomes horizontal scrolling.

Timeline becomes vertical.

Activity cards stack.

## Loading

Skeleton should preserve the timeline shape.

## Empty

For an empty day:

**A day with no plans yet.**

CTA:
**Add Activity**

For a trip with no stops:

**Add a city first.**

## Error

Failed activity loading should affect the relevant section, not the entire page.

## Success

Adding an activity animates it into the day's timeline.

This is an **Optional visual enhancement**, not a functional requirement.

---

# 5.7 BudgetPage

## Purpose

Provide a clear financial view of the trip.

## Primary goal

Understand estimated total cost and major categories.

## Information hierarchy

1. Total estimated cost
2. Budget progress/status
3. Breakdown
4. Relevant details

Only data confirmed by the backend/domain should appear.

## Visual direction

Use a large numerical total at the top.

Example:

**₹48,600**

**Estimated trip cost**

Then a horizontal breakdown.

Do not use six tiny “metric cards”.

## BudgetBreakdown

Prefer:

**Accommodation ███████**

**Travel █████**

**Activities ████**

or another simple relationship-based visualization compatible with actual data.

## Primary CTA

The architecture does not specify a dedicated budget creation/edit CTA.

Therefore:

**Not specified in the provided architecture**

Do not invent one.

## Desktop

Large summary on left.

Breakdown visualization on right.

Details below.

## Mobile

Total → breakdown → details.

## Loading

Numbers use skeleton placeholders.

## Empty

**No budget information yet.**

Explain that cost data becomes visible as trip costs are populated by supported flows.

Exact budget-entry behavior is:

**Not specified in the provided architecture**

## Error

Show a clear retry state.

## Success

Updates to estimated cost should animate numerically only if implementation effort allows.

---

# 5.8 CalendarPage

## Purpose

Show the complete chronological structure of the trip.

## Primary goal

Understand trip duration, city transitions, and activity density.

## Visual concept

Do not make this a generic office calendar.

This should be a **travel timeline**.

Potential structure:

**JUN 14**
Tokyo

────────────

**JUN 15**
Tokyo

────────────

**JUN 16**
→ Kyoto

The journey transition is the visual anchor.

## Primary content

* trip duration
* city sequence
* activities
* empty periods
* busy periods

## Primary CTA

No dedicated CTA is confirmed.

## Desktop

Wide timeline with days as primary units.

## Mobile

Vertical chronological feed.

## Loading

Timeline skeleton maintaining day structure.

## Empty

**Your trip timeline will appear here.**

If there are no planned activities:

**Your dates exist, but the journey is still unwritten.**

CTA toward planning only if a supported navigation path exists.

## Error

Timeline-specific error.

## Success

New itinerary items appear in chronological order.

---

# 5.9 SharedTripPage

## Purpose

Present a trip publicly in an understandable, visually compelling way.

## Primary user goal

Explore the journey.

## Secondary goal

Copy the trip if authenticated.

## Information hierarchy

1. Trip identity
2. Route
3. Journey duration/context
4. Itinerary
5. Activity details
6. Copy Trip

## Visual direction

This should resemble a polished public travel story rather than an application admin screen.

Use:

Large trip title

**TOKYO → KYOTO → OSAKA**

Then a visual journey.

Then itinerary.

Then an unmistakable CTA:

**Copy this trip**

## Desktop

Large editorial hero followed by journey timeline.

## Mobile

Hero → route → itinerary → sticky/floating Copy Trip action.

## Loading

Public-page skeleton with route and itinerary structure.

## Empty

If the shared trip does not contain enough viewable information:

**This trip isn't ready to explore.**

Exact public-visibility edge cases are:

**Not specified in the provided architecture**

## Error

Invalid/unavailable shared trip state should communicate that the trip cannot be viewed.

## Success

Copy Trip should create a new owned trip according to the confirmed architecture.

---

# 5.10 ProfilePage

## Purpose

Manage personal travel preferences.

## Primary goal

Set or update personalization.

## Confirmed sections

### Travel Style

Use visual preference chips/selectors.

### Budget Preference

Use a clear selector.

### Interests

Use multi-select interest controls.

## Primary CTA

**Save Preferences**

## Visual personality

More personal than operational.

Do not make Profile resemble an admin settings console.

## Loading

Preference controls should preserve layout.

## Empty

Unconfigured preferences:

**Tell GlobeTrotter how you like to travel.**

## Error

Inline save error.

## Success

Compact confirmation:

**Preferences updated**

---

# 5.11 NotFoundPage

Keep intentionally simple.

Brand identity + message + return action.

Example:

**This route doesn't exist.**

CTA:
**Back to GlobeTrotter**

Do not spend hackathon design time here.

---

# 6. Visual Design Direction

## 6.1 Selected Design Language

After considering the provided design directions, the strongest fit is:

### **Editorial Travel Utility**

A combination of:

* Editorial composition
* Premium utility
* restrained spatial interface principles
* timeline storytelling
* controlled data density

This matches the Skill's recommendation to synthesize design worlds rather than copy a template.

---

## 6.2 Color Philosophy

Avoid the default purple-gradient AI aesthetic.

Base palette:

### Canvas

Warm off-white / soft ivory.

Purpose:
Feels closer to paper, maps, travel journals and editorial surfaces than a corporate SaaS white.

### Primary text

Deep charcoal / near-black.

Purpose:
Creates strong editorial contrast.

### Accent

A single travel-derived accent.

Recommended direction:

**Sunset terracotta / burnt coral**

Use for:

* active route nodes
* primary CTAs
* selected states
* important numbers
* small visual anchors

### Supporting colors

Muted natural travel tones may appear sparingly: