# 1. Design Philosophy

## Core concept

**GlobeTrotter = Editorial Travel Utility**

The interface should feel like a **personal travel studio with operational precision underneath**.

The visual system has two modes:

* **Explore**: destination imagery, route storytelling, travel atmosphere
* **Plan**: itinerary, activities, costs, dates, decisions

The transition between these modes must feel continuous. The product should not become a generic dashboard once the user logs in.

### Primary design principle

> **One trip, one visual world.**

A user is never moving between unrelated modules. They are viewing the same trip through different lenses:

**Overview → Itinerary → Activities → Budget → Timeline → AI → Share**

The approved blueprint explicitly defines the journey line as the signature visual and requires the trip workspace to preserve trip identity across views. 

## Visual personality

Use four qualities:

* **Editorial**: strong typography and deliberate composition
* **Warm**: ivory canvas and travel-derived color
* **Precise**: structured layouts and readable data
* **Quietly expressive**: one memorable route system, not excessive decoration

### Hard restraint rule

The route, trip identity, and important information must always be visually stronger than decorative UI.

Do not add:

* random blobs
* floating decorative icons
* gradients for decoration
* glass cards
* excessive shadows
* colorful feature-card grids
* generic analytics widgets

---

# 2. Exact Design Tokens

Use these as Tailwind theme tokens.

## Color palette

### Core surfaces

| Token          |       Hex | Tailwind usage      |
| -------------- | --------: | ------------------- |
| Canvas         | `#F7F4EE` | `bg-canvas`         |
| Surface        | `#FFFDF9` | `bg-surface`        |
| Surface Muted  | `#F0ECE4` | `bg-surface-muted`  |
| Surface Strong | `#E7E1D7` | `bg-surface-strong` |

### Text

| Token         |       Hex | Usage           |
| ------------- | --------: | --------------- |
| Ink           | `#1C1B19` | Primary text    |
| Ink Secondary | `#625E57` | Supporting text |
| Ink Muted     | `#8B857D` | Metadata        |
| Ink Disabled  | `#B8B2AA` | Disabled states |

### Primary accent

| Token          |       Hex | Usage                               |
| -------------- | --------: | ----------------------------------- |
| Terracotta 600 | `#C85D3E` | Primary buttons, active route nodes |
| Terracotta 500 | `#D66D4E` | Hover accent                        |
| Terracotta 100 | `#F5DDD5` | Selected backgrounds                |
| Terracotta 50  | `#FBEFEB` | Subtle accent surfaces              |

### Supporting semantic colors

These are functional only. They are not competing brand accents.

| Token      |       Hex | Usage                             |
| ---------- | --------: | --------------------------------- |
| Success    | `#4F7A61` | Successful save, completed status |
| Success BG | `#E6F0E8` | Success surface                   |
| Warning    | `#A76B1F` | Attention states                  |
| Warning BG | `#F7ECD9` | Warning surface                   |
| Error      | `#B5473C` | Errors/destructive                |
| Error BG   | `#F8E5E1` | Error surface                     |
| Info       | `#52718A` | Informational status              |
| Info BG    | `#E7EFF4` | Info surface                      |

### Borders

| Token          |       Hex |
| -------------- | --------: |
| Border Soft    | `#E7E1D8` |
| Border Default | `#D8D1C7` |
| Border Strong  | `#B9B1A6` |

## Exact color rules

1. **Canvas is the default application background.**
2. **Surface is reserved for content requiring separation.**
3. **Terracotta is the dominant interactive accent.**
4. No screen should use multiple decorative accent colors.
5. Supporting colors appear only for semantic meaning.
6. Never use accent color for large paragraph text.
7. Never create large gradient backgrounds.
8. The route uses terracotta selectively:

   * active/current nodes: filled terracotta
   * inactive nodes: canvas/surface with border
   * connecting line: neutral border color
9. Destructive actions always use error styling, never terracotta.

