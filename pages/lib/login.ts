import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";

const checkAuthState = async () => {
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

<<<<<<< Updated upstream
export const logout = async () => {
  return signOut(auth);
};

const FixErroBuild = () => {
  return null;
};

export default FixErroBuild;
=======
export default checkAuthState;
>>>>>>> Stashed changes
