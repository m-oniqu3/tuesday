import type { Timestamp } from "firebase/firestore";

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  photoURL: string;
  createdAt: Timestamp;
};
