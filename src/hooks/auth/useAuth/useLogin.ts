/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */

import { LoginProps, login, updatedDocumentForUser } from '@/service/auth/login';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useLogin = () => {
  const router = useRouter();

  const { mutate: loginWithEmail, isLoading } = useMutation(
    (values: LoginProps) => login(values),
    {
      onSuccess: async (user) => {
        updatedDocumentForUser({
          id: user.uid,
          expirationTimeToken: (await user.getIdTokenResult()).expirationTime,
          token: (await user.getIdTokenResult()).token,
        });
        router.push(`/control/${user.uid}`);
      },
      onError: ({ message }: { message: string }) => {
        if (message === 'Firebase: Error (auth/user-not-found).') {
          toast.error('Conta não encontrada.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (message === 'Firebase: Error (auth/wrong-password).') {
          toast.error('Senha incorreta', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Erro no Servidor. Tente mais tarde!', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      },
    },
  );

  return {
    loginWithEmail,
    isLoading,
  };
};

export default useLogin;
