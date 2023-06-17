/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';

import { TypeAccount } from '@/hooks/auth/useAuth/types';
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData';
import {
  Button, Input, InputTypeMoney, Select,
} from '@/components';
import { formatCurrencyMoney } from '@/utils/formatNumber';
import { ExpenseFormData, IAddExpenseData } from '@/hooks/expenses/useAddExpense';
import { ITypeModal } from '../../types';
import { validaTextForTypeAccount, validateTextToModal } from '../../utils';

interface IContentModal {
  onSubmit: (data: IAddExpenseData) => Promise<void>
  handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
  isLoadingAddExpense: boolean
  initialData: ExpenseData | undefined
  type: ITypeModal
  typeAccount: TypeAccount
}

function ContentActionsTableModal({
  onSubmit,
  handleOpenModal,
  isLoadingAddExpense,
  initialData,
  type,
  typeAccount,
}: IContentModal) {
  const schema = z.object({
    description: z.string().nonempty(),
    typeMoney: typeAccount === 'hybrid' ? z.string().nonempty() : z.string().optional(),
    value: z.string().nonempty(),
    type: z.string().nonempty(),
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    defaultValues: type !== 'addExpense' ? {
      ...initialData,
      value:
      initialData?.typeMoney === 'Real'
        ? formatCurrencyMoney(initialData?.real_value, typeAccount)
        : formatCurrencyMoney(initialData?.euro_value, typeAccount),
    } : undefined,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-lg shadow">
        <div className="rounded-lg shadow bg-gray-800">
          <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              {validateTextToModal[type || '']?.title}
            </h3>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
            <Input
              label="Descrição"
              name="description"
              placeholder="Ex: Compra carro"
              type="text"
              register={register}
              required
              errors={(
                <>
                  {errors.description && (
                  <span className="text-red-500 text-sm">Este campo é obrigatório</span>
                  )}
                </>
                )}
            />

            <Select
              label="Selecione o tipo"
              name="type"
              options={[
                { label: 'Essencial', value: 'Essencial' },
                { label: 'Não essencial', value: 'Não essencial' },
                { label: 'Gasto Livre', value: 'Gasto Livre' },
              ]}
              register={register}
              errors={(
                <>
                  {errors.type && (
                  <span className="text-red-500 text-sm">
                    Este campo é obrigatório
                  </span>
                  )}
                </>
                )}
            />
            {
                typeAccount === 'hybrid' && (
                  <Select
                    label="Selecione Moeda"
                    name="typeMoney"
                    options={[
                      { label: 'Real', value: 'Real' },
                      { label: 'Euro', value: 'Euro' },
                    ]}
                    register={register}
                    errors={(
                      <>
                        {errors.typeMoney && (
                          <span className="text-red-500 text-sm">
                            Este campo é obrigatório
                          </span>
                        )}
                      </>
                    )}
                  />
                )
              }
            <InputTypeMoney
              control={control}
              name="value"
              label={
                  typeAccount === 'hybrid'
                    ? watch().typeMoney === 'Real'
                      ? 'Valor (R$):'
                      : 'Valor (€):'
                    : validaTextForTypeAccount[typeAccount]?.labelValueMoney
                }
              placeholder={
                  typeAccount === 'hybrid'
                    ? watch().typeMoney === 'Real'
                      ? 'Ex: R$ 10'
                      : 'Ex: € 10'
                    : validaTextForTypeAccount[typeAccount]?.placeholderValueAddExpense
                }
              errors={(
                <>
                  {errors.value && (
                    <span className="text-red-500 text-sm ">
                      Este campo é obrigatório e deve ser um valor numérico válido
                    </span>
                  )}
                </>
                )}
            />

          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b border-gray-600">
            <Button
              variant="confirm"
              type="submit"
            >
              {!isLoadingAddExpense ? 'Salvar' : 'Salvando...'}
            </Button>
            <Button
              onClick={() => handleOpenModal()}
              type="button"
              variant="cancel"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContentActionsTableModal;
