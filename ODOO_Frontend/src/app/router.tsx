import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  type RouteObject,
} from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
import { TripWorkspaceLayout } from "@/layouts/TripWorkspaceLayout";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";

/* =========================================================
   Route-level lazy pages
   ========================================================= */

const LandingPage = lazy(() =>
  import("@/pages/LandingPage").then((module) => ({
    default: module.LandingPage,
  }))
);

const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);

const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  }))
);

const CreateTripPage = lazy(() =>
  import("@/pages/CreateTripPage").then((module) => ({
    default: module.CreateTripPage,
  }))
);

const TripOverviewPage = lazy(() =>
  import("@/pages/TripOverviewPage").then((module) => ({
    default: module.TripOverviewPage,
  }))
);

const ItineraryPage = lazy(() =>
  import("@/pages/ItineraryPage").then((module) => ({
    default: module.ItineraryPage,
  }))
);

const ActivitiesPage = lazy(() =>
  import("@/pages/ActivitiesPage").then((module) => ({
    default: module.ActivitiesPage,
  }))
);

const BudgetPage = lazy(() =>
  import("@/pages/BudgetPage").then((module) => ({
    default: module.BudgetPage,
  }))
);

const CalendarPage = lazy(() =>
  import("@/pages/CalendarPage").then((module) => ({
    default: module.CalendarPage,
  }))
);

const SharedTripPage = lazy(() =>
  import("@/pages/SharedTripPage").then((module) => ({
    default: module.SharedTripPage,
  }))
);

const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  }))
);

const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

/* =========================================================
   Route loading boundary

   Intentionally minimal so the shell remains visually stable.
   ========================================================= */

function RouteLoader() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center px-6"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 text-ink-secondary">
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-accent-500"
          aria-hidden="true"
        />
        <span className="text-body-sm">Loading your journey</span>
      </div>
    </div>
  );
}

/* =========================================================
   Route wrapper
   ========================================================= */

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

/* =========================================================
   Route tree
   ========================================================= */

const routes: RouteObject[] = [
  /* -------------------------------------------------------
     Public
     ------------------------------------------------------- */

  {
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<LandingPage />),
      },
      {
        path: "login",
        element: withSuspense(<LoginPage />),
      },
      {
        path: "shared/:slug",
        element: withSuspense(<SharedTripPage />),
      },
    ],
  },

  /* -------------------------------------------------------
     Authenticated application
     ------------------------------------------------------- */

  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: withSuspense(<DashboardPage />),
      },
      {
        path: "trips/new",
        element: withSuspense(<CreateTripPage />),
      },
      {
        path: "profile",
        element: withSuspense(<ProfilePage />),
      },

      /* ---------------------------------------------------
         Trip Workspace

         One trip object.
         Multiple connected planning views.
         The TripWorkspaceLayout remains persistent.
         --------------------------------------------------- */

      {
        path: "trips/:tripId",
        element: <TripWorkspaceLayout />,
        children: [
          {
            index: true,
            element: withSuspense(<TripOverviewPage />),
          },
          {
            path: "itinerary",
            element: withSuspense(<ItineraryPage />),
          },
          {
            path: "activities",
            element: withSuspense(<ActivitiesPage />),
          },
          {
            path: "budget",
            element: withSuspense(<BudgetPage />),
          },
          {
            path: "timeline",
            element: withSuspense(<CalendarPage />),
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------
     Not Found
     ------------------------------------------------------- */

  {
    path: "*",
    element: withSuspense(<NotFoundPage />),
  },
];

export const router = createBrowserRouter(routes);