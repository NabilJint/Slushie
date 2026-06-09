import { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { router, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/use-language-store";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LanguageSelectScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const storeLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const [selectedLanguage, setSelectedLanguage] = useState(storeLanguageId ?? "es");
  const setLanguage = useLanguageStore((state) => state.setSelectedLanguage);

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />

      <View className="flex-row items-center  justify-between px-6 py-4 h-14">
        <TouchableOpacity
          className="p-1 -ml-1"
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text className="text-carbon font-display text-2xl font-bold leading-none">
            &#8249;
          </Text>
        </TouchableOpacity>

        <Text className="text-carbon font-display text-lg font-bold tracking-tight">
          Choose a language
        </Text>

        <View className="w-6" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search languages"
          leftIcon={
            <Text className="text-carbon/40 font-body text-base">
              &#x1F50D;
            </Text>
          }
        />

        <Text className="text-carbon font-display text-lg font-bold my-4">
          Popular
        </Text>

        <View className="gap-3 mb-4">
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLanguage(lang.id)}
                activeOpacity={0.85}
                className={`w-full h-18 flex-row items-center justify-between px-4 rounded-2xl bg-paper-white ${
                  isSelected
                    ? "border-voltage-violet border-[1.5px]"
                    : "border-soft-mist border"
                }`}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-11 h-11 items-center justify-center bg-soft-mist/30 rounded-full mr-4 overflow-hidden">
                    <Image
                      source={{ uri: lang.flagEmoji }}
                      style={{ width: 28, height: 28 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text className="text-carbon font-display text-base font-semibold mb-0.5">
                      {lang.name}
                    </Text>
                    <Text className="text-carbon/40 font-body text-xs">
                      {lang.learners}
                    </Text>
                  </View>
                </View>

                <View className="ml-2">
                  {isSelected ? (
                    <View className="w-6 h-6 rounded-full bg-voltage-violet items-center justify-center">
                      <Text className="text-paper-white font-display text-xs font-bold">
                        &#x2713;
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-carbon/30 font-display text-lg font-medium">
                      &#8250;
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View>
        <View className="px-6 pb-4">
          <Button
            title="Confirm"
            onPress={() => {
              setLanguage(selectedLanguage);
              router.replace("/" as Href);
            }}
            disabled={!selectedLanguage}
          />
        </View>

        <View className="overflow-hidden" style={{ height: 200 }}>
          <Image
            source={images.earth}
            style={{ width: "100%", height: "100%" }}
            resizeMode="center"
            className="mt-auto"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
