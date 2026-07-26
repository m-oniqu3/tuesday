import type { Timestamp } from "firebase/firestore";

export type List = {
  id: string;
  name: string;
  slug: string;
  description: string;
  private: boolean;
  userId: string;
  order: number;
  filmsCount: number;
  createdAt: Timestamp | null;
};

export type CreateListInput = {
  name: string;
  description?: string;
  isPrivate?: boolean;
};