## Tailwind color configuration

```js
colors: {
  canvas: "#F7F4EE",
  surface: "#FFFDF9",
  "surface-muted": "#F0ECE4",
  "surface-strong": "#E7E1D7",

  ink: {
    DEFAULT: "#1C1B19",
    secondary: "#625E57",
    muted: "#8B857D",
    disabled: "#B8B2AA",
  },

  accent: {
    50: "#FBEFEB",
    100: "#F5DDD5",
    500: "#D66D4E",
    600: "#C85D3E",
  },

  success: "#4F7A61",
  warning: "#A76B1F",
  error: "#B5473C",
  info: "#52718A",
}
```

---

## Border radius

Use a restrained radius system.

| Token         |    Value | Usage           |
| ------------- | -------: | --------------- |
| `radius-sm`   |    `8px` | Small controls  |
| `radius-md`   |   `12px` | Inputs, buttons |
| `radius-lg`   |   `16px` | Standard cards  |
| `radius-xl`   |   `20px` | Major surfaces  |
| `radius-full` | `9999px` | Pills, avatars  |

Do not use `rounded-3xl` or larger as a default.

## Borders

Default:

```css
border: 1px solid #E7E1D8;
```

Strong separation:

```css
border: 1px solid #D8D1C7;
```

Avoid thick borders except:

* focus rings
* route emphasis
* selected states

## Shadows

Shadows should be subtle.

### Default elevated surface

```css
box-shadow: 0 4px 18px rgba(28, 27, 25, 0.06);
```

### Hover elevation

```css
box-shadow: 0 10px 28px rgba(28, 27, 25, 0.10);
```

### Modal

```css
box-shadow: 0 24px 64px rgba(28, 27, 25, 0.18);
```

Do not use:

* colored glows
* huge blur shadows
* shadow on every container

---

# 3. Typography System

## Font pairing

### Display

**DM Serif Display**

Use for:

* landing hero
* major trip titles
* public shared trip
* large editorial statements

### UI and body

**Inter**

Use for:

* navigation
* forms
* buttons
* metadata
* timelines
* budget information
* operational screens

Both are easy to load through Google Fonts and practical for a hackathon.

## Font rules

### Display typography

| Role                 | Desktop | Mobile | Weight |
| -------------------- | ------: | -----: | -----: |
| Hero                 |    72px |   48px |    400 |
| Display XL           |    56px |   40px |    400 |
| Trip Title           |    48px |   36px |    400 |
| Page Editorial Title |    40px |   32px |    400 |

Line-height: `0.95–1.05`

### UI headings

| Role | Size | Weight | Line height |
| ---- | ---: | -----: | ----------: |
| H1   | 36px |    650 |         1.1 |
| H2   | 28px |    650 |         1.2 |
| H3   | 22px |    600 |         1.3 |
| H4   | 18px |    600 |        1.35 |

### Body

| Role       | Size | Weight |
| ---------- | ---: | -----: |
| Body Large | 18px |    400 |
| Body       | 16px |    400 |
| Body Small | 14px |    400 |
| Metadata   | 13px |    500 |
| Caption    | 12px |    500 |

## Uppercase labels

Use sparingly for:

* route numbering
* day labels
* category labels
* small editorial metadata

Example:

```text
DAY 03
KYOTO
```

Style:

```css
font-size: 12px;
font-weight: 600;
letter-spacing: 0.12em;
text-transform: uppercase;
```

Do not uppercase buttons by default.

---

## Spacing scale

Use an 8-point system with limited 4-point increments.

```text
4   = 0.25rem
8   = 0.5rem
12  = 0.75rem
16  = 1rem
20  = 1.25rem
24  = 1.5rem
32  = 2rem
40  = 2.5rem
48  = 3rem
64  = 4rem
80  = 5rem
96  = 6rem
128 = 8rem
```

### Usage

