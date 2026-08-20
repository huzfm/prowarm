import { normalizePlace } from "@/lib/geo";
import { nominatim } from "@/lib/nominatim";

/** GET /api/geo/search?q=tando+adam — address autocomplete. */
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (query.length < 3) return Response.json({ results: [] });

  try {
    const raw = await nominatim("search", { q: query, limit: "6" });
    const results = (Array.isArray(raw) ? raw : [])
      .map(normalizePlace)
      .filter((place) => place !== null);
    return Response.json({ results });
  } catch (error) {
    console.error("[geo/search]", error);
    return Response.json({ error: "Search is unavailable right now" }, { status: 502 });
  }
}
