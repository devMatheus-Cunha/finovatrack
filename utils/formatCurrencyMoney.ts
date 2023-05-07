/* eslint-disable default-param-last */
import { TypeAccount } from '@/hooks/useAuth/types';

export default function formatCurrencyMoney(value = 0, typeAccount: TypeAccount) {
  const currency = typeAccount !== 'euro' ? 'BRL' : 'EUR';
  const locale = typeAccount !== 'euro' ? 'pt-BR' : 'pt-BR';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(Number(value));
}
