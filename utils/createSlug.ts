export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function createFilmSlug(title: string, id: string) {
  return `${createSlug(title)}-${id}`;
}
