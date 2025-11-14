import Logo from "@/components/Logo";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/hooks/ctx";
import { useRouter } from "expo-router";
import baseUrl from "@/utils/baseUrl";

const SignIn = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { signIn, session, isLoading } = useSession();
  const router = useRouter();

  // Redirect off sign-in if already authenticated
  React.useEffect(() => {
    if (!isLoading && session) {
      // replace to home
      router.replace({ pathname: "/" });
    }
  }, [isLoading, session]);

  const login = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.toLocaleLowerCase().trim(),
          password: password.toLocaleLowerCase().trim(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Backend returns token in response JSON (and also sets cookie). Save token.
        const token = data?.token ?? null;
        if (token) {
          signIn(token);
        }
        setLoading(false);
        // Navigate to home
        router.replace({ pathname: "/(tabs)" });
      } else {
        setLoading(false);
        alert(data?.error || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again.");
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: "whitesmoke",
      }}
    >
      <Logo />
      <Text
        style={{
          color: "black",
          fontSize: 20,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        Sign In
      </Text>

      <Text
        style={{
          width: "94%",
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 30,
          marginBottom: 3,
        }}
      >
        Username
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          width: "94%",
          paddingHorizontal: 15,
          paddingVertical: 15,
          borderRadius: 7,
          borderColor: "lightgray",
          backgroundColor: "white",
        }}
      />

      <Text
        style={{
          width: "94%",
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 10,
          marginBottom: 3,
        }}
      >
        Password
      </Text>

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          width: "94%",
          paddingHorizontal: 15,
          paddingVertical: 15,
          borderRadius: 7,
          borderColor: "lightgray",
          backgroundColor: "white",
        }}
      />

      <Text
        style={{
          color: "dodgerblue",
          fontWeight: "bold",
          padding: 5,
          width: "94%",
          textAlign: "right",
        }}
      >
        Forgot Password
      </Text>

      <TouchableOpacity
        onPress={() => login()}
        style={{
          backgroundColor: "#00A877",
          width: "94%",
          paddingVertical: 15,
          borderRadius: 7,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace({ pathname: "/sign-up" })}
        style={{
          backgroundColor: "white",
          width: "94%",
          paddingVertical: 15,
          borderRadius: 7,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#00A877", fontWeight: "bold", fontSize: 15 }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
