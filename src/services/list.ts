import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../lib/firebase";

type CreateListInput = {
  name: string;
  description?: string;
  isPrivate?: boolean;
};

export async function createList(userId: string, data: CreateListInput) {
  return await addDoc(collection(db, "lists"), {
    userId,
    name: data.name,
    description: data.description ?? "",
    isPrivate: data.isPrivate ?? false,
    filmsCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
