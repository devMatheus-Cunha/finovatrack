import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "./firebase";

export const createUserWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: any;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const checkAuthState = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(resolve).catch(reject);
      } else {
        resolve(null);
      }
    });
  });
};

export const logout = async () => {
  return signOut(auth);
};

const FixErroBuild = () => {
  return null;
};

export default FixErroBuild;