* icon gap: `8`
* label to input: `8`
* component internal spacing: `16`
* related component groups: `24`
* major workspace grouping: `32`
* page section separation: `48`
* landing sections: `80–128`

Workspace screens should be denser than landing pages, matching the approved distinction between expressive landing and structured planning. 

---

# 4. Layout and Responsive System

## Breakpoints

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Maximum widths

### Marketing pages

```text
max-w-[1440px]
```

### Application pages

```text
max-w-[1600px]
```

### Forms

```text
max-w-[640px]
```

### Reading/public content

```text
max-w-[960px]
```

## Page padding

| Device        | Horizontal |
| ------------- | ---------: |
| Mobile        |       16px |
| Tablet        |       24px |
| Desktop       |       32px |
| Large Desktop |       48px |

---

## Global desktop shell

```text
┌───────────────────────────────────────────────────────┐
│ Global Header                                        │ 64px
├───────────────┬───────────────────────────────────────┤
│ Workspace Rail│ Trip Identity + Route Context        │
│ 240px         ├───────────────────────────────────────┤
│               │ Main Content                         │
│               │                                       │
│               │                                       │
└───────────────┴───────────────────────────────────────┘
```

### Header

Desktop height:

```text
64px
```

Contains:

* GlobeTrotter identity
* trip breadcrumb/context when inside workspace
* Share/contextual actions
* profile entry where needed

### Desktop workspace rail

Width:

```text
240px
```

Optional compact tablet width:

```text
72px
```

The rail should not resemble an enterprise sidebar.

---

## Tablet

At `<1024px`:

* rail collapses to icon rail or contextual top navigation
* complex two-column layouts stack when content becomes cramped
* AI panel becomes drawer/sheet
* route remains visible but may horizontally scroll

## Mobile

At `<768px`:

* no permanent side rail
* workspace navigation becomes bottom navigation
* primary views only:

```text
Overview
Itinerary
Budget
Timeline
```

AI and Share are contextual actions.

The blueprint specifically establishes this mobile behavior. 

### Mobile bottom navigation

Height:

```text
64px + safe-area inset
```

Use:

* icon
* short label
* active accent marker

Do not put AI inside the permanent bottom navigation.

---

## Grid rules

### Dashboard

```text
Desktop: 2 columns
Tablet: 2 columns where viable
Mobile: 1 column
```

Avoid defaulting to 3 or 4 tiny cards.

### Operational content

Use:

```text
12-column desktop grid
8-column tablet grid
4-column mobile grid
```

### Common layouts

**70/30**

Trip overview:

```text
Main journey: 8 columns
Supporting actions: 4 columns
```

**60/40**

Budget:

```text
Summary: 7 columns
Breakdown: 5 columns
```

**Full width**

Itinerary and calendar should prioritize continuous visual flow.

---

# 5. Component Visual System

## Buttons

### Primary

```text
Background: Accent 600
Text: white
Height: 44px
Radius: 12px
Horizontal padding: 18px
Font: 14px / 600
```

Hover:

```text
Accent 500
```

Active:

```text
scale(0.98)
```

### Secondary

```text
Background: transparent or surface
Border: Border Default
Text: Ink
```

### Tertiary

Text only.

Use for:

* edit
* back
* cancel
* secondary navigation

### Destructive

```text
Background: Error BG
Text: Error
```

Do not make destructive actions visually equal to primary actions.

---

## Inputs

```text
Height: 48px
Background: Surface
Border: 1px solid Border Default
Radius: 12px
Padding: 0 14px
Font size: 16px
```

Focus:

```text
border-color: Accent 600
ring: 3px Accent 100
```

Error:

```text
border-color: Error
```

Labels:

```text
14px
600 weight
8px gap above field
```

Helper/error text:

```text
13px
```

---

## Cards

### Standard Card

Use only when grouping related information.

```text
Background: Surface
Border: 1px solid Border Soft
Radius: 16px
Padding: 20–24px
Shadow: none by default
```

