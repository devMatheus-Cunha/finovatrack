/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import { Input } from '@/components';
import { TypeAccount } from '@/hooks/auth/useAuth/types';
import { useUserData } from '@/hooks/globalStates';
import useUpdatedUser from '@/hooks/myProfile/useUpdatedUser';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';

type FormValues = {
  email?: string;
  name?: string;
  typeAccount?: TypeAccount;
};

const schemaName = z.object({
  name: z.string().optional(),
});

const schemaEmail = z.object({
  email: z.string().email('Email inválido'),
  typeAccount: z.string().optional(),
});

function MyProfile() {
  const { userData } = useUserData();
  const { updatedUserData, isLoading } = useUpdatedUser();

  const [inputsEnabled, setInputsEnabled] = useState<{ [key: string]: boolean }>({
    emailDisabled: false,
    nameDisabled: false,
  });

  const {
    register: registerName,
    handleSubmit: onSubmitName,
    reset: resetName,
    formState: { errors: errorsName },
  } = useForm({
    defaultValues: { name: userData.name },
    resolver: async (data) => {
      try {
        schemaName.parse(data);
        return { values: data, errors: {} };
      } catch (error: any) {
        if (error instanceof ZodError) {
          return { values: {}, errors: error.formErrors.fieldErrors };
        }
        return { values: {}, errors: { [error.path[0]]: error.message } };
      }
    },
  });
  const {
    register: registerEmail,
    handleSubmit: onSubmitEmail,
    reset: resetEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    defaultValues: { email: userData.email, typeAccount: userData.typeAccount },
    resolver: async (data) => {
      try {
        schemaEmail.parse(data);
        return { values: data, errors: {} };
      } catch (error: any) {
        if (error instanceof ZodError) {
          return { values: {}, errors: error.formErrors.fieldErrors };
        }
        return { values: {}, errors: { [error.path[0]]: error.message } };
      }
    },
  });

  const toggleInputEnabled = (type: 'email' | 'name') => {
    setInputsEnabled((prevState: Record<string, boolean>) => ({
      ...prevState,
      [`${type}Disabled`]: !prevState[`${type}Disabled`],
    }));
  };

  const handleCancel = (type: 'email' | 'name') => {
    if (type === 'email') {
      resetEmail();
      toggleInputEnabled(type);
      return;
    }
    resetName();
    toggleInputEnabled(type);
  };

  const handleSubmit = (fieldName: 'email' | 'name', values: FormValues) => {
    if (values[fieldName] === userData[fieldName]) {
      toggleInputEnabled(fieldName);
      return;
    }
    updatedUserData(values);
    toggleInputEnabled(fieldName);
  };

  return (
    <main className="flex flex-col w-[100%] p-6 justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-6 w-[550px] p-6 dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            Olá
            {' '}
            {userData.name}
          </h1>
          <p className="dark:text-gray-300">
            Aqui você pode visualizar e alterar as informações do seu perfil de forma simples e fácil.
          </p>
        </div>
        <form>
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              <Input
                label="Nome"
                name="name"
                placeholder="Pedro..."
                type="text"
                disabled={!inputsEnabled.nameDisabled}
                register={registerName}
                rules={{ required: true }}
                errors={(
                  <>

                    {errorsName.name && (
                      <span className="text-red-500 text-sm">
                        Este campo é obrigatório
                      </span>
                    )}
                  </>
                )}
              />
              <div className="flex gap-2 self-end">
                {inputsEnabled.nameDisabled && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCancel('name')}
                      className="border text-sm rounded-lg block p-2.5 w-[100px] dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  self-end dark:hover:opacity-75"
                    >
                      Cancelar
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={
                    !inputsEnabled.nameDisabled
                      ? () => toggleInputEnabled('name')
                      : onSubmitName((value) => handleSubmit('name', value))
}
                  className="border text-sm rounded-lg block p-2.5 w-[110px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:hover:opacity-75"
                >
                  {isLoading ? 'Salvando...' : (!inputsEnabled.nameDisabled ? 'Alterar' : 'Salvar')}

                </button>
              </div>
            </div>
          </div>
        </form>

        <form>
          <div className="flex gap-2">
            <Input
              label="Email"
              name="email"
              placeholder="teste@gmail.com"
              type="email"
              disabled={!inputsEnabled.emailDisabled}
              register={registerEmail}
              rules={{ required: true }}
              errors={(
                <>
                  {errorsEmail.email && (
                    <span className="text-red-500 text-sm">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              )}
            />
            <div className="flex gap-2 self-end">
              {inputsEnabled.emailDisabled && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCancel('email')}
                    className="border text-sm rounded-lg block p-2.5 w-[100px] dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  self-end dark:hover:opacity-75"
                  >
                    Cancelar
                  </button>
                </>
              )}
              <button
                 type="button"
                onClick={
                  !inputsEnabled.emailDisabled
                    ? () => toggleInputEnabled('email')
                    : onSubmitEmail((value) => handleSubmit('email', value))
}
                className="border text-sm rounded-lg block p-2.5 w-[110px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:hover:opacity-75 "
              >
                {isLoading ? 'Salvando...' : (!inputsEnabled.emailDisabled ? 'Alterar' : 'Salvar')}

              </button>
            </div>
          </div>
        </form>

        <div>
          <h3 className="mb-4 font-semibold dark:text-white">
            Tipo da moeda da conta
          </h3>
          <ul className="items-center w-full text-sm font-medium border rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {['real', 'euro', 'hybrid'].map((currency) => (
              <li
                className="w-full border-b sm:border-b-0 sm:border-r dark:border-gray-600 dark:opacity-75"
                key={currency}
              >
                <div className="flex items-center pl-3">
                  <input
                    id={`horizontal-list-radio-${currency.toLowerCase()}`}
                      type="radio"
                    value={currency}
                    disabled
                      className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-not-allowed dark:opacity-75"
                      {...registerEmail('typeAccount')}
                  />
                  <label
                    htmlFor={`horizontal-list-radio-${currency.toLowerCase()}`}
                    className="w-full py-3 ml-2 text-sm font-medium dark:text-gray-300"
                  >
                    {currency}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}

export default MyProfile;
