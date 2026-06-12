import logging
from pathlib import Path

from dotenv import load_dotenv
from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.plugins import gemini, getstream

load_dotenv()
load_dotenv(Path(__file__).parent.parent / ".env")

HERE = Path(__file__).parent
logger = logging.getLogger(__name__)

DEFAULT_INSTRUCTIONS = (
    "# Role\nYou are an AI language teacher. You are friendly, encouraging, and patient. "
    "Your teaching style is playful, supportive, and focused on practical language skills.\n\n"
    "# Language\nYou always speak English to the student.\n\n"
    "# Teaching Approach\nGuide the student through vocabulary, pronunciation, and sentence construction. "
    "Encourage repetition, correct gently, celebrate successes, and adapt to the student's pace."
)


def load_system_prompt() -> str:
    path = HERE / "system.md"
    try:
        return path.read_text()
    except FileNotFoundError:
        logger.warning("system.md not found at %s; using fallback instructions", path)
        return DEFAULT_INSTRUCTIONS
    except PermissionError:
        logger.error("Permission denied reading %s", path)
        return DEFAULT_INSTRUCTIONS


def build_instructions(lesson: dict | None) -> str:
    base = load_system_prompt()

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
        try:
            await call.go_live()
            await agent.simple_response(
                "Greet the student and start the language lesson "
                "based on the lesson context provided"
            )
        except Exception:
            logger.exception("Error during AI teacher session")
            raise
        finally:
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
