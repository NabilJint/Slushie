function base64url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function generateStreamToken(userId: string, secret: string): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    user_id: userId,
    exp: now + 14400,
    iat: now,
  };

  const encoder = new TextEncoder();
  const headerB64 = base64url(encoder.encode(JSON.stringify(header)).buffer);
  const payloadB64 = base64url(encoder.encode(JSON.stringify(payload)).buffer);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret).buffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${headerB64}.${payloadB64}`).buffer,
  );

  return `${headerB64}.${payloadB64}.${base64url(signature)}`;
}

function generateCallId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function generateAdminStreamToken(
  secret: string,
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    user_id: "backend",
    role: "admin",
    exp: now + 300,
    iat: now,
  };

  const encoder = new TextEncoder();
  const headerB64 = base64url(encoder.encode(JSON.stringify(header)).buffer);
  const payloadB64 = base64url(encoder.encode(JSON.stringify(payload)).buffer);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret).buffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${headerB64}.${payloadB64}`).buffer,
  );

  return `${headerB64}.${payloadB64}.${base64url(signature)}`;
}

async function createStreamCallWithAgent(
  apiKey: string,
  apiSecret: string,
  callId: string,
  lessonData: Record<string, unknown> | undefined,
) {
  const adminToken = await generateAdminStreamToken(apiSecret);
  const res = await fetch(
    `https://video.stream-io-api.com/video/v1/calls/audio_room/${callId}?api_key=${apiKey}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        create: true,
        members: [
          { user_id: "ai-teacher", role: "admin" },
        ],
        custom: lessonData ?? {},
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("Failed to create Stream call with agent", res.status, body);
    throw new Error(`Stream call creation failed: ${res.status} ${body}`);
  }
}

export async function POST(request: Request) {
  try {
    const {
      userId,
      userName,
      callId: providedCallId,
      lessonData,
    } = await request.json();

    if (!userId) {
      return Response.json({ error: "userId is required" }, { status: 400 });
    }

    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      return Response.json({ error: "Stream credentials not configured" }, { status: 500 });
    }

    const callId = providedCallId || generateCallId();

    const token = await generateStreamToken(userId, apiSecret);

    // Create the call via Stream REST API with agent as admin member and lesson custom data
    await createStreamCallWithAgent(apiKey, apiSecret, callId, lessonData);

    return Response.json({
      apiKey,
      token,
      callId,
      callType: "audio_room",
      userId,
      userName: userName || userId,
    });
  } catch (error) {
    console.error("Stream session error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
