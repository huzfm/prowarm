import { googleMapsLink, normalizePlace } from "@/lib/geo";
import { nominatim } from "@/lib/nominatim";

/** GET /api/geo/reverse?lat=..&lng=.. — turns GPS coordinates into an address. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const lat = Number.parseFloat(params.get("lat") ?? "");
  const lng = Number.parseFloat(params.get("lng") ?? "");

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    Math.abs(lat) > 90 ||
    Math.abs(lng) > 180
  ) {
    return Response.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  try {
    const raw = await nominatim("reverse", { lat: String(lat), lon: String(lng) });
    const place = raw && !raw.error ? normalizePlace(raw) : null;
    if (!place) {
      return Response.json({ error: "No address found for that point" }, { status: 404 });
    }
    // Keep the device's own fix — it is more precise than the coordinates of
    // whatever building Nominatim matched it to.
    return Response.json({
      result: {
        ...place,
        customerLat: lat,
        customerLng: lng,
        googleMapsLink: googleMapsLink(lat, lng),
      },
    });
  } catch (error) {
    console.error("[geo/reverse]", error);
    return Response.json({ error: "Lookup is unavailable right now" }, { status: 502 });
  }
}
