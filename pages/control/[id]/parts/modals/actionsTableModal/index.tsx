import React from 'react';
import { useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';
import { Input, Select } from '@/components/Forms';
import { validateTextToModal } from '../../utils';

import { UserData } from '@/hooks/useAuth/types';
import { Item, ITypeModal } from '../../../types';
import { validaTextForTypeAccount } from '../../../utils';
import { ExpenseData } from '../../hooks/useFetchExpensesData';

type FormData = {
  description: string;
  value: number;
  type?: string;
  typeMoney: string;
};

interface IContentModal {
  onSubmit: any
  handleOpenModal: any
  isLoadingAddExpense: boolean
  initialData: ExpenseData | undefined
  type: ITypeModal
  id?: string
  userData?: UserData
}

const ContentActionsTableModal = ({
  onSubmit,
  handleOpenModal,
  isLoadingAddExpense,
  initialData,
  type,
  userData,
}: IContentModal) => {
  const schema = z.object({
    description: z.string().nonempty(),
    typeMoney: z.string().nonempty(),
    value: z.string().regex(/^\d+(\.\d{1,2})?$/),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: type !== 'addExpense' ? {
      ...initialData,
      value:
        initialData?.typeMoney === "Real"
          ? initialData.real_value : initialData?.euro_value
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 z-50 w-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {validateTextToModal[type || ""]?.title}
              </h3>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
              <Input
                label="Descrição"
                name="description"
                placeholder='Ex: Compra carro'
                type="text"
                register={register}
                rules={{ required: true }}
                errors={
                  <>
                    {errors.description && (
                      <span className="text-red-500 text-sm">Este campo é obrigatório</span>
                    )}
                  </>
                }
              />

              <Select
                label="Selecione o tipo"
                rules={{ required: true }}
                name="type"
                options={[
                  { label: 'Essencial', value: 'Essencial' },
                  { label: 'Não essencial', value: 'Não essencial' },
                  { label: 'Gasto Livre', value: 'Gasto Livre' },
                ]}
                register={register}
                errors={
                  <>
                    {errors.type && (
                      <span className="text-red-500 text-sm">
                        Este campo é obrigatório
                      </span>
                    )}
                  </>
                }
              />
              {
                userData?.typeAccount === "hybrid" && (
                  <Select
                    label="Selecione Moeda"
                    name="typeMoney"
                    options={[
                      { label: 'Real', value: 'Real' },
                      { label: 'Euro', value: 'Euro' },
                    ]}
                    register={register}
                    rules={{ required: true }}
                    errors={
                      <>
                        {errors.typeMoney && (
                          <span className="text-red-500 text-sm">
                            Este campo é obrigatório
                          </span>
                        )}
                      </>
                    }
                  />
                )
              }
              <Input
                label={
                  userData?.typeAccount === "hybrid"
                    ? watch().typeMoney === "Real"
                      ? "Valor (R$):"
                      : "Valor (€):"
                    : validaTextForTypeAccount[userData?.typeAccount || "real"]?.labelValueAddExpense
                }
                name="value"
                placeholder={
                  userData?.typeAccount === "hybrid"
                    ? watch().typeMoney === "Real"
                      ? "Ex: R$ 10"
                      : "Ex: € 10"
                    : validaTextForTypeAccount[userData?.typeAccount || "real"]?.placeholderValueAddExpense
                }
                type="number"
                register={register}
                rules={{ required: true }}
                errors={
                  <>
                    {errors.value && (
                      <span className="text-red-500 text-sm ">
                        Este campo é obrigatório e deve ser um valor numérico válido
                      </span>
                    )}
                  </>
                }
              />

            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {!isLoadingAddExpense ? "Salvar" : "Salvando..."}
              </button>
              <button
                onClick={handleOpenModal}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div >
  );
}

export default ContentActionsTableModal;