/* eslint-disable react/jsx-props-no-spreading */
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
import { useCreateAccount } from '../../../hooks/auth';
import { TypeAccount } from '../../../hooks/auth/useAuth/types';
import { Input, InputPassword } from '../../../components';

type FormData = {
 email: string;
 name: string;
 password: number;
 type_account: string;
};

const schema = z.object({
  email: z.string().email('Email invalido').nonempty(),
  name: z.string(),
  password: z.string().min(6).nonempty(),
  type_account: z.string().nonempty(),
});

export default function Signin() {
  const router = useRouter();
  const { createAccountUser, createDocumentForUser } = useCreateAccount();

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

  const { mutate, isLoading } = useMutation(createAccountUser, {
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

  return (
    <div className="flex h-[100vh] justify-center items-center ">
      <form onSubmit={handleSubmit((values: any) => mutate(values))}>
        <div className="flex flex-col gap-8 w-[400px] bg-gray-800 p-7 rounded-lg ">
          <Input
            label="Nome"
            name="name"
            placeholder="Pedro..."
            type="text"
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
          <Input
            label="Email"
            name="email"
            placeholder="teste@gmail.com"
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
          <div>
            <h3 className="mb-4 font-semibold dark:text-white">Tipo da moeda da conta</h3>
            <ul className="items-center w-full text-sm font-medium border rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {['real', 'euro', 'hybrid'].map((currency) => (
                <li className="w-full border-b sm:border-b-0 sm:border-r dark:border-gray-600" key={currency}>
                  <div className="flex items-center pl-3">
                    <input
                      {...register('type_account', { required: true })}
                      id={`horizontal-list-radio-${currency.toLowerCase()}`}
                      type="radio"
                      value={currency}
                      name="type_account"
                      className={`${currency === 'hybrid' ? 'cursor-not-allowed' : 'cursor-pointer'}  w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500`}
                    />
                    <label htmlFor={`horizontal-list-radio-${currency.toLowerCase()}`} className="w-full py-3 ml-2 text-sm font-medium dark:text-gray-300">
                      {currency}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-10 justify-center items-center
      "
          >
            <button
              type="submit"
              className="text-white bg-gray-800 dark:focus:outline-none font-medium rounded-lg text-sm dark:bg-gray-700 p-2 w-[100px]"
            >
              <div className="flex gap-2 justify-center items-center">
                {isLoading ? 'Criando...' : 'Criar'}
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
