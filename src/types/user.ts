import type { Timestamp } from "firebase/firestore";

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  photoURL: string | null;
  createdAt: Timestamp;
};
