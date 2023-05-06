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
    labelValueMoney: 'Ex: R$ 10',
    placeholderValueAddExpense: ''

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