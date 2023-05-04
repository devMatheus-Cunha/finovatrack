import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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
    console.log(user)
    return user;
  } catch (error) {
    throw error;
  }
};
export const createAccountUser = async ({
  email,
  password,
  name,
  type_account
}: {
  email: string;
  password: any;
  name: string
  type_account: string
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    if (user) {
       await updateProfile(user, {
         displayName: name || "",
         photoURL: type_account
    })
    }
    return user;
  } catch (error) {
    throw error;
  }
};

 export const checkAuthState = (): Promise<{
  id: string,
  expirationTimeToken: string,
  token: string,
  email: string,
   name: string
  typeAccount: string
} | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (user) {
        const idTokenResult = await user.getIdTokenResult(true);
        resolve({
          id: user.uid,
          expirationTimeToken: idTokenResult.expirationTime,
          token: idTokenResult.token,
          email: user.email ?? "",
          name: user.displayName ?? "",
          typeAccount: user.photoURL ?? "",
        });
      } else {
        resolve(null);
      }
    }, reject);
  });
};


export const logout = async () => {
  return signOut(auth);
};

const FixErroBuild = () => {
  return null;
};

export default FixErroBuild;
