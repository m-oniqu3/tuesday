import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { UserProfile } from "../types/user";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  console.log({ data });

  return {
    id: snapshot.id,
    username: data.username,
    displayName: data.displayName,
    photoURL: data.photoURL,
    createdAt: data.createdAt,
  };
}
