import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { generateUsername } from "../../utils/generate-username";
import { auth, db } from "../lib/firebase";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  console.log(result.user);

  // create profile if it doesn't exist
  await createUserProfile(user);

  return user;
}

async function createUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      username: generateUsername(user),
      displayName: "",
      bio: "",
      photoURL: user.photoURL ?? null,
      createdAt: serverTimestamp(),
    });
  }
}

export async function logout() {
  await signOut(auth);
}
