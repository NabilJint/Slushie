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
      const res = await fetch(`${agentUrl}/calls/${callId}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call_type: "audio_room",
          lesson: lessonData,
        }),
      });

      if (!res.ok) {
        console.error("Vision agent start failed", res.status, await res.text());
        return Response.json({ error: "Failed to start agent" }, { status: 502 });
      }

      return Response.json({ status: "started" });
    }

    if (action === "stop") {
      const res = await fetch(`${agentUrl}/calls/${callId}/sessions`, {
        method: "DELETE",
      });

      if (!res.ok && res.status !== 404) {
        console.error("Vision agent stop failed", res.status, await res.text());
      }

      return Response.json({ status: "stopped" });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Agent API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
