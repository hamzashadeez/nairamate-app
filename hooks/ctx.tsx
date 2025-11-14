import { useContext, createContext, type PropsWithChildren, useEffect, useState } from "react";
import { authJson } from "@/utils/api";
import { useStorageState } from "./useStorage";
import baseUrl from "@/utils/baseUrl";

type AuthContextType = {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  payload?: Record<string, any> | null;
  user?: Record<string, any> | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // state shape: [isLoading, sessionValue]
  const [[isLoading, session], setSession] = useStorageState("session");
  const [payload, setPayload] = useState<Record<string, any> | null>(null);
  const [user, setUser] = useState<Record<string, any> | null>(null);

  // Parse JWT payload when session changes
  useEffect(() => {
    if (!session) {
      setPayload(null);
      return;
    }

    try {
      const parts = session.split(".");
      if (parts.length < 2) {
        setPayload(null);
        return;
      }
      const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const decoded = decodeURIComponent(
        atob(payloadBase64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const obj = JSON.parse(decoded);
      setPayload(obj as Record<string, any>);
    } catch (err) {
      // fallback: no payload
      setPayload(null);
    }
  }, [session]);

  // Fetch user data from backend when session (token) exists
  useEffect(() => {
    let mounted = true;
    if (!session) {
      setUser(null);
      return;
    }

    (async () => {
      try {
        const { res, data } = await authJson(`${baseUrl}/users/me`, {
          method: "GET",
        });
        if (!mounted) return;
        if (res.ok) {
          setUser(data?.user ?? null);
        } else {
          // on auth error clear session
          setUser(null);
        }
      } catch (err) {
        if (!mounted) return;
        setUser(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => {
          // Save the token to secure storage via the hook
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        payload,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
