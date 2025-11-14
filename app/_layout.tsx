import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";
import { SessionProvider } from "@/hooks/ctx";
import Logo from "@/components/Logo";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SessionProvider>
        <Stack
          screenOptions={{
            headerTitle: () => <Logo />,
            headerStyle: { backgroundColor: "#00A877" },
            headerTintColor: "white",
          }}
        >
          {/* auth screens */}
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />

          {/* tabs group (renders the bottom tabs) - hide the stack header so Tabs controls its own header */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider>
      <StatusBar style="light" backgroundColor="#00A877" />
    </SafeAreaView>
  );
}
