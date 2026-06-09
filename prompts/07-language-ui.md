Read AGENTS.md first and follow it strictly.

Implement the language selection screen UI based on the attached design. Use the hardcoded languages from `data/languages.ts` and the existing NativeWind/global.css design utilities.

Replace "See all languages" with confirmation button and use the earth image from the assets folder properly.

Add a link on the home screen route (/) to navigate to the language selection screen route.

refeence: import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Strict interface matching structural language properties
interface LanguageItem {
  id: string;
  name: string;
  learners: string;
  flag: string; // Emoji character string mapping source graphic targets
}

export default function LanguageSelectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');

  const languages: LanguageItem[] = [
    { id: 'spanish', name: 'Spanish', learners: '28.4M learners', flag: '🇪🇸' },
    { id: 'french', name: 'French', learners: '19.4M learners', flag: '🇫🇷' },
    { id: 'japanese', name: 'Japanese', learners: '12.7M learners', flag: '🇯🇵' },
    { id: 'korean', name: 'Korean', learners: '9.3M learners', flag: '🇰🇷' },
    { id: 'german', name: 'German', learners: '8.1M learners', flag: '🇩🇪' },
    { id: 'chinese', name: 'Chinese', learners: '7.4M learners', flag: '🇨🇳' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-paper-white">
      <StatusBar style="dark" />
      
      {/* 1. Navigation Header Row */}
      <View className="flex-row items-center justify-between px-6 py-4 h-14">
        <TouchableOpacity className="p-1 -ml-1" activeOpacity={0.7}>
          <Text className="text-carbon font-display text-2xl font-bold">
            {`‹`}
          </Text>
        </TouchableOpacity>
        
        <Text className="text-carbon font-display text-lg font-bold tracking-tight">
          Choose a language
        </Text>
        
        {/* Alignment spacer layout object mirroring header composition */}
        <View className="w-6" />
      </View>

      {/* 2. Language Directory Structural Layout */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6"
      >
        {/* Input Interface: Search Languages Bar */}
        <View className="w-full bg-soft-mist/50 border border-concrete-gray/40 rounded-full h-12 flex-row items-center px-4 mb-6">
          <Text className="text-carbon/40 font-body text-base mr-3">🔍</Text>
          <TextInput
            placeholder="Search languages"
            placeholderTextColor="#00000060"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-carbon font-body text-base p-0 m-0"
          />
        </View>

        {/* List Section Category Header Label */}
        <Text className="text-carbon font-display text-lg font-bold mb-4">
          Popular
        </Text>

        {/* Dynamic Interactive Language Stack Cards */}
        <View className="space-y-3 gap-3 mb-4">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLanguage(lang.id)}
                activeOpacity={0.85}
                style={isSelected ? styles.selectedCardBorder : styles.cardBorder}
                className={`w-full h-18 flex-row items-center justify-between px-4 rounded-2xl bg-paper-white`}
              >
                {/* Left Side Grouping: Flag Visual & Text Meta Data */}
                <View className="flex-row items-center flex-1">
                  <View className="w-11 h-11 items-center justify-center bg-soft-mist/30 rounded-full mr-4">
                    <Text style={{ fontSize: 28 }} className="include-font-padding-false">
                      {lang.flag}
                    </Text>
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

                {/* Right Side Control Indicator: Checks or Direction Arrows */}
                <View className="ml-2">
                  {isSelected ? (
                    <View className="w-6 h-6 rounded-full bg-voltage-violet items-center justify-center">
                      <Text className="text-paper-white font-display text-xs font-bold">✓</Text>
                    </View>
                  ) : (
                    <Text className="text-carbon/30 font-display text-lg font-medium">
                      {`›`}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Overflow Menu Target Component Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.cardBorder}
          className="w-full h-14 flex-row items-center justify-center rounded-2xl bg-paper-white mb-8"
        >
          <Text className="text-carbon font-body text-base mr-2">🌐</Text>
          <Text className="text-carbon font-display text-base font-medium">
            See all languages
          </Text>
        </TouchableOpacity>

        {/* 3. Footer Earth Backdrop Illustration Module Canvas */}
        <View className="w-full items-center justify-end mt-auto pt-6 overflow-hidden">
          {/* Mock visual element block rendering the architectural landmarks scene path at footer */}
          <View className="w-full items-center justify-center h-28 relative">
            <View className="w-[120%] h-60 bg-mint-pop/20 rounded-t-[300px] absolute -bottom-36 border border-carbon/10 items-center pt-4">
              <View className="w-[90%] h-48 bg-electric-blue/20 rounded-t-[240px] absolute -bottom-24" />
            </View>
            <Text className="text-3xl tracking-widest text-center z-10 select-none opacity-80">
              🗼 🏰 🏛 🕋 🕌
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Preserves clear wireframe borders dynamically mapping systemic selection tones
  cardBorder: {
    borderWidth: 1,
    borderColor: '#e9e9e9',
  },
  selectedCardBorder: {
    borderWidth: 1.5,
    borderColor: '#5c4ade',
  }
});