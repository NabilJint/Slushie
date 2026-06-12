const AGENT_TIMEOUT = 10_000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number },
): Promise<Response> {
  const timeout = options.timeout ?? AGENT_TIMEOUT;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  try {
    const { action, callId, lessonData } = await request.json();

    if (!action || !callId) {
      return Response.json({ error: "action and callId are required" }, { status: 400 });
    }

    const agentUrl = process.env.VISION_AGENT_URL;
    if (!agentUrl) {
      return Response.json({ error: "Vision agent not configured" }, { status: 501 });
    }

    if (action === "start") {
      try {
        const res = await fetchWithTimeout(`${agentUrl}/calls/${callId}/sessions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            call_type: "audio_room",
            lesson: lessonData,
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          console.error("Vision agent start failed", res.status, body);
          return Response.json({ error: "Failed to start agent" }, { status: 502 });
        }

        return Response.json({ status: "started" });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return Response.json({ error: "Vision agent request timed out" }, { status: 504 });
        }
        throw err;
      }
    }

    if (action === "stop") {
      try {
        const res = await fetchWithTimeout(`${agentUrl}/calls/${callId}/sessions`, {
          method: "DELETE",
        });

        if (!res.ok && res.status !== 404) {
          const body = await res.text();
          console.error("Vision agent stop failed", res.status, body);
          return Response.json({ error: "Failed to stop agent", status: res.status, body }, { status: 502 });
        }

        return Response.json({ status: "stopped" });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return Response.json({ error: "Vision agent stop request timed out" }, { status: 504 });
        }
        throw err;
      }
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Agent API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
