import type { GeminiRouteResponse, RouteOption } from './types';

const SYSTEM_PROMPT = `You are "Lahore Smart Transit Guide", an expert on Lahore, Pakistan's multi-modal public transport system. You have deep, current knowledge of:
- The Orange Line Metro Train (OLMT) running east-west from Ali Town (Gujjumata) to Dera Gujran, with stations including Ali Town, Thokar Niaz Baig, Wahdat Road, Masjed-e-Shuhada, Anarkali, Central Station, Mahmood Booti, Sultanpura, and Dera Gujran.
- The Lahore Metro Bus (BRT) running along Ferozepur Road from Shahdara in the north to Gajjumata in the south, with stations including Shahdara, Old Ravi Bridge, Timber Market, Bhatti Chowk, MAO College, Qila Gujjar Singh, Lakshmi, Civil Secretariat, Anarkali, Qainchi, Nishter Town, and Gajjumata.
- Speedo feeder bus routes that connect neighborhoods to OLMT and Metro Bus stations.
- The new electric (EV) buses operating on selected routes across the city.

When a student gives you a "Current Location" and a "Destination" within Lahore, you must:
1. Recommend 2 to 3 realistic route options using the systems above (mix of direct and transfer options when sensible).
2. Use accurate, well-known stop names from the systems listed above (or major Lahore landmarks/areas if a feeder bus is involved).
3. Estimate fares in Pakistani Rupees (PKR) that reflect current real-world pricing (Metro Bus ~ PKR 40, Orange Line ~ PKR 20-40, Speedo buses ~ PKR 30-40, EV buses ~ PKR 40-50; transfers add up).
4. Estimate realistic travel times in minutes including walking, waiting, and transfers.
5. Write a friendly 2-sentence "studentGuide" explaining how to make the journey, aimed at a first-year university student who is new to the city.

You must respond with ONLY a valid JSON object (no markdown, no code fences, no commentary) in exactly this shape:
{
  "routes": [
    {
      "id": 1,
      "routeName": "Short human-readable name of the route",
      "totalFarePKR": 40,
      "estimatedTimeMin": 35,
      "boardingPoint": "Station/stop name where the student boards",
      "transferPoint": "Station/stop name where they switch modes, or null if the route is direct",
      "dropoffPoint": "Station/stop name where they alight",
      "studentGuide": "Two friendly sentences."
    }
  ]
}

Rules:
- Always return between 2 and 3 routes.
- "transferPoint" must be null for a direct one-mode route, and a real stop name for a route that requires a transfer.
- "id" must be a unique integer starting at 1.
- Output ONLY the JSON object. Nothing else.`;

export interface RouteQuery {
  currentLocation: string;
  destination: string;
}

export async function fetchRoutes(
  query: RouteQuery
): Promise<RouteOption[]> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'NEXT_PUBLIC_GEMINI_API_KEY is not configured. Add it to your environment variables to enable AI route suggestions.'
    );
  }

  const userPrompt = `Current location: ${query.currentLocation}\nDestination: ${query.destination}\n\nReturn the JSON object now.`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        response_mime_type: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Gemini API request failed (${res.status}). ${text.slice(0, 200)}`
    );
  }

  const data = await res.json();
  const text: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Gemini returned an empty response. Please try again.');
  }

  return parseRouteResponse(text);
}

function parseRouteResponse(text: string): RouteOption[] {
  let cleaned = text.trim();

  // Strip markdown code fences if the model added them despite instructions.
  if (cleaned.startsWith('```')) {
    cleaned = cleaned
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
  }

  let parsed: GeminiRouteResponse;
  try {
    parsed = JSON.parse(cleaned) as GeminiRouteResponse;
  } catch {
    // Try to extract the first {...} block as a last resort.
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('Could not parse the AI response as JSON. Please try again.');
    }
    parsed = JSON.parse(match[0]) as GeminiRouteResponse;
  }

  const routes = parsed.routes;
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error('The AI did not return any routes. Please try again.');
  }

  return routes.map((r, i) => ({
    id: r.id ?? i + 1,
    routeName: r.routeName ?? `Route ${i + 1}`,
    totalFarePKR: Number(r.totalFarePKR) || 0,
    estimatedTimeMin: Number(r.estimatedTimeMin) || 0,
    boardingPoint: r.boardingPoint ?? '—',
    transferPoint: r.transferPoint ?? null,
    dropoffPoint: r.dropoffPoint ?? '—',
    studentGuide: r.studentGuide ?? '',
  }));
}
