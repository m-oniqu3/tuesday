import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function listExists(
  userId: string,
  name: string,
): Promise<boolean> {
  const normalizedName = name.trim().toLowerCase();

  const listsRef = collection(db, "lists");

  const q = query(
    listsRef,
    where("userId", "==", userId),
    where("normalizedName", "==", normalizedName),
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}
