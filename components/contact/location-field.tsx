"use client";

import { Check, Crosshair, Loader2, MapPin, Search, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GeoPlace, GeoSuggestion } from "@/lib/geo";
import { cn } from "@/lib/utils";

type Mode = "auto" | "search";

type LocationFieldProps = {
  value: GeoPlace | null;
  onChange: (place: GeoPlace | null) => void;
  invalid?: boolean;
  describedBy?: string;
};

export function LocationField({
  value,
  onChange,
  invalid,
  describedBy,
}: LocationFieldProps) {
  const [mode, setMode] = useState<Mode>("auto");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listboxId = useId();
  const inputId = useId();
  // Ignores results from a search the customer has already typed past.
  const requestId = useRef(0);

  const select = useCallback(
    (place: GeoPlace) => {
      onChange(place);
      setOpen(false);
      setSuggestions([]);
      setHighlighted(-1);
      setError(null);
    },
    [onChange]
  );

  // Debounced address search — Nominatim asks callers to stay near 1 req/s.
  useEffect(() => {
    if (mode !== "search") return;
    const q = query.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setSearching(false);
      return;
    }

    const id = ++requestId.current;
    const controller = new AbortController();
    setSearching(true);

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/geo/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        if (id !== requestId.current) return;
        if (!response.ok) throw new Error(data?.error ?? "Search failed");
        setSuggestions(data.results ?? []);
        setHighlighted(-1);
        setOpen(true);
        setError(null);
      } catch (cause) {
        if (controller.signal.aborted || id !== requestId.current) return;
        setSuggestions([]);
        setError(cause instanceof Error ? cause.message : "Search failed");
      } finally {
        if (id === requestId.current) setSearching(false);
      }
    }, 350);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [mode, query]);

  async function detect() {
    if (!("geolocation" in navigator)) {
      setError("This browser cannot share a location — search for it instead.");
      return;
    }
    setLocating(true);
    setError(null);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15_000,
          maximumAge: 60_000,
        });
      });
      const { latitude, longitude } = position.coords;
      const response = await fetch(`/api/geo/reverse?lat=${latitude}&lng=${longitude}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Could not read that location");
      select(data.result as GeoPlace);
    } catch (cause) {
      // A GeolocationPositionError carries a numeric `code`; anything else is
      // our own fetch/lookup failure and already has a readable message.
      setError(
        cause && typeof cause === "object" && "code" in cause
          ? "Location permission was denied — search for your address instead."
          : cause instanceof Error
            ? cause.message
            : "Could not read that location"
      );
    } finally {
      setLocating(false);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (event.key === "Enter" && highlighted >= 0) {
      event.preventDefault();
      select(suggestions[highlighted]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  if (value) {
    return (
      <div
        className={cn(
          "rounded-field border border-copper-500/35 bg-copper-50/70 p-4",
          invalid && "border-danger"
        )}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-copper-500 text-white">
            <Check className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium break-words text-charcoal-900">
              {value.customerAddress}
            </p>
            <p className="mt-1 text-xs tabular-nums text-charcoal-500">
              {value.customerLat.toFixed(5)}, {value.customerLng.toFixed(5)}
            </p>
            <a
              href={value.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-copper-600 transition-colors hover:text-copper-700"
            >
              <MapPin className="size-4" aria-hidden />
              View on Google Maps
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setQuery("");
              setSuggestions([]);
            }}
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-charcoal-400 transition-colors hover:bg-charcoal-900/5 hover:text-charcoal-900"
          >
            <X className="size-4" aria-hidden />
            <span className="sr-only">Clear location</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="How would you like to give your location?"
        className="inline-flex rounded-full border border-charcoal-900/12 bg-white p-1"
      >
        {(
          [
            { id: "auto", label: "Use my location", Icon: Crosshair },
            { id: "search", label: "Search address", Icon: Search },
          ] as const
        ).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={mode === id}
            onClick={() => {
              setMode(id);
              setError(null);
            }}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
              mode === id
                ? "bg-copper-500 text-white"
                : "text-charcoal-600 hover:text-charcoal-900"
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        ))}
      </div>

      {mode === "auto" ? (
        <div className="mt-3">
          <Button
            type="button"
            variant="outline"
            onClick={detect}
            disabled={locating}
            aria-describedby={describedBy}
          >
            {locating ? (
              <>
                <Loader2 className="animate-spin" aria-hidden />
                Finding you…
              </>
            ) : (
              <>
                <Crosshair aria-hidden />
                Detect my location
              </>
            )}
          </Button>
          <p className="mt-2 text-sm text-charcoal-400">
            Your browser will ask permission first. We only keep the address and
            coordinates you confirm.
          </p>
        </div>
      ) : (
        <div className="relative mt-3">
          <label htmlFor={inputId} className="sr-only">
            Search for your address
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-charcoal-400"
              aria-hidden
            />
            <Input
              id={inputId}
              role="combobox"
              autoComplete="off"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={
                highlighted >= 0 ? `${listboxId}-${highlighted}` : undefined
              }
              aria-invalid={invalid ? true : undefined}
              aria-describedby={describedBy}
              placeholder="Street, landmark or area…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              onKeyDown={onKeyDown}
              onBlur={() => setTimeout(() => setOpen(false), 120)}
              onFocus={() => suggestions.length > 0 && setOpen(true)}
              className="pl-11"
            />
            {searching ? (
              <Loader2
                className="absolute top-1/2 right-4 size-4 -translate-y-1/2 animate-spin text-charcoal-400"
                aria-hidden
              />
            ) : null}
          </div>

          {open && suggestions.length > 0 ? (
            <ul
              id={listboxId}
              role="listbox"
              className="absolute inset-x-0 top-full z-20 mt-2 max-h-72 overflow-auto rounded-field border border-charcoal-900/10 bg-white py-1 shadow-card-hover"
            >
              {suggestions.map((place, i) => (
                <li
                  key={place.id}
                  id={`${listboxId}-${i}`}
                  role="option"
                  aria-selected={highlighted === i}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => select(place)}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 px-4 py-2.5 text-sm",
                    highlighted === i ? "bg-copper-50" : "bg-transparent"
                  )}
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-copper-500" aria-hidden />
                  <span className="min-w-0">
                    <span className="block font-medium text-charcoal-900">
                      {place.customerAddress}
                    </span>
                    <span className="block text-xs tabular-nums text-charcoal-400">
                      {place.customerLat.toFixed(5)}, {place.customerLng.toFixed(5)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {open && !searching && suggestions.length === 0 && query.trim().length >= 3 ? (
            <p className="mt-2 text-sm text-charcoal-400">
              No matches — try a nearby landmark or a wider area.
            </p>
          ) : null}
        </div>
      )}

      {error ? (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
