import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Compass,
  LogOut,
  Plus,
  User as UserIcon,
} from "lucide-react";

import { useAuth } from "@/features/auth/AuthProvider";

/**
 * GlobalHeader
 *
 * Persistent application header for authenticated routes.
 *
 * Responsibilities:
 * - Global product identity
 * - Lightweight navigation context
 * - Fast trip creation
 * - Account access
 *
 * The header intentionally stays restrained so the active trip workspace
 * remains the visual focus of the application.
 */
export function GlobalHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const menuId = useId();

  const isDashboard = location.pathname === "/dashboard";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    closeMenu();
    await logout();
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 h-16 shrink-0 border-b border-border-soft bg-surface">
      <div className="mx-auto flex h-full w-full max-w-[1520px] items-center px-4 md:px-8 lg:px-10">
        {/* =================================================
            Brand
            ================================================= */}

        <Link
          to="/dashboard"
          aria-label="GlobeTrotter dashboard"
          className="group flex items-center gap-2.5 no-underline"
        >
          <span
            className="
              flex h-8 w-8 items-center justify-center
              rounded-radius-md
              bg-accent-600
              text-white
              shadow-[0_2px_6px_rgba(28,27,25,0.12)]
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
              group-focus-visible:-translate-y-0.5
            "
          >
            <Compass size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>

          <span className="hidden text-h4 tracking-tight text-ink sm:block">
            GlobeTrotter
          </span>
        </Link>

        {/* =================================================
            Context
            ================================================= */}

        {!isDashboard && (
          <nav
            aria-label="Application breadcrumb"
            className="ml-5 hidden items-center gap-3 md:flex"
          >
            <span
              className="h-4 w-px bg-border-default"
              aria-hidden="true"
            />

            <Link
              to="/dashboard"
              className="
                text-body-sm
                font-medium
                text-ink-secondary
                no-underline
                transition-colors
                hover:text-ink
                focus-ring
              "
            >
              Journeys
            </Link>
          </nav>
        )}

        {/* =================================================
            Spacer
            ================================================= */}

        <div className="flex-1" />

        {/* =================================================
            Primary Quick Action
            ================================================= */}

        <Link
          to="/trips/new"
          aria-label="Create a new trip"
          title="Create a new trip"
          className="
            mr-2
            flex h-9 w-9
            items-center justify-center
            rounded-radius-md
            border border-border-default
            bg-surface
            text-ink-secondary
            no-underline
            transition-all
            hover:border-border-strong
            hover:bg-surface-muted
            hover:text-ink
            focus-ring
          "
        >
          <Plus size={17} strokeWidth={2} aria-hidden="true" />
        </Link>

        {/* =================================================
            Account
            ================================================= */}

        {user && (
          <div ref={menuRef} className="relative">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? menuId : undefined}
              className="
                flex h-10
                items-center gap-2
                rounded-radius-full
                border-0
                bg-transparent
                py-0
                pl-1.5
                pr-2
                transition-colors
                hover:bg-surface-muted
                focus-ring
              "
            >
              <Avatar
                name={user.name}
                avatarUrl={user.avatarUrl}
              />

              <span className="hidden text-body-sm font-medium text-ink-secondary sm:block">
                {user.name}
              </span>

              <ChevronDown
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
                className={`
                  hidden text-ink-muted transition-transform sm:block
                  ${menuOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {menuOpen && (
              <div
                id={menuId}
                role="menu"
                aria-label="Account menu"
                className="
                  absolute right-0 top-full z-50 mt-2
                  w-60
                  overflow-hidden
                  rounded-radius-lg
                  border border-border-default
                  bg-surface
                  py-1.5
                  shadow-modal
                  fade-in
                "
              >
                {/* Account identity */}

                <div className="border-b border-border-soft px-4 pb-3 pt-2.5">
                  <p className="text-caption text-ink-muted">
                    Signed in as
                  </p>

                  <p className="mt-0.5 truncate text-body-sm font-semibold text-ink">
                    {user.name}
                  </p>

                  <p className="truncate text-caption text-ink-muted">
                    {user.email}
                  </p>
                </div>

                {/* Account actions */}

                <div className="py-1">
                  <Link
                    to="/profile"
                    role="menuitem"
                    onClick={closeMenu}
                    className="
                      flex items-center gap-2.5
                      px-4 py-2.5
                      text-body-sm
                      text-ink-secondary
                      no-underline
                      transition-colors
                      hover:bg-surface-muted
                      hover:text-ink
                      focus-ring
                    "
                  >
                    <UserIcon
                      size={16}
                      strokeWidth={1.8}
                      className="text-ink-muted"
                      aria-hidden="true"
                    />

                    Profile & preferences
                  </Link>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="
                      flex w-full items-center gap-2.5
                      border-0 bg-transparent
                      px-4 py-2.5
                      text-left text-body-sm
                      text-error
                      transition-colors
                      hover:bg-error-bg
                      focus-ring-error
                    "
                  >
                    <LogOut
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

/* =========================================================
   Avatar
   ========================================================= */

interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
}

function Avatar({ name, avatarUrl }: AvatarProps) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="
          h-7 w-7
          rounded-full
          object-cover
          ring-1 ring-border-default
        "
      />
    );
  }

  return (
    <span
      className="
        flex h-7 w-7
        items-center justify-center
        rounded-full
        bg-accent-100
        text-accent-600
      "
      aria-hidden="true"
    >
      <UserIcon size={15} strokeWidth={1.8} />
    </span>
  );
}