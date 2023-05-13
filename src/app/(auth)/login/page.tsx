/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ZodError, z } from 'zod';
import { toast } from 'react-toastify';
import { Input, InputPassword } from '@/components';
import { useLogin } from '@/hooks/auth';
import Link from 'next/link';

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
  const { loginWithEmail, upadtedDocumentForUser } = useLogin();
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
    onSuccess: async (user) => {
      upadtedDocumentForUser({
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
  });

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <form onSubmit={handleSubmit((values: any) => mutate(values))}>
        <div className="flex flex-col gap-8 w-[400px] bg-gray-800 p-7 rounded-lg ">
          <Input
            label="Email"
            name="email"
            placeholder="exemplo@gmail.com"
            type="email"
            register={register}
            rules={{ required: true }}
            errors={(
              <>
                {errors.email && (
                <span className="text-red-500 text-sm ">
                  Este campo é obrigatório
                </span>
                )}
              </>
              )}
          />
          <div className="flex justify-center items-center flex-col gap-3">
            <InputPassword
              label="Password"
              name="password"
              placeholder="**********"
              register={register}
              rules={{ required: true }}
              errors={(
                <>
                  {errors.password && (
                  <span className="text-red-500 text-sm ">
                    Este campo é obrigatório
                  </span>
                  )}
                </>
              )}
            />
            <button
              type="button"
              className="text-white bg-gray-800 dark:focus:outline-none font-medium rounded-lg text-sm dark:bg-gray-800 underline self-end"
              onClick={() => router.push('/forgetPassword')}
            >
              <div className="flex gap-2 justify-center items-center">
                Esqueceu a senha?
              </div>
            </button>
          </div>

          <div className="flex flex-col gap-10 justify-center items-center">
            <button
              type="submit"
              className="text-white bg-gray-800 dark:focus:outline-none font-medium rounded-lg text-sm dark:bg-gray-700 p-2 w-[100px]"
            >
              <div className="flex gap-2 justify-center items-center">
                {isLoading ? 'Login...' : 'Login'}
              </div>
            </button>
            <Link
              className="text-white bg-gray-800 dark:focus:outline-none font-medium rounded-lg text-sm dark:bg-gray-800 underline"
              href="/signin"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </form>
    </div>

  );
}