import { z } from 'zod';

/* eslint-disable import/prefer-default-export */
export const optionsCurrency = [
  {
    label: 'Escolher Moeda', value: '', disabled: true, selected: true,
  },
  { label: 'Hibrida', value: 'hybrid' },
  { label: 'Dólar dos Estados Unidos', value: 'USD' },
  { label: 'Dólar canadense', value: 'CAD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'Franco suíço', value: 'CHF' },
  { label: 'Libra esterlina', value: 'GBP' },
  { label: 'Real', value: 'BRL' },
];

export const optionsCurrencyHybrid = [
  {
    label: 'Escolher Moeda', value: '', disabled: true, selected: true,
  },
  { label: 'Dólar dos Estados Unidos', value: 'USD' },
  { label: 'Dólar canadense', value: 'CAD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'Franco suíço', value: 'CHF' },
  { label: 'Libra esterlina', value: 'GBP' },
  { label: 'Real', value: 'BRL' },
];

export const schema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('Email inválido'),
  name: z.string().nonempty('Campo obrigatório'),
  password: z.string().nonempty('Campo obrigatório').min(8, 'Deve conter no mínimo 8 caracteres'),
  confirmPassword: z.string().nonempty('Campo obrigatório').min(8, 'Deve conter no mínimo 8 caracteres'),
  typeAccount: z.string().nonempty('Campo obrigatório'),
  primary_currency: z.string().optional(),
  secondary_currency: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem',
  path: ['confirmPassword'],
}).refine((data) => {
  if (data.typeAccount === 'hybrid') {
    return data.primary_currency !== data.secondary_currency;
  }
  return true;
}, {
  message: 'A moeda primária e a secundária não podem ter a mesma seleção',
  path: ['secondary_currency'],
}).refine((data) => {
  if (data.typeAccount === 'hybrid') {
    return data.primary_currency !== '';
  }
  return true;
}, {
  message: 'Campo obrigatório',
  path: ['primary_currency'],
})
  .refine((data) => {
    if (data.typeAccount === 'hybrid') {
      return data.secondary_currency !== '';
    }
    return true;
  }, {
    message: 'Campo obrigatório',
    path: ['secondary_currency'],
  });
