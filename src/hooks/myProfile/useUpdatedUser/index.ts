/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */

import { useUserData } from '@/hooks/globalStates';
import { updatedDocumentForUser } from '@/service/auth/login';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

interface IUpadtedUserProps {
 name?: string
 email?: string
}

const useUpdatedUser = () => {
  const router = useParams();
  const { refetchUserData } = useUserData();

  const { mutate: updatedUserData, isLoading } = useMutation(
    async (values: IUpadtedUserProps) => {
      await updatedDocumentForUser({
        id: router.id,
        ...values,
      });
    },
    {
      onSuccess: async () => {
        await refetchUserData();
        toast.success('Usuario atualizado com sucesso!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      onError: () => {
        toast.error('Erro ao atualizar usuario.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    },
  );

  return {
    updatedUserData,
    isLoading,
  };
};

export default useUpdatedUser;
