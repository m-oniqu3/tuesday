import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
    await setDoc(userRef, {
      username: generateUsername(user),
      email: user.email,
      avatar: user.photoURL,
      createdAt: new Date(),
    });
  }
}

export async function logout() {
  await signOut(auth);
}
