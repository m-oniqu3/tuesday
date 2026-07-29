import {
  addDoc,
  collection,
  type DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  type QueryDocumentSnapshot,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";
import { AppError } from "../../utils/AppError";
import { createSlug } from "../../utils/createSlug";
import { ERROR_CODES } from "../constants/errorCodes";
import { db } from "../lib/firebase";
import type { CreateListInput, List } from "../types/list";
import { listExists } from "./list-exists";

export async function getLists(profileId: string): Promise<List[]> {
  const listsRef = collection(db, "lists");

  const q = query(listsRef, where("userId", "==", profileId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as List[];
}

export async function getUserLists(
  profileId: string,
  viewerId?: string,
  cursor?: QueryDocumentSnapshot<DocumentData>,
): Promise<{
  lists: List[];
  nextCursor: QueryDocumentSnapshot | null;
}> {
  const listsRef = collection(db, "lists");

  const isOwner = profileId === viewerId;

  const constraints: QueryConstraint[] = [where("userId", "==", profileId)];

  if (!isOwner) {
    constraints.push(where("private", "==", false));
  }

  constraints.push(orderBy("createdAt", "desc"));

  if (cursor) {
    constraints.push(startAfter(cursor));
  }

  constraints.push(limit(10));

  const q = query(listsRef, ...constraints);
  const snapshot = await getDocs(q);

  return {
    lists: snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as List[],

    nextCursor: snapshot.docs[snapshot.docs.length - 1] ?? null,
  };
}

export async function createList(userId: string, input: CreateListInput) {
  const exists = await listExists(userId, input.name);

  if (exists) {
    throw new AppError(
      "You already have a list with this name",
      ERROR_CODES.DUPLICATE_LIST,
    );
  }

  const listsRef = collection(db, "lists");

  const normalizedName = input.name.trim().toLowerCase();

  const docRef = await addDoc(listsRef, {
    name: input.name.trim(),
    normalizedName,
    slug: createSlug(input.name),
    description: input.description?.trim() ?? "",
    private: input.isPrivate ?? false,
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
