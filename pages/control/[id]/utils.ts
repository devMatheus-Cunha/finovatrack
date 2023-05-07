import { useMemo } from "react";
import { ExpenseData } from "./hooks/useFetchExpensesData";

type InfoCard = {
  titleEntrys: string;
  titleExpenses: string;
  totalFree: string;
  labelValueMoney: string;
  placeholderValueAddExpense: string;
}

enum TypeAccount {
  hybrid = 'hybrid',
  real = 'real',
  euro = 'euro',
}

type AuthData = {
  typeAccount?: TypeAccount | "";
}

type ValidTextForTypeAccount = {
  [key in TypeAccount]: InfoCard;
}

export const authData: AuthData = {
  typeAccount: TypeAccount.hybrid,
}

export const validaTextForTypeAccount: ValidTextForTypeAccount = {
  hybrid: {
    titleEntrys: "Total Entradas",
    titleExpenses: "Total Gastos",
    totalFree: "Total Investimento",
    labelValueMoney: "Valor (R$):",
    placeholderValueAddExpense: 'Ex: R$ 10'

  },
  real: {
    titleEntrys: "Total Entradas",
    titleExpenses: "Total Gastos",
    totalFree: "Total Livre ",
    labelValueMoney: "Valor (R$):",
    placeholderValueAddExpense: 'Ex: R$ 10'

  },
  euro: {
    titleEntrys: "Total Entradas",
    titleExpenses: "Total Gastos",
    totalFree: "Total Livre",
    labelValueMoney: "Valor (€):",
    placeholderValueAddExpense: "Ex: € 10"
  },
}


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

export const initialDataSelectedData: ExpenseData = {
  id: "",
  type: "",
  description: "",
  value: "",
  euro_value: 0,
  real_value: 0,
  typeMoney: ""
};

export const useCalculationSumValues = (expensesData: ExpenseData[]) => {
  const calculationSumValues = useMemo(() => {
    if (expensesData.length <= 0) return []

    const objetoResultado = expensesData.reduce(
      (acumulador, objetoAtual) => {
        acumulador.real_value += objetoAtual.real_value;
        acumulador.euro_value += objetoAtual.euro_value;
        return acumulador;
      },
      {
        id: "",
        type: "",
        description: "Totais",
        value: "",
        euro_value: 0,
        real_value: 0,
        typeMoney: ""
      }
    );
    return [...expensesData, objetoResultado];
  }, [expensesData]);

  return {
    calculationSumValues,
  };
};

export const useGetTotalsFree = (calculationSumValues: ExpenseData[]) => {
  const getTotals: ExpenseData = useMemo(() => {
    const result = calculationSumValues.find((item) => {
      return item.description === "Totais";
    });

    if (result) return result

    return initialDataSelectedData
  }, [calculationSumValues]);

  return {
    getTotals,
  };
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
