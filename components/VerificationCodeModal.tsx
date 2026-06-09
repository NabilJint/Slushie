import { useState, useRef, useEffect } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, type Href } from "expo-router";

interface VerificationCodeModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onComplete?: (code: string) => void;
}

const CODE_LENGTH = 6;

export default function VerificationCodeModal({
  visible,
  email,
  onClose,
  onComplete,
}: VerificationCodeModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [visible]);

  const handleChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      setTimeout(() => {
        if (onComplete) {
          onComplete(digits);
        } else {
          router.replace("/" as Href);
        }
      }, 300);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          activeOpacity={1}
          onPress={onClose}
        />

        <View className="bg-paper-white rounded-t-3xl px-6 pb-10 pt-8">
          <View className="w-10 h-1 bg-concrete-gray/50 rounded-full self-center mb-6" />

          <Text className="font-display text-carbon text-2xl font-bold text-center mb-2">
            Check your email
          </Text>
          <Text className="font-body text-carbon/50 text-base text-center mb-8">
            We sent a verification code to{"\n"}
            <Text className="text-carbon font-medium">{email}</Text>
          </Text>

          <View className="flex-row justify-center gap-3 mb-8">
            {Array.from({ length: CODE_LENGTH }).map((_, i) => {
              const filled = i < code.length;
              const active = i === code.length;
              return (
                <View
                  key={i}
                  className={`w-14 h-14 rounded-2xl border-2 items-center justify-center ${
                    active
                      ? "border-voltage-violet bg-voltage-violet/5"
                      : filled
                        ? "border-voltage-violet bg-voltage-violet/10"
                        : "border-concrete-gray/50"
                  }`}
                >
                  <Text
                    className={`font-display text-xl ${
                      filled ? "text-voltage-violet" : "text-transparent"
                    }`}
                  >
                    {code[i] || ""}
                  </Text>
                </View>
              );
            })}
          </View>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            className="absolute opacity-0 h-0 w-0"
            style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            className="self-center"
          >
            <Text className="font-body text-carbon/40 text-sm">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
