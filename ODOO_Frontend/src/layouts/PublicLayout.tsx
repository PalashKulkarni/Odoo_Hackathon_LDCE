import { Outlet } from 'react-router-dom';

/**
 * PublicLayout — for landing, login, and shared trip pages.
 * No persistent navigation shell. Each page controls its own header.
 */
export function PublicLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <Outlet />
    </div>
  );
}
