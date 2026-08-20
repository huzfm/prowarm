/**
 * Shared geocoding types and helpers.
 *
 * Places are resolved through OpenStreetMap's Nominatim service from our own
 * route handlers (`/api/geo/*`) so no API key ships to the browser and the
 * usage policy's User-Agent requirement is satisfied server-side.
 */

/** A location the customer has confirmed, in the shape the backend expects. */
export type GeoPlace = {
  /** Full readable address, e.g. "Huzaifa Masjid, Tando Adam, Sindh". */
  customerAddress: string;
  customerLat: number;
  customerLng: number;
  /** Short city/town name, e.g. "Tando Adam". */
  location: string;
  googleMapsLink: string;
};

/** A search suggestion: a place plus the id we key the list on. */
export type GeoSuggestion = GeoPlace & { id: string };

export function googleMapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

/** The `message` sent to the backend when the customer pins a location. */
export function pinnedLocationMessage(place: GeoPlace) {
  return `Pinned location: ${place.customerAddress} — ${place.customerLat.toFixed(
    5
  )}, ${place.customerLng.toFixed(5)} — ${place.googleMapsLink}`;
}

/** Subset of a Nominatim result we rely on. */
type NominatimResult = {
  place_id?: number | string;
  osm_id?: number | string;
  lat: string;
  lon: string;
  name?: string;
  display_name?: string;
  address?: Record<string, string>;
};

const LINE_KEYS = [
  "amenity",
  "building",
  "shop",
  "office",
  "tourism",
  "historic",
  "house_name",
  "road",
  "neighbourhood",
  "hamlet",
] as const;

const CITY_KEYS = [
  "city",
  "town",
  "village",
  "municipality",
  "suburb",
  "county",
  "state_district",
] as const;

function firstOf(address: Record<string, string>, keys: readonly string[]) {
  for (const key of keys) {
    const value = address[key]?.trim();
    if (value) return value;
  }
  return "";
}

/**
 * Collapses a Nominatim result into "<place>, <city>, <state>" — the country
 * and postcode are noise for a delivery/survey address in one country.
 */
export function normalizePlace(result: NominatimResult): GeoSuggestion | null {
  const customerLat = Number.parseFloat(result.lat);
  const customerLng = Number.parseFloat(result.lon);
  if (!Number.isFinite(customerLat) || !Number.isFinite(customerLng)) return null;

  const address = result.address ?? {};
  const line = result.name?.trim() || firstOf(address, LINE_KEYS);
  const city = firstOf(address, CITY_KEYS);
  const state = address.state?.trim() ?? "";

  const parts: string[] = [];
  for (const part of [line, city, state]) {
    if (part && !parts.includes(part)) parts.push(part);
  }

  const customerAddress =
    parts.join(", ") ||
    // Fall back to the raw label minus the trailing country segment.
    (result.display_name ?? "").split(", ").slice(0, -1).join(", ") ||
    result.display_name ||
    `${customerLat}, ${customerLng}`;

  return {
    id: String(result.place_id ?? result.osm_id ?? `${result.lat},${result.lon}`),
    customerAddress,
    customerLat,
    customerLng,
    location: city || state || line || customerAddress,
    googleMapsLink: googleMapsLink(customerLat, customerLng),
  };
}
