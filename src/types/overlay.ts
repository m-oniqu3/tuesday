export type ContextMenuState<T = unknown> = {
  type: string | null;
  data: T | null;
  position: {
    x: number;
    y: number;
  } | null;
};

export type Position = {
  x: number;
  y: number;
};
