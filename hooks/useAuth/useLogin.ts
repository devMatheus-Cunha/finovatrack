import { auth, db } from '@/service/firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';

const useLogin = () => {
  const loginWithEmail = async ({
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
 const upadtedDocumentForUser = async ({id, expirationTimeToken, token}: {id: string , expirationTimeToken: string,token: string }) => {
  const myCollection = doc(db, "users", id);
  await updateDoc(myCollection, {
    token: token,
    expirationTimeToken: expirationTimeToken
  })
}

 return {
   loginWithEmail,
   upadtedDocumentForUser
  };
}

export default useLogin;