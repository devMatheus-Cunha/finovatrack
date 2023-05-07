import { TypeAccount, UserData } from "@/hooks/useAuth/types";

export const formatCurrencyMoney = (value = 0, typeAccount: TypeAccount) => {
  const currency = typeAccount !== "euro" ? "BRL" : "EUR";
  const locale = typeAccount !== "euro" ? "pt-BR" : "pt-BR";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(value));
};
