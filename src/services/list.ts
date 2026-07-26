import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { createSlug } from "../../utils/createSlug";
import { db } from "../lib/firebase";
import type { CreateListInput, List } from "../types/list";

// export async function getUserLists(
//   profileId: string,
//   viewerId?: string,
// ): Promise<List[]> {
//   const isOwner = profileId === viewerId;

//   console.log({
//     profileId,
//     viewerId,
//     isOwner,
//   });

//   const listsRef = collection(db, "lists");

//   const constraints = [where("userId", "==", profileId)];

//   if (!isOwner) {
//     constraints.push(where("private", "==", false));
//   }

//   const q = query(listsRef, where("userId", "==", profileId));
//   const snapshot = await getDocs(q);

//   console.log("query size:", snapshot.size);

//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as List[];
// }

export async function getUserLists(
  profileId: string,
  viewerId?: string,
): Promise<List[]> {
  const listsRef = collection(db, "lists");

  const isOwner = profileId === viewerId;

  const constraints = [where("userId", "==", profileId)];

  if (!isOwner) {
    constraints.push(where("private", "==", false));
  }

  const q = query(listsRef, ...constraints, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as List[];
}

export async function createList(userId: string, input: CreateListInput) {
  const lists = await getUserLists(userId, userId);

  const nextOrder = lists.length;

  const listsRef = collection(db, "lists");

  const slug = createSlug(input.name);

  console.log({
    auth: userId,
    input,
  });

  const docRef = await addDoc(listsRef, {
    name: input.name,
    slug,
    description: input.description ?? "",
    private: input.isPrivate ?? false,
    order: nextOrder,
    userId,
    filmsCount: 0,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getListBySlug(
  userId: string,
  slug: string,
  viewerId?: string,
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

  const isOwner = userId === viewerId;

  if (data.private && !isOwner) {
    return null;
  }

  return {
    id: listDoc.id,
    ...data,
  } as List;
}