Hoverable card:

```text
transition: 180ms
border becomes stronger
subtle shadow appears
translateY(-2px)
```

Do not wrap every section in a card.

---

## Badge

```text
Height: 26px
Padding: 0 10px
Radius: full
Font: 12px / 600
```

Use for:

* city state
* planning context
* preference selections
* semantic status

Avoid badges for meaningless labels.

---

## Icons

Recommended:

**Lucide React**

Rules:

* 20px default
* 18px compact
* 24px prominent action
* 16px inline metadata

Stroke width should remain visually consistent.

Icons explain actions. They do not decorate empty spaces.

---

## Modal/dialog

Desktop:

```text
Width: 480–640px
Max height: 85vh
Radius: 20px
Background: Surface
Padding: 24–32px
```

Backdrop:

```text
rgba(28,27,25,0.35)
```

Use modals for:

* destructive confirmation
* sharing
* focused creation/editing

Do not place large multi-step workflows in tiny modals.

---

## Loading skeleton

Use:

```text
Surface Strong background
Subtle opacity animation
Same dimensions as final content
```

Never replace an entire workspace with a centered spinner if layout can remain visible.

The source blueprint explicitly requires loading states to preserve structure and avoid layout jumps. 

---

## Component states

### Hover

* border contrast increase
* background shift
* maximum `2px` elevation

### Focus

Visible keyboard focus:

```text
3px accent-100 ring
1px accent-600 border
```

### Active

```text
transform: scale(0.98)
```

Only buttons and strongly interactive controls should scale.

### Disabled

```text
opacity: 0.45
cursor: not-allowed
```

No hover animation.

---

# 6. Page-by-Page Specifications

## 6.1 Landing Page

### Purpose

Communicate GlobeTrotter as a multi-city journey planning workspace.

### Section order

1. Navigation
2. Hero
3. Journey preview
4. Planning layers
5. AI/personalization explanation
6. Sharing concept
7. Final CTA

### Hero

Desktop:

```text
45% text
55% visual journey
```

Left:

* editorial headline
* supporting copy
* primary CTA

Right:

* destination imagery
* route composition
* destination names

Example visual:

```text
TOKYO
  │
  ●
  │
KYOTO
  │
  ●
  │
OSAKA
```

The route should be more memorable than a generic hero photograph.

### Primary action

**Start Planning**

### Responsive

Mobile order:

```text
Headline
Supporting text
CTA
Journey visual
Remaining sections
```

### Loading

Only image placeholders if imagery is dynamic.

### Error

Failed image should fall back to neutral visual composition, never a broken image icon.

---

## 6.2 Login Page

### Purpose

Authenticate with minimal friction.

### Layout

Desktop split:

```text
45% visual identity
55% authentication
```

Visual side:

* route fragment
* destination image
* GlobeTrotter identity

Authentication side:

* concise heading
* supporting text
* Google OAuth CTA

### Primary action

**Continue with Google**

### Loading

Button:

```text
disabled
spinner/icon
"Continuing..."
```

### Error

Inline message below CTA.

### Mobile

Single column.

Authentication remains the priority.

---

## 6.3 Dashboard

### Purpose

Trip launch point.

### Section order

1. Global header
2. Page title
3. Create Trip CTA
4. Trip collection

### Header

```text
Your journeys                         + Create Trip
```

### Trip cards

Each card should contain only actual available data:

* trip name
* destination/route
* date context
* optional destination imagery

Do not invent analytics.

### Card layout

Desktop:

* two-column asymmetric presentation
* larger featured trip possible if data/order supports it
* avoid uniform 4-column card grid

### Empty state

```text
No journeys yet.
Start with a city. Build the rest from there.

[ Create your first trip ]
```

### Error

```text
We couldn't load your trips.

[ Retry ]
```

---

## 6.4 Create Trip

### Purpose

