type InfoCard = {
  titleEntrys: string;
  titleExpenses: string;
  totalFree: string;
  labelValueAddExpense: string;
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
    labelValueAddExpense: "",
     placeholderValueAddExpense: ''
     
  },
  real: {
    titleEntrys: "Total Entradas",
    titleExpenses: "Total Gastos",
   totalFree: "Total Livre ",
   labelValueAddExpense: "Valor (R$):",
     placeholderValueAddExpense: 'Ex: R$ 10'
    
  },
  euro: {
     titleEntrys: "Total Entradas",
     titleExpenses: "Total Gastos",
     totalFree: "Total Livre",
    labelValueAddExpense: "Valor (€):",
     placeholderValueAddExpense: "Ex: € 10"
  }, 
}