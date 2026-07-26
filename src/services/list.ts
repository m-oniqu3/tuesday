import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { createSlug } from "../../utils/createSlug";
import { db } from "../lib/firebase";
import type { CreateListInput, List } from "../types/list";

export async function getUserLists(userId: string): Promise<List[]> {
  const listsRef = collection(db, "lists");

  const q = query(listsRef, where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as List[];
}

export async function createList(userId: string, input: CreateListInput) {
  const lists = await getUserLists(userId);

  const nextOrder = lists.length;

  const listsRef = collection(db, "lists");

  const slug = createSlug(input.name);

  const docRef = await addDoc(listsRef, {
    name: input.name,
    slug,
    description: input.description ?? "",
    private: input.isPrivate ?? false,
    order: nextOrder,
    userId,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getListBySlug(
  userId: string,
  slug: string,
): Promise<List | null> {
  const listsRef = collection(db, "lists");

  const q = query(
    listsRef,
    where("userId", "==", userId),
    where("slug", "==", slug),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const listDoc = snapshot.docs[0];
  const data = listDoc.data();

  return {
    id: listDoc.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    private: data.private,
    userId: data.userId,
    order: data.order,
    createdAt: data.createdAt,
  };
}
