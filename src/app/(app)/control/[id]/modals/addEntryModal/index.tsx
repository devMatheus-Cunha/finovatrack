/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable indent */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';
import { TypeAccount } from '@/hooks/auth/useAuth/types';
import { InputTypeMoney } from '@/components';
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData';
import { validaTextForTypeAccount } from '../../utils';
import { ITypeModal } from '../../types';

type FormData = {
 value: string;
};

interface IContentModal {
 onSubmit: (value: FormData)=> void
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
 isLoadingAddExpense?: boolean
 typeAccount: TypeAccount
}

const schema = z.object({
  value: z.string().nonempty(),
});

function ContentAddEntryModal({
  onSubmit,
  handleOpenModal,
  isLoadingAddExpense,
  typeAccount,
}: IContentModal) {
  const {
    handleSubmit,
    control,
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

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 z-50 w-1/2">
      <form onSubmit={handleSubmit((values) => onSubmit(values))} className="w-[100%]">
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Adicione uma Entrada
              </h3>
            </div>
            <div className=" gap-6 mb-6  p-4">
              <InputTypeMoney
                control={control}
                name="value"
                label={validaTextForTypeAccount[typeAccount]?.labelValueMoney}
                placeholder={validaTextForTypeAccount[typeAccount]?.placeholderValueAddExpense}
                errors={(
                  <>
                    {errors.value && (
                    <span className="text-red-500 text-sm ">
                      Este campo é obrigatório
                    </span>
                )}
                  </>
      )}
              />
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {!isLoadingAddExpense ? 'Salvar' : 'Salvando...'}
              </button>
              <button
                onClick={() => handleOpenModal()}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContentAddEntryModal;
