import { Text, View } from "react-native";

interface FeedbackPanelProps {
  speaking: string;
  pronunciation: string;
  grammar: string;
}

function scoreColor(score: string) {
  if (score === "Excellent") return "text-mint-pop";
  if (score === "Great") return "text-electric-blue";
  return "text-voltage-violet";
}

const METRICS = ["Speaking", "Pronunciation", "Grammar"] as const;

export default function FeedbackPanel({
  speaking,
  pronunciation,
  grammar,
}: FeedbackPanelProps) {
  const scores = [speaking, pronunciation, grammar];

  return (
    <View className="px-6 py-2">
      <View className="bg-paper-white border border-carbon rounded-[20px] p-5 flex-row">
        {METRICS.map((metric, i) => (
          <View
            key={metric}
            className={`flex-1 items-center ${i < METRICS.length - 1 ? "border-r border-carbon/10" : ""}`}
          >
            <Text className="font-body text-carbon/40 text-xs font-bold uppercase tracking-wider">
              {metric}
            </Text>
            <Text
              className={`font-display text-base font-extrabold mt-1.5 ${scoreColor(scores[i])}`}
            >
              {scores[i]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
