import { z } from "zod";

/** Where enquiries are delivered. */
const LEADS_API_URL = "https://api.theheatingstore.in/api/leads";

/** The payload the contact form sends — keep in sync with `contact-form.tsx`. */
const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  location: z.string().trim().min(1).max(120),
  customerAddress: z.string().trim().min(1).max(300),
  customerLat: z.number().min(-90).max(90),
  customerLng: z.number().min(-180).max(180),
  googleMapsLink: z.url(),
  message: z.string().trim().min(1).max(2000),
});

export type Lead = z.infer<typeof leadSchema>;

/** POST /api/contact — receives an enquiry with a pinned location. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected a JSON body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid enquiry", issues: z.treeifyError(parsed.error) },
      { status: 422 }
    );
  }

  const lead = parsed.data;

  // Forwarded server-side rather than posted straight from the browser, so the
  // lead API needs no CORS headers for this origin. Override with LEADS_API_URL.
  const endpoint = process.env.LEADS_API_URL ?? LEADS_API_URL;

  try {
    const forwarded = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      cache: "no-store",
    });

    if (!forwarded.ok) {
      const detail = await forwarded.text().catch(() => "");
      console.error("[contact] lead API responded", forwarded.status, detail.slice(0, 500));
      return Response.json({ error: "Could not deliver your enquiry" }, { status: 502 });
    }

    // Pass the lead API's own payload through when it sends one.
    const data = await forwarded.json().catch(() => null);
    return Response.json({ ok: true, data }, { status: 201 });
  } catch (error) {
    console.error("[contact] forwarding failed", error);
    return Response.json({ error: "Could not deliver your enquiry" }, { status: 502 });
  }
}
