import { Outlet } from 'react-router-dom';
import { GlobalHeader } from '@/components/common/GlobalHeader';
import { ScrollToTop } from '@/components/common/ScrollToTop';

/**
 * AppLayout — authenticated application shell.
 * Contains the global header and outlet for page content.
 */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[90] focus:h-10 focus:px-4 focus:inline-flex focus:items-center focus:bg-ink focus:text-white focus:text-body-sm focus:font-semibold focus:rounded-radius-md focus:no-underline"
      >
        Skip to content
      </a>
      <GlobalHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <ScrollToTop />
    </div>
  );
}
