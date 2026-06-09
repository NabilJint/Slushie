import { useEffect } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "@/constants/theme";

type TabConfig = {
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  Home: { icon: "home-outline", activeIcon: "home" },
  Learn: { icon: "book-outline", activeIcon: "book" },
  "AI Teacher": { icon: "school-outline", activeIcon: "school" },
  Chat: { icon: "chatbubble-outline", activeIcon: "chatbubble" },
  Profile: { icon: "person-outline", activeIcon: "person" },
};

const CIRCLE_SIZE = 56;
const ICON_SIZE = 24;
const INACTIVE_COLOR = colors.concreteGray;
const ACTIVE_COLOR = colors.voltageViolet;

const TIMING_CONFIG = { duration: 250, easing: Easing.out(Easing.cubic) };

function TabItem({
  route,
  index,
  activeIndex,
  scale,
  descriptors,
  navigation,
  label,
  tabConfig,
  iconName,
}: {
  route: any;
  index: number;
  activeIndex: number;
  scale: Animated.SharedValue<number>;
  descriptors: any;
  navigation: any;
  label: string;
  tabConfig: TabConfig | undefined;
  iconName: string;
}) {
  const isFocused = activeIndex === index;

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - scale.value,
    transform: [{ scale: 1 - scale.value * 0.15 }],
  }));

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({ type: "tabLongPress", target: route.key });
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
      testID={label}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
    >
      <View style={styles.iconArea}>
        <Animated.View
          style={[
            styles.activeIconCircle,
            { backgroundColor: ACTIVE_COLOR },
            animatedCircleStyle,
          ]}
        >
          <Ionicons name={iconName} size={ICON_SIZE} color="#ffffff" />
        </Animated.View>

        <Animated.View style={[styles.outlineIcon, animatedIconStyle]}>
          <Ionicons
            name={tabConfig?.icon ?? "ellipse-outline"}
            size={ICON_SIZE - 2}
            color={INACTIVE_COLOR}
          />
        </Animated.View>
      </View>

      <Animated.Text
        style={[styles.tabLabel, { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR }]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const scale0 = useSharedValue(0);
  const scale1 = useSharedValue(0);
  const scale2 = useSharedValue(0);
  const scale3 = useSharedValue(0);
  const scale4 = useSharedValue(0);
  const scales = [scale0, scale1, scale2, scale3, scale4];

  const activeIndex = state.index;

  useEffect(() => {
    scales[activeIndex].value = 1;
  }, []);

  useEffect(() => {
    scales.forEach((s, i) => {
      s.value = withTiming(i === activeIndex ? 1 : 0, TIMING_CONFIG);
    });
  }, [activeIndex]);

  return (
    <View
      style={[
        styles.tabBarContainer,
        { paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 8 },
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = activeIndex === index;
          const tabConfig = TAB_CONFIG[label];
          const iconName = isFocused
            ? (tabConfig?.activeIcon ?? "ellipse")
            : (tabConfig?.icon ?? "ellipse-outline");

          return (
            <TabItem
              key={route.key}
              route={route}
              index={index}
              activeIndex={activeIndex}
              scale={scales[index]}
              descriptors={descriptors}
              navigation={navigation}
              label={label}
              tabConfig={tabConfig}
              iconName={iconName}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.paperWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
    paddingTop: 12,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    minHeight: 64,
  },
  iconArea: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconCircle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    letterSpacing: 0.02,
  },
});