Create the initial trip object.

### Layout

Desktop:

```text
50% editorial introduction
50% form
```

Left:

```text
Where is this journey going?
```

Right:

Actual form fields from the existing schema only.

### Primary action

**Create Trip**

### Secondary

**Back**

### Loading

CTA:

```text
Creating trip...
```

### Error

* field-level validation near field
* backend error at form level

### Success

Navigate directly into the trip workspace.

No confirmation page.

---

## 6.5 Trip Overview

### Purpose

Provide the main understanding of the trip.

### Section order

1. Trip identity header
2. Journey line
3. Stops
4. Planning actions
5. Supporting planning summary
6. AI entry point

### Primary action

**Add Stop**

### Secondary

* Share
* Plan itinerary
* View budget
* View timeline

### Layout

Desktop:

```text
8 columns: Journey + Stops
4 columns: Summary + Actions
```

### Empty state

```text
Your route is waiting.

Start → Add your first city

[ Add Stop ]
```

### Loading

Preserve:

* trip header
* route
* stop structure

### Error

Failed sections should fail independently where possible.

### Success

Adding a stop:

1. adds destination node
2. extends journey line
3. updates stop sequence

No giant success toast.

---

## 6.6 Itinerary

### Purpose

Show what happens each day.

### Section order

1. Persistent trip context
2. Day selector
3. Current day/city
4. Timeline
5. Activities
6. Add Activity

### Visual structure

```text
DAY 03
KYOTO

09:00 ─●─ Fushimi Inari
12:30 ─●─ Lunch
15:00 ─●─ Kiyomizu-dera
19:30 ─●─ Evening walk
```

### Desktop

```text
Day index
Timeline
Contextual activity panel
```

### Mobile

* horizontal day selector
* vertical timeline
* stacked activity details

### Primary action

**Add Activity**

### Empty day

```text
This day is still open.

[ Add Activity ]
```

### No stops

```text
Add a city first.
```

### Loading

Timeline-shaped skeleton.

Do not use generic card skeletons.

---

## 6.7 Activities

### Purpose

Manage activities associated with trip stops while preserving destination context.

### Section order

1. Trip context
2. Stop/city selector
3. Selected destination identity
4. Activity list
5. Add Activity

### Visual hierarchy

```text
KYOTO
3 planned activities

Temple visit
Tea experience
Night walk
```

Each activity must clearly show its destination context.

### Primary action

**Add Activity**

### Important interaction

If an activity is used in itinerary context, the UI should distinguish:

* activity data
* scheduled day/time

Do not imply scheduling if that data does not exist.

### Empty

```text
Nothing planned here yet.

[ Add Activity ]
```

---

## 6.8 Budget

### Purpose

Show the financial layer of the current trip.

### Section order

1. Trip context
2. Large estimated total
3. Budget status/progress if actual data supports it
4. Breakdown
5. Details

### Visual hierarchy

```text
₹48,600
Estimated trip cost
```

Then:

```text
Accommodation   ██████████
Travel          ███████
Activities      █████
```

Use actual categories only.

### Do not use

* six metric cards
* fake spending analytics
* invented budget controls

### Empty

```text
No cost information yet.
```

### Responsive

Desktop:

```text
Summary left
Breakdown right
```

Mobile:

```text
Total
Breakdown
Details
```

---

## 6.9 Calendar / Timeline

### Purpose

Show the chronological rhythm of the trip.

### Section order

1. Trip context
2. Duration
3. Day sequence
4. City transitions
5. Activities
6. Empty/busy periods

### Desktop

Wide horizontal timeline.

### Mobile

Vertical chronological feed.

### Visual concept

```text
JUN 14
TOKYO
────────────

JUN 15
TOKYO
────────────

JUN 16
→ KYOTO
────────────
```

City transitions should receive stronger visual emphasis than ordinary day separators.

### Empty

```text
Your dates exist, but the journey is still unwritten.
```

