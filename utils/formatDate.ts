export function formatDate(date: unknown) {
  if (!date) return "";

  if (date instanceof Date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (
    typeof date === "object" &&
    "toDate" in date &&
    typeof date.toDate === "function"
  ) {
    return date.toDate().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return "";
}
