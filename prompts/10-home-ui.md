Read AGENTS.md first and follow it strictly.

Implement the Home screen UI exactly as shown in the attached design with spacing structure and such neatly exactly done. Display the logged-in user information from Clerk and the selected language from Zustand + AsyncStorage.

Use the learning data from `data/*` to show current lesson, progress, and today’s plan.

Use assets from the assets folder via the centralized images import. If any image is missing, use a suitable placeholder from Unsplash or Picsum.

reference:
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-paper-white">
      <StatusBar style="dark" />

      {/* 1. TOP HEADER MODULE NAVIGATION BAR */}
      <View className="flex-row items-center justify-between px-6 py-3 border-b border-soft-mist">
        {/* Left Flag & Welcome Context */}
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-full overflow-hidden bg-soft-mist items-center justify-center mr-3 border border-carbon/10">
            <Text style={{ fontSize: 22 }} className="include-font-padding-false">🇪🇸</Text>
          </View>
          <Text className="font-display text-carbon text-lg font-bold">
            Hola, Alex! 👋
          </Text>
        </View>

        {/* Right Streak Progress & Notification Badge Controls */}
        <View className="flex-row items-center space-x-4 gap-4">
          <View className="flex-row items-center bg-soft-mist/40 px-3 py-1.5 rounded-full border border-soft-mist">
            <Text className="mr-1 text-base">🔥</Text>
            <Text className="font-display text-carbon font-bold text-sm">12</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} className="w-9 h-9 items-center justify-center relative">
            <Text style={{ fontSize: 22 }}>🔔</Text>
            {/* Active semantic context indicator dot */}
            <View className="absolute top-1 right-1 w-2.5 h-2.5 bg-ember rounded-full border border-paper-white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. SCROLLABLE MAIN BODY VIEW DASHBOARD */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1 px-5 pt-4"
      >
        {/* DAILY PROGRESS GOAL PROGRESS CARD */}
        <View className="w-full bg-soft-mist/30 rounded-2xl p-5 flex-row items-center justify-between border border-soft-mist/80 mb-4">
          <View className="flex-1 mr-4">
            <Text className="text-carbon/50 font-body text-sm mb-2">Daily goal</Text>
            <View className="flex-row items-baseline mb-3">
              <Text className="font-display text-carbon text-2xl font-bold">15</Text>
              <Text className="text-carbon/40 font-body text-base"> / 20 XP</Text>
            </View>
            {/* Segmented Linear Continuous Track Bar Indicator */}
            <View className="w-full h-3 bg-concrete-gray/30 rounded-full overflow-hidden">
              <View style={{ width: '75%' }} className="h-full bg-ember rounded-full" />
            </View>
          </View>
          {/* Milestone Chest Interactive Visual Node */}
          <View className="w-20 h-20 items-center justify-center">
            <Text style={{ fontSize: 52 }}>🧰</Text>
          </View>
        </View>

        {/* CURRENT ACADEMIC COURSE INTERACTIVE HERO CARD PANEL */}
        <View className="w-full bg-voltage-violet rounded-3xl p-6 relative overflow-hidden mb-6 border border-carbon/10">
          {/* Inline Abstract Background Structural Vector Mask Shapes */}
          <View className="absolute right-0 top-0 bottom-0 left-1/3 bg-electric-blue/10 rounded-l-full transform scale-125 translate-x-12" />
          
          <View className="z-10 w-3/5">
            <Text className="text-paper-white/70 font-body text-sm mb-1">Continue learning</Text>
            <Text className="text-paper-white font-display text-2xl font-bold mb-1">Spanish</Text>
            <Text className="text-paper-white/60 font-body text-xs mb-5">A1 • Unit 3</Text>
            
            <TouchableOpacity 
              activeOpacity={0.9}
              className="bg-paper-white rounded-xl py-2.5 px-5 self-start shadow-sm"
            >
              <Text className="text-voltage-violet font-display text-sm font-bold">
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contextual Architecture Illustration Canvas Container Node */}
          <View className="absolute right-4 bottom-0 top-4 justify-end items-center w-2/5">
            <Text style={{ fontSize: 68 }} className="opacity-90">🏰</Text>
          </View>
        </View>

        {/* SECTION BLOCK HEADER TITLES WRAPPER */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-carbon font-display text-lg font-bold">Today's plan</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-voltage-violet font-display text-sm font-semibold">View all</Text>
          </TouchableOpacity>
        </View>

        {/* ITEM TASKS STACK LIST COMPOSITION CONTAINER */}
        <View className="space-y-3 gap-3 mb-6">
          
          {/* TASK ITEM 1: LESSON COMPLETED */}
          <View className="w-full flex-row items-center justify-between p-3 bg-paper-white rounded-2xl border border-soft-mist/60">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-voltage-violet/10 rounded-xl items-center justify-center mr-4">
                <Text style={{ fontSize: 22 }}>📖</Text>
              </View>
              <View>
                <Text className="text-carbon font-display text-base font-semibold mb-0.5">Lesson</Text>
                <Text className="text-carbon/40 font-body text-xs">At the café</Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full bg-voltage-violet items-center justify-center mr-1">
              <Text className="text-paper-white font-display text-xs font-bold">✓</Text>
            </View>
          </View>

          {/* TASK ITEM 2: AI CONVERSATION AVAILABLE */}
          <View className="w-full flex-row items-center justify-between p-3 bg-paper-white rounded-2xl border border-soft-mist/60">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-electric-blue/10 rounded-xl items-center justify-center mr-4">
                <Text style={{ fontSize: 22 }}>🎧</Text>
              </View>
              <View>
                <Text className="text-carbon font-display text-base font-semibold mb-0.5">AI Conversation</Text>
                <Text className="text-carbon/40 font-body text-xs">Talk about your day</Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full border border-concrete-gray mr-1" />
          </View>

          {/* TASK ITEM 3: VOCABULARY CARD STACK */}
          <View className="w-full flex-row items-center justify-between p-3 bg-paper-white rounded-2xl border border-soft-mist/60">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-ember/10 rounded-xl items-center justify-center mr-4">
                <Text style={{ fontSize: 22 }}>🦊</Text>
              </View>
              <View>
                <Text className="text-carbon font-display text-base font-semibold mb-0.5">New words</Text>
                <Text className="text-carbon/40 font-body text-xs">10 words</Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full border border-concrete-gray mr-1" />
          </View>

        </View>

        {/* UPCOMING CONTENT FEATURE PROMPT BANNER CARD */}
        <View className="w-full bg-mint-pop/10 rounded-2xl p-4 flex-row items-center justify-between border border-mint-pop/30">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-14 h-14 rounded-full overflow-hidden bg-concrete-gray mr-4 border border-carbon/10">
              {/* Fallback frame placeholder mimicking target teacher profile source vector object */}
              <Image 
                source={require('./assets/mascot-auth.png')} 
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className="text-mint-pop font-display text-xs font-bold uppercase tracking-wider mb-0.5">Next up</Text>
              <Text className="text-carbon font-display text-base font-bold mb-0.5">AI Video Call</Text>
              <Text className="text-carbon/40 font-body text-xs">Practice speaking</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} className="w-12 h-12 bg-mint-pop rounded-full items-center justify-center">
            <Text style={{ fontSize: 20 }} className="text-paper-white font-bold">📹</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* 3. PERSISTENT LOWER SYSTEM TAB BAR NAVIGATION BLOCK CONTROL */}
      <View style={styles.tabBarContainer} className="absolute bottom-0 left-0 right-0 h-20 bg-paper-white border-t border-soft-mist flex-row items-center justify-around px-2 pb-2">
        
        <TouchableOpacity activeOpacity={0.7} className="items-center justify-center pt-2 flex-1">
          <Text style={{ fontSize: 22 }} className="text-voltage-violet mb-1">🏠</Text>
          <Text className="font-display text-xs font-bold text-voltage-violet">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} className="items-center justify-center pt-2 flex-1">
          <Text style={{ fontSize: 22 }} className="text-carbon/40 mb-1">📖</Text>
          <Text className="font-body text-xs font-medium text-carbon/40">Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} className="items-center justify-center pt-2 flex-1">
          <Text style={{ fontSize: 22 }} className="text-carbon/40 mb-1">🤖</Text>
          <Text className="font-body text-xs font-medium text-carbon/40">AI Teacher</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} className="items-center justify-center pt-2 flex-1">
          <Text style={{ fontSize: 22 }} className="text-carbon/40 mb-1">💬</Text>
          <Text className="font-body text-xs font-medium text-carbon/40">Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} className="items-center justify-center pt-2 flex-1">
          <Text style={{ fontSize: 22 }} className="text-carbon/40 mb-1">👤</Text>
          <Text className="font-body text-xs font-medium text-carbon/40">Profile</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Dynamic bottom layout masking to isolate container overlay depth values properly over scroll surfaces
  tabBarContainer: {
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
});