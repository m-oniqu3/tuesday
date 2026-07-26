import { type User, type UserProfile, onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../lib/firebase";
import { getUserProfile } from "../services/get-user-profile";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const profile = await getUserProfile(user.uid);

        setProfile(profile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);
  console.log(user);

  const value = useMemo(() => {
    return { user, loading, profile };
  }, [user, loading, profile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
