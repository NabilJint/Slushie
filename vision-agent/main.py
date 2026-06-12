from pathlib import Path

from dotenv import load_dotenv
from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.plugins import gemini, getstream

load_dotenv()
load_dotenv(Path(__file__).parent.parent / ".env")

HERE = Path(__file__).parent


def build_instructions(lesson: dict | None) -> str:
    base = (HERE / "system.md").read_text()

    if not lesson:
        return base

    lang = lesson.get("language", {})
    lang_name = lang.get("name", "the target language")
    lang_code = lang.get("code", "")

    lesson_title = lesson.get("lessonTitle", "")
    lesson_desc = lesson.get("lessonDescription", "")
    goals = lesson.get("goals", [])
    vocabulary = lesson.get("vocabularyItems", [])
    phrases = lesson.get("phrases", [])
    ai_prompt = lesson.get("aiTeacherPrompt", {})

    context_prompt = (
        ai_prompt.get("contextPrompt", "")
        if ai_prompt
        else ""
    )
    voice_style = (
        ai_prompt.get("voiceStyle", "")
        if ai_prompt
        else ""
    )

    parts = [base, "\n\n## Current Lesson\n"]

    parts.append(f"You are teaching **{lang_name}** (language code: {lang_code}).")
    parts.append(f"Lesson title: {lesson_title}")
    parts.append(f"Lesson description: {lesson_desc}")

    if goals:
        parts.append(f"\nLesson goals:\n" + "\n".join(f"- {g}" for g in goals))

    if vocabulary:
        parts.append(f"\nVocabulary to teach:\n" + "\n".join(
            f"- {v.get('word', '')} = {v.get('translation', '')}"
            + (f" (pronounced: {v.get('pronunciation', '')})" if v.get("pronunciation") else "")
            for v in vocabulary
        ))

    if phrases:
        parts.append(f"\nPhrases to practice:\n" + "\n".join(
            f"- {p.get('phrase', '')} = {p.get('translation', '')}"
            for p in phrases
        ))

    if context_prompt:
        parts.append(f"\nTeaching context: {context_prompt}")

    if voice_style:
        parts.append(f"Voice style: {voice_style}")

    return "\n".join(parts)


async def create_agent(**kwargs) -> Agent:
    lesson = kwargs.get("lesson")
    instructions = build_instructions(lesson)

    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="AI Language Teacher", id="ai-teacher"),
        instructions=instructions,
        llm=gemini.Realtime(),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)

    async with agent.join(call):
        await call.go_live()
        await agent.simple_response("Greet the student and start the language lesson based on the lesson context provided")
        await agent.finish()


if __name__ == "__main__":
    Runner(
        AgentLauncher(
            create_agent=create_agent,
            join_call=join_call,
            max_sessions_per_call=1,
            agent_idle_timeout=120.0,
        ),
    ).cli()
