import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/hooks/ctx";

export default function IndexRedirect() {
  const router = useRouter();
  const { session, isLoading } = useSession();

  React.useEffect(() => {
    if (isLoading) return;
    if (session) {
      router.replace({ pathname: "/(tabs)" });
    } else {
      router.replace({ pathname: "/sign-in" });
    }
  }, [session, isLoading]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
