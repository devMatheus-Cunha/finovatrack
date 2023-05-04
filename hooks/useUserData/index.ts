import { checkAuthState } from '@/pages/lib/login';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import router from 'next/router';

const useUser = () => {
 const queryClient = useQueryClient()
 return useQuery(["auth_state"], checkAuthState, {
   initialData: queryClient.getQueryData(["auth_state"]),
  });
};

export { useUser };
