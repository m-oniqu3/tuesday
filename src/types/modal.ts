export const ModalType = {
  LOGIN: "login",
  CREATE_LIST: "create_list",
  DELETE_LIST: "delete_list",
} as const;

export type ModalType = (typeof ModalType)[keyof typeof ModalType];

export type ModalState = {
  type: ModalType | null;
  payload?: unknown;
};
