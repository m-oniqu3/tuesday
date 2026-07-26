import type { Timestamp } from "firebase/firestore";

export type List = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string;
  private: boolean;
  order: number;
  createdAt: Timestamp;
};

export type CreateListInput = {
  name: string;
  description?: string;
  isPrivate?: boolean;
};