---

## 6.10 AI Copilot

### Purpose

Provide contextual planning assistance for the currently open trip.

### Desktop

Right-side panel.

Recommended width:

```text
400px
```

The main workspace remains visible.

### Structure

1. Copilot header
2. Current trip context
3. Prompt suggestions
4. Conversation
5. AI recommendations
6. Input

### Prompt examples

* Suggest activities for this trip
* Help me balance this itinerary
* Find ways to reduce costs
* What should I consider for this trip?

### Recommendation card

```text
AI SUGGESTION

Day 4 looks activity-heavy.

Move one activity to Day 5.

[ Review ] [ Dismiss ]
```

### Preview

For multi-part changes:

```text
Before
Day 4 · 4 activities

After
Day 4 · 3 activities
Day 5 · 1 activity added

[ Apply changes ] [ Cancel ]
```

AI suggestions must never visually appear as already committed. The approved UX explicitly requires review and normal application updates after acceptance. 

### Loading

Use contextual copy:

```text
Reviewing your itinerary...
Looking at your trip...
```

### Error

```text
I couldn't generate a recommendation right now.

[ Try again ]
```

### Mobile

Full-height sheet or dedicated overlay.

---

## 6.11 Shared Trip

### Purpose

Present a public trip as a travel story.

### Section order

1. Trip hero
2. Route
3. Duration/context
4. Itinerary
5. Activity details
6. Copy Trip CTA

### Hero

Large trip identity.

```text
JAPAN

TOKYO → KYOTO → OSAKA
```

### Primary action

**Copy this trip**

### Desktop

Editorial wide layout.

### Mobile

Sticky/floating Copy Trip CTA.

### Empty

```text
This trip isn't ready to explore.
```

### Error

Clear unavailable state.

---

## 6.12 Profile

### Purpose

Manage travel preferences.

### Section order

1. Identity
2. Travel Style
3. Budget Preference
4. Interests
5. Save

### Controls

Use chips/selectors.

Selected:

```text
Terracotta 100 background
Terracotta 600 border/text
```

### Primary action

**Save Preferences**

### Empty

```text
Tell GlobeTrotter how you like to travel.
```

### Success

Small inline confirmation:

```text
Preferences updated
```

---

# 7. Trip Workspace Specification

This is the core implementation.

## Desktop shell

```text
┌────────────────────────────────────────────────────────────┐
│ GlobeTrotter / Japan                     Share   Profile   │
├────────────────┬───────────────────────────────────────────┤
│                │ JAPAN                                     │
│ CURRENT TRIP   │ Tokyo → Kyoto → Osaka                     │
│                │ [ Journey Line ]                          │
│ Overview       ├───────────────────────────────────────────┤
│ Itinerary      │                                           │
│ Activities     │ Main Content                              │
│ Budget         │                                           │
│ Timeline       │                                           │
│                │                                           │
│ ───────────    │                                           │
│ Ask Copilot    │                                           │
│ Share          │                                           │
└────────────────┴───────────────────────────────────────────┘
```

## Workspace shell

Recommended React structure:

```text
TripWorkspaceShell
├── WorkspaceHeader
├── TripIdentityHeader
├── JourneyLine
├── WorkspaceRail
└── WorkspaceContent
```

The shell remains stable while the content changes.

This implements the approved concept of **same trip, different lens**. 

---

## Trip identity header

Must remain visible at the top of every workspace view.

Contains:

```text
Trip Name
Route Summary
Dates/Duration if available
Current Context
Share Action
```

Example:

```text
JAPAN
Tokyo → Kyoto → Osaka
12 DAYS
```

Avoid filling this area with statistics.

---

## Journey line

### Desktop

Horizontal.

```text
01 TOKYO ───────── 02 KYOTO ───────── 03 OSAKA
```

### Mobile

Horizontal scroll.

### Node structure

```text
Sequence number
Node
City name
Optional real status
```

