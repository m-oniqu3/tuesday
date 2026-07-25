import { type User } from "firebase/auth";

export function generateUsername(user: User) {
  return (
    user.displayName?.toLowerCase().replace(/\s+/g, "") ??
    `user${user.uid.slice(0, 6)}`
  );
}
