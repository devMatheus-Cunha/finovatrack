/* eslint-disable no-useless-catch */

import { useMutation } from '@tanstack/react-query';
import { SigingProps, createDocumentForUser, siging } from '@/service/auth/siging';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { User } from '@firebase/auth';

const useSignUp = () => {
  const router = useRouter();

  const { mutate: createAccountUser, isLoading } = useMutation({
    onMutate: async (values: SigingProps) => {
      try {
        if (!values.email || !values.password || !values.confirmPassword || !values.name) {
          throw new Error('Todos os campos são obrigatórios.');
        }

        if (values.password !== values.confirmPassword) {
          throw new Error('As senhas não correspondem.');
        }

        const formattedValues = {
          ...values,
          primary_currency: values.typeAccount === 'hybrid' ? values.primary_currency : values.typeAccount,
          secondary_currency: values.typeAccount === 'hybrid' ? values.secondary_currency : '',
          typeAccount: values.typeAccount !== 'hybrid' ? 'oneCurrency' : values.typeAccount,
        };

        const res = await siging(formattedValues);

        if (res?.uid) {
          await createDocumentForUser({ id: res.uid, ...formattedValues });
          return true;
        }
        return false;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async (user: User) => {
      console.log({ user });
      router.push(`/control/${user.uid}`);
    },
    onError: ({ message }: { message: string }) => {
      console.log({ message });
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });

  return {
    createAccountUser,
    isLoading,
  };
};

export default useSignUp;