### Status rules

Default:

```text
Outlined neutral node
```

Active/current:

```text
Filled terracotta node
```

Do not invent geographic meaning.

Do not turn the route into a fake map.

The source specifically requires an abstract sequence rather than pretending geographic accuracy. 

---

## Workspace rail

### Structure

```text
CURRENT TRIP

Overview
Itinerary
Activities
Budget
Timeline

────────────

Ask Copilot
Share
```

### Active item

Use:

* 3px left accent marker
* `accent-50` background
* stronger text
* icon

Do not use large filled navigation buttons.

### Mobile

Bottom navigation:

```text
Overview | Itinerary | Budget | Timeline
```

Activities should remain accessible from relevant trip context if architecture/routing requires it, but should not overload the bottom navigation.

AI:

* header action
* floating contextual action
* sheet

Share:

* header action

---

## Context persistence rules

Every workspace view must show at least:

1. trip name
2. route summary or journey line
3. current workspace section
4. current trip identity

When changing sections:

```text
Trip context stays fixed
Main content changes
```

Never transition to a page that visually looks disconnected from the trip.

---

# 8. Reusable Component Design Rules

## `TripWorkspaceShell`

Purpose: persistent trip environment.

Contains:

* header
* trip context
* navigation
* route
* content outlet

Use on:

* overview
* itinerary
* activities
* budget
* timeline

---

## `TripIdentityHeader`

Purpose: answer:

> Which trip am I working on?

Contains only:

* title
* route
* dates/context if available
* contextual actions

---

## `JourneyLine`

Purpose: signature product visual.

Props conceptually:

```text
stops
activeStop
status
orientation
```

Must support:

* horizontal desktop
* horizontal-scroll mobile
* simplified compact version

---

## `TripCard`

Purpose: represent a journey on Dashboard.

Structure:

```text
Image/visual identity
Trip name
Route
Date context
Open action
```

Not a generic SaaS record card.

---

## `StopCard`

Purpose: represent one destination in trip structure.

Contains:

* sequence
* city
* activity count/context if available
* planning actions

Use border separation rather than excessive nested cards.

---

## `ActivityCard`

Purpose: represent an activity.

Contains:

* activity title
* city context
* time/day only when available
* actions

Avoid decorative imagery by default.

---

## `ActivityTimelineItem`

Purpose: render itinerary rhythm.

Contains:

```text
Time
Timeline node
Activity
Supporting context
```

This should be one of the most polished reusable components.

---

## `BudgetProgress`

Purpose: show cost relationships.

Use:

* label
* value
* horizontal progress visualization

Not a pie chart unless actual category proportions make it useful.

---

## `AIRecommendationCard`

Purpose: visually separate AI suggestions from committed trip data.

Contains:

* AI label
* recommendation
* impact/preview
* review/apply
* dismiss

---

## `EmptyJourneyState`

Purpose: guide first action.

Structure:

```text
Short emotional statement
Visual route placeholder
Single clear action
```

Avoid giant illustration libraries.

---

# 9. Image/Asset Strategy

## Where imagery belongs

### High imagery

* Landing hero
* Dashboard trip identity
* Login visual side
* Shared Trip hero

### Moderate imagery

* Trip overview destination identity
* stop identity if imagery is already available

### Minimal imagery

* Itinerary
* Budget
* Calendar
* AI Copilot
* Profile

This preserves the transition:

> **Inspiration → Organization**

The blueprint explicitly defines this imagery hierarchy. 

---

## Image ratios

### Hero

```text
4:5 or 16:10
```

### Dashboard trip

```text
16:10
```

### Small destination identity

```text
1:1
```

### Shared Trip

```text
16:9 or 3:2
```

---

## Image treatment

Use:

```text
object-cover
subtle warm overlay only when needed for text
border-radius: 16–20px
```

Do not apply:

* heavy blur
* gradient overlays by default
* glass panels on top
* multiple competing images

