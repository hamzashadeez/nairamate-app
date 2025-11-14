import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/hooks/ctx";
import { useRouter } from "expo-router";

export default function Insights() {
  const { user, session, isLoading } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !session) {
      router.replace({ pathname: "/sign-in" });
    }
  }, [isLoading, session]);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Insights</Text>
      <Text style={{ color: "#666" }}>Summary and charts will go here.</Text>
      <View style={{ marginTop: 18 }}>
        <Text>Logged in as: {user?.username ?? "—"}</Text>
      </View>
    </SafeAreaView>
  );
}
