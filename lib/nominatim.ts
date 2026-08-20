import { siteConfig } from "@/lib/site";

const BASE = "https://nominatim.openstreetmap.org";

/**
 * Nominatim's usage policy requires an identifying User-Agent and caps callers
 * at roughly one request per second, so every call goes through the server and
 * responses are cached for a day (addresses rarely move).
 */
export async function nominatim(
  path: "search" | "reverse",
  params: Record<string, string>
) {
  const url = new URL(`${BASE}/${path}`, BASE);
  url.search = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    ...params,
  }).toString();

  const response = await fetch(url, {
    headers: {
      "User-Agent": `${siteConfig.name} (${siteConfig.url}; ${siteConfig.email})`,
      "Accept-Language": "en",
    },
    next: { revalidate: 86_400 },
  });

  if (!response.ok) throw new Error(`Nominatim ${path} failed: ${response.status}`);
  return response.json();
}
