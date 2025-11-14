import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSession } from "@/hooks/ctx";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, signOut, session, isLoading } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !session) {
      router.replace({ pathname: "/sign-in" });
    }
  }, [isLoading, session]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Profile</Text>
      <Text style={{ color: "#666", marginBottom: 8 }}>Username: {user?.username ?? "—"}</Text>
      <Text style={{ color: "#666", marginBottom: 18 }}>Email: {user?.email ?? "—"}</Text>

      <TouchableOpacity
        onPress={() => {
          signOut();
          router.replace({ pathname: "/sign-in" });
        }}
        style={{ padding: 12, backgroundColor: "#00A877", borderRadius: 8, alignItems: "center" }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
