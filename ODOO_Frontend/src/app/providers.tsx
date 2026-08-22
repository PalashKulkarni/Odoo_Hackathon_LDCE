import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "@/features/auth/AuthProvider";
import { router } from "@/app/router";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { ToastProvider } from "@/components/ui/Toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ErrorBoundary>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ErrorBoundary>
      </ToastProvider>
    </QueryClientProvider>
  );
}
