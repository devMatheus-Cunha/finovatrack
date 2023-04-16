import { useMemo } from "react";
import { IData } from "./hooks/useFetchExpensesData";

export const validateTextToModal: any = {
  addExpense: {
    title: "Add Expense",
    description: "Add a new Expense",
  },
  edit: {
    title: "edit data",
    description: "edit data",
  },
  delete: {
    title: "delete data",
    description: "delete data",
  },
};

export const columsHeadProps = [
  {
    header: "Descrição",
    field: "description",
  },
  {
    header: "Valor Euro",
    field: "euro_value",
  },
  {
    header: "Valor Real",
    field: "real_value",
  },
  {
    header: "Tipo",
    field: "type",
  },
  {
    header: "Moeda",
    field: "typeMoney",
  },
  {
    header: "Ação",
    field: "actions",
  },
];

export const initialDataSelectedData = {
  description: "",
  real_value: 0,
  euro_value: 0,
  type: "",
  typeMoney: "",
  id: "",
};

export const useCalculationSumValues = (expensesData: IData[]) => {
  const calculationSumValues = useMemo(() => {
    if (expensesData.length > 0) {
      const objetoResultado = expensesData.reduce(
        (acumulador, objetoAtual) => {
          acumulador.real_value += objetoAtual.real_value;
          acumulador.euro_value += objetoAtual.euro_value;
          return acumulador;
        },
        {
          description: "Totais",
          real_value: 0,
          euro_value: 0,
          type: "",
          typeMoney: "",
        }
      );

      return [...expensesData, objetoResultado];
    }
    return [];
  }, [expensesData]);

  return {
    calculationSumValues,
  };
};

export const useGetTotalsFree = (calculationSumValues: IData[]) => {
  const getTotalsFree = useMemo(() => {
    return calculationSumValues.find((item) => {
      return item.description === "Totais";
    });
  }, [calculationSumValues]);

  return {
    getTotalsFree,
  };
};

export const formatCurrency = (value: number, currencyCode: string) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
  return formattedValue;
};

export const optionsFilter = [
  { label: "Limpar", value: "" },
  { label: "Essencial", value: "Essencial" },
  { label: "Não essencial", value: "Não essencial" },
  { label: "Gasto Livre", value: "Gasto Livre" },
];

const FixErroBuild = () => {
  return null;
};

export default FixErroBuild;
const FixErroBuild = () => {
  return null;
};

export default FixErroBuild;
