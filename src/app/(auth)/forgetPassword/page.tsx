/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ZodError, z } from 'zod';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useForgetPassword } from '../../../hooks/auth';
import { Input } from '../../../components';

type FormData = {
  email: string;
};

const schema = z.object({
  email: z.string().email('Formato de'),
});

export default function ForgetPassword() {
  const router = useRouter();
  const { forgetPassword } = useForgetPassword();
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

  const { mutate, isLoading } = useMutation(forgetPassword, {
    onSuccess: async () => {
      toast.success('E-mail de recupeção enviado!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push('/login');
    },
    onError: ({ message }: { message: string }) => {
      if (message === 'Firebase: Error (auth/invalid-value-(email),-starting-an-object-on-a-scalar-field).') {
        toast.error('E-mail inválido. Por favor, insira um endereço de e-mail válido.', {
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
          <div className="flex flex-col gap-3 text-center">
            <p className="text-2xl  font-bold">Esqueceu sua senha?</p>
            <p className="text-slate-300">Não se preocupe! Insira o seu e-mail de cadastro e enviaremos instruções para você.</p>
          </div>
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

          <div className="flex flex-col gap-10 justify-center items-center">
            <button
              type="submit"
              className="text-white bg-gray-800 dark:focus:outline-none font-medium rounded-lg text-sm dark:bg-gray-700 p-2 w-[100px]"
            >
              <div className="flex gap-2 justify-center items-center">
                {isLoading ? 'Enviar...' : 'Enviar'}
              </div>
            </button>
            <Link
              className="text-white bg-gray-800 dark:focus:outline-none font-medium rounded-lg text-sm dark:bg-gray-800 underline"
              href="/login"
            >
              Voltar
            </Link>
          </div>
        </div>
      </form>
    </div>

  );
}
