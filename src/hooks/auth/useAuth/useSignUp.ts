/* eslint-disable no-useless-catch */
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SigingProps, siging } from '@/service/auth/siging';
import { toast } from 'react-toastify';

const useSignUp = () => {
  const router = useRouter();

  const { mutate: createAccountUser, isLoading } = useMutation({
    mutationFn: async (values: SigingProps) => siging(values),
    onSuccess: (id: string) => {
      router.push(`/control/${id}`);
    },
    onError: ({ message }: {message: string}) => {
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
