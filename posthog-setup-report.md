<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Slushie language learning app. Here's a summary of everything that was set up:

**Installation & Configuration**
- Installed `posthog-react-native` and `react-native-svg` (required peer dependency).
- Created `app.config.js` to expose `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` as Expo extras, loaded via `expo-constants` at runtime.
- Created `lib/posthog.ts` as a singleton PostHog client with lifecycle tracking, batching, and debug mode enabled in development.
- Wrapped the app in `PostHogProvider` inside `app/_layout.tsx` with autocapture for touches enabled.
- Added automatic screen tracking in `app/_layout.tsx` using `posthog.screen()` on every pathname change.
- Added a pnpm-specific ESLint ignore for `posthog-react-native` to suppress a false-positive `import/no-unresolved` error caused by pnpm's virtual store symlinks.

**User Identification**
- `posthog.identify()` is called on sign-up completion with the Clerk user ID as the distinct ID, plus `$set: { email }` and `$set_once: { sign_up_date }`.
- `posthog.identify()` is called on sign-in completion, linking the session ID to the user's email.
- `posthog.reset()` is called on sign-out to clear the identity association.

**Event Tracking**

| Event | Description | File |
|---|---|---|
| `onboarding_get_started` | User taps "Get Started" on the onboarding screen — top of conversion funnel | `app/onboarding.tsx` |
| `sign_up_completed` | User successfully creates an account and email verification succeeds | `app/(auth)/sign-up.tsx` |
| `sign_up_failed` | User encounters an error during the sign-up flow (validation or server error) | `app/(auth)/sign-up.tsx` |
| `sign_in_completed` | User successfully logs in via email code verification | `app/(auth)/sign-in.tsx` |
| `sign_in_failed` | User encounters an error during the sign-in flow (validation or server error) | `app/(auth)/sign-in.tsx` |
| `language_selected` | User confirms a language choice on the language selection screen | `app/language-select.tsx` |
| `continue_learning_tapped` | User taps "Continue" on the home screen to resume their current language course | `app/(tabs)/index.tsx` |
| `ai_video_call_started` | User taps the AI Video Call button on the home screen | `app/(tabs)/index.tsx` |
| `sign_out_completed` | User signs out from the app | `app/index.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/198330/dashboard/739419)
- [Onboarding to sign-up conversion funnel](https://eu.posthog.com/project/198330/insights/9cifUFQr) — tracks drop-off between Get Started and completed sign-up
- [Daily sign-ups and sign-ins](https://eu.posthog.com/project/198330/insights/920sJTxJ) — monitors user acquisition trends over time
- [Language selections](https://eu.posthog.com/project/198330/insights/S4n48hCf) — shows which languages users are choosing
- [Home screen engagement](https://eu.posthog.com/project/198330/insights/ZZ3OvtXc) — compares Continue Learning taps vs AI video call starts
- [Auth error rate](https://eu.posthog.com/project/198330/insights/ji4zhPFW) — surfaces sign-up/sign-in failure spikes

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
