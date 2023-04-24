import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ZodError, z } from 'zod';
import { Input } from '@/components/Forms';
import { loginWithEmail, checkAuthState } from './lib/login';
import { SignIn } from '@phosphor-icons/react';

type FormData = {
  email: string;
  password: number;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: async (data) => {
      try {
        schema.parse(data);
        return { values: data, errors: {} };
      } catch (error: any) {
        if (error instanceof ZodError) {
          return { values: {}, errors: error.formErrors.fieldErrors };
        }
        return { values: {}, errors: { [error.path[0]]: error.message } };
      }
    },
  });

  const { mutate, isLoading } = useMutation(loginWithEmail, {
    onSuccess: async () => {
      router.push('/control');
    },
  });

  const { data: token } = useQuery(["auth_state"], checkAuthState, {
    onSuccess: (res) => {
      if (res) router.push('/control');
    }
  });

  return (
    <>
      <div className='flex h-[100vh] justify-center items-center '>
        <form onSubmit={handleSubmit((values) => mutate(values))}>
          <div className='flex flex-col gap-8 w-[400px] bg-gray-800 p-7 rounded-lg '>
            <Input
              label="Email"
              name="email"
              placeholder='teste@gmail.com'
              type="email"
              register={register}
              rules={{ required: true }}
              errors={
                <>
                  {errors.email && (
                    <span className="text-red-500 text-sm ">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              }
            />
            <Input
              label="Password"
              name="password"
              placeholder='**********'
              type="password"
              register={register}
              rules={{ required: true }}
              errors={
                <>
                  {errors.password && (
                    <span className="text-red-500 text-sm ">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              }
            />
            <button
              type="submit"
              className="text-white bg-gray-800 dark:focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 "
            >
              <div className='flex gap-2 justify-center items-center'>
                <SignIn size={24} color="#eee2e2" />
                {isLoading || token ? "Entrando..." : "Entrar"}
              </div>

            </button>
          </div>
        </form>
      </div>
    </>

  );
}