## Free asset sources

Use implementation-friendly free sources such as:

* Unsplash
* Pexels
* local static image assets

Avoid depending on complicated illustration systems.

---

# 10. Interaction Rules

## Transition duration

Use:

```text
150ms: micro interactions
180–220ms: buttons/cards
250–300ms: panels/sheets
```

Default easing:

```text
ease-out
```

No slow UI.

---

## Hover

Interactive cards:

```text
translateY(-2px)
border contrast increase
subtle shadow
```

Buttons:

```text
background transition
```

Do not animate everything.

---

## Route interaction

When a stop is added:

1. route line extends
2. node appears
3. stop enters the list

Optional:

```text
250–400ms path reveal
```

Only implement if simple.

---

## Itinerary interaction

When an activity is added:

* insert into correct chronological position
* briefly highlight new item
* do not bounce

If drag/reorder is not already supported by the architecture, do not build it.

---

## Expand/collapse

Use for:

* activity details
* stop details
* mobile contextual sections

Duration:

```text
200ms
```

---

## AI response

Recommended sequence:

```text
User sends prompt
↓
Contextual loading copy
↓
Response appears
↓
Recommendation card appears
↓
User reviews
↓
Apply or dismiss
```

Do not animate text character-by-character unless it is trivial and does not slow usability.

---

## Page transitions

Optional and lightweight.

Workspace section change:

```text
content opacity: 0 → 1
translateY: 4px → 0
duration: 180ms
```

The workspace shell should remain stable.

---

# 11. Final Implementation Rules for the Coding Agent

## Non-negotiable rules

1. **Do not redesign the product.**
2. Treat the UX/UI blueprint as the source of truth.
3. Do not invent backend capabilities.
4. Use only data actually available from existing frontend/backend contracts.
5. Keep the trip identity visible throughout the workspace.
6. Build one persistent `TripWorkspaceShell`.
7. Make `JourneyLine` the recurring signature component.
8. Do not create a generic SaaS dashboard.
9. Do not default every section to a rounded card.
10. Use typography and composition before decoration.
11. Use one dominant accent per screen.
12. Avoid gradients unless a very specific image readability need exists.
13. Avoid glassmorphism.
14. Use subtle shadows only for elevation.
15. Itinerary must be timeline-first, not grid-first.
16. Calendar must feel like a travel chronology, not an office calendar.
17. AI must remain contextual to the current trip.
18. AI suggestions must be visually distinct from committed data.
19. Never imply an AI change has already been applied.
20. Mobile is a different layout, not a shrunken desktop.
21. Loading states must preserve final layout structure.
22. Empty states must explain the next useful action.
23. Errors should be local where possible.
24. Success feedback should happen near the action.
25. Prioritize polish on:

* Trip Workspace
* Journey Line
* Itinerary
* AI Copilot
* Landing Page
* Dashboard

## Recommended implementation order

### Phase 1: Foundation

* Tailwind tokens
* fonts
* global shell
* buttons
* inputs
* cards
* responsive utilities

### Phase 2: Signature system

* `TripWorkspaceShell`
* `TripIdentityHeader`
* `JourneyLine`
* workspace navigation

### Phase 3: Core screens

* Landing
* Dashboard
* Trip Overview
* Itinerary
* AI Copilot

### Phase 4: Supporting screens

* Create Trip
* Activities
* Budget
* Timeline
* Shared Trip

### Phase 5: Final polish

* loading states
* empty states
* error states
* hover/focus states
* mobile refinement

## Final visual test

Before considering the frontend complete, check this:

> If all ordinary card styling were removed, would GlobeTrotter still be recognizable through its typography, journey line, route context, and travel-oriented composition?

If the answer is no, the implementation has drifted toward generic SaaS design.

The intended final product is not a dashboard with travel photos. It is **a visual travel workspace where the journey itself organizes the product**. 
