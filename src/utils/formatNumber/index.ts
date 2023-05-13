/* eslint-disable no-useless-escape */

import { TypeAccount } from '@/hooks/auth/useAuth/types';

export function formatNumberToSubmit(value: string): number {
  const removeCaractheres = value.replace(/^(R\$|\€)\s*/g, '');
  const valueWithoutFormatting = removeCaractheres.replace(/\./g, '').replace(',', '.');
  const number = parseFloat(valueWithoutFormatting);
  return number;
}

export function formatCurrencyMoney(
  value: string | number | undefined,
  typeAccount: TypeAccount,
) {
  const currency = typeAccount !== 'euro' ? 'BRL' : 'EUR';
  const locale = typeAccount !== 'euro' ? 'pt-BR' : 'pt-BR';

  const numberValue = typeof value === 'string' ? parseFloat(value.replace(/\./g, '').replace(',', '.')) : Number(value);

  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);

  return formattedValue;
}
