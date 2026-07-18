"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Tracks the user's reduced-motion preference, including live changes.
 *
 * Uses useSyncExternalStore rather than useState + useEffect: a media query is
 * an external store, and setting state from an effect body causes the cascading
 * render React 19 warns about.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // Server snapshot: assume motion is allowed, then correct on hydration.
    () => false,
  );
}
