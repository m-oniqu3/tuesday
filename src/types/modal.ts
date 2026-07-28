import type { OmdbFilm } from "./film";

export const ModalType = {
  LOGIN: "login",
  CREATE_LIST: "create_list",
  DELETE_LIST: "delete_list",
  SAVE_FILM: "save_film",
} as const;

export type ModalType = "login" | "create_list" | "delete_list" | "save_film";

type ModalPayloads = {
  [ModalType.LOGIN]: undefined;
  [ModalType.CREATE_LIST]: undefined;
  [ModalType.DELETE_LIST]: {
    listId: string;
  };
  [ModalType.SAVE_FILM]: {
    film: OmdbFilm;
  };
};

export type ModalState<T extends ModalType = ModalType> = {
  type: T | null;
  payload: T extends ModalType ? ModalPayloads[T] : undefined;
};
