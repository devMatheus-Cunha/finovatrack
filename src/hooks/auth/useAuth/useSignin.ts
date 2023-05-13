/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */

import { useMutation } from '@tanstack/react-query';
import { createDocumentForUser, siging } from '@/service/auth/siging';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { TypeAccount } from './types';

const useCreateAccount = () => {
  const router = useRouter();

  const { mutate: createAccountUser, isLoading } = useMutation(siging, {
    onSuccess: async (user) => {
      await createDocumentForUser({
        id: user.uid,
        expirationTimeToken: (await user.getIdTokenResult()).expirationTime,
        token: (await user.getIdTokenResult()).token,
        email: user.email || '',
        name: user.displayName || '',
        typeAccount: user.photoURL as TypeAccount,
      });
      router.push(`/control/${user.uid}`);
    },
    onError: ({ message }: { message: string }) => {
      if (message === 'Firebase: Error (auth/email-already-in-use).') {
        toast.error('Este email já esta em uso', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      toast.error('Erro no Servidor. Tente mais tarde!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });

  return {
    createAccountUser,
    isLoading,
  };
};

export default useCreateAccount;
