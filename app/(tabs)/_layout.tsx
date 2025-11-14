import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, View } from "react-native";
import Logo from "@/components/Logo";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabsLayout() {
  const tabBarHeight = 64 + (Platform.OS === "ios" ? 12 : 8);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00A877",
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          paddingBottom: Platform.OS === "ios" ? 12 : 8,
          height: tabBarHeight,
        },
        tabBarItemStyle: { flex: 1, paddingTop: 6 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house.fill" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="paperplane.fill" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="chevron.right" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
