import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { UserProfile } from "../types/user";

export async function getUserByUsername(
  username: string,
): Promise<UserProfile | null> {
  const usersRef = collection(db, "users");

  const q = query(usersRef, where("username", "==", username));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  return {
    id: doc.id,
    username: data.username,
    displayName: data.displayName,
    bio: data.bio,
    photoURL: data.photoURL,
    createdAt: data.createdAt,
  };
}
