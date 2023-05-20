/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';
import { SigingProps } from '@/service/auth/siging';
import Link from 'next/link';
import { useSignUp } from '../../../hooks/auth';
import { Button, Input, InputPassword } from '../../../components';

const schema = z.object({
  email: z.string().email('Email invalido').nonempty(),
  name: z.string(),
  password: z.string().min(6).nonempty(),
  typeAccount: z.string().nonempty(),
});

export default function Signup() {
  const { isLoading, createAccountUser } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigingProps>({
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

  return (
    <form onSubmit={handleSubmit((values: SigingProps) => createAccountUser(values))}>
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
          <h3 className="mb-4 font-semibold text-white">Tipo da moeda da conta</h3>
          <ul className="items-center w-full text-sm font-medium border rounded-lg sm:flex bg-gray-800 border-gray-600 text-white">
            {['real', 'euro', 'hybrid'].map((currency) => (
              <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-600" key={currency}>
                <div className="flex items-center pl-3">
                  <input
                    {...register('typeAccount', { required: true })}
                    id={`horizontal-list-radio-${currency.toLowerCase()}`}
                    type="radio"
                    value={currency}
                    disabled={currency === 'hybrid'}
                    name="typeAccount"
                    className={`${currency === 'hybrid' ? 'cursor-not-allowed' : 'cursor-pointer'}  w-4 h-4 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500`}
                  />
                  <label htmlFor={`horizontal-list-radio-${currency.toLowerCase()}`} className="w-full py-3 ml-2 text-sm font-medium text-gray-300">
                    {currency}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-10 justify-center items-center">
          <Button
            type="submit"
            variant="default700"
          >
            <div className="flex gap-2 justify-center items-center">
              {isLoading ? 'Criando...' : 'Criar'}
            </div>
          </Button>
          <div className="flex gap-7">
            <Link
              href="/"
              className="text-white bg-gray-800 focus:outline-none font-medium rounded-lg text-sm bg-gray-800 underline"
            >
              Home
            </Link>
            <Button
              variant="link"
              routeLink="/login"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
