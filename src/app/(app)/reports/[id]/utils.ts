/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

export const columsHeadProps = [
  {
    header: 'Descrição',
    field: 'description',
  },
  {
    header: 'Valor Euro',
    field: 'euro_value',
  },
  {
    header: 'Valor Real',
    field: 'real_value',
  },
  {
    header: 'Tipo',
    field: 'type',
  },
  {
    header: 'Moeda',
    field: 'typeMoney',
  },
];
export const columsHeadPropsEuro = [
  {
    header: 'Descrição',
    field: 'description',
  },
  {
    header: 'Valor Euro',
    field: 'euro_value',
  },
  {
    header: 'Tipo',
    field: 'type',
  },
];
export const columsHeadPropsReal = [
  {
    header: 'Descrição',
    field: 'description',
  },
  {
    header: 'Valor Real',
    field: 'real_value',
  },
  {
    header: 'Tipo',
    field: 'type',
  },
];

export const validateColumsHeadProps: any = {
  euro: columsHeadPropsEuro,
  real: columsHeadPropsReal,
  hybrid: columsHeadProps,
};

function FixErroBuild() {
  return null;
}

export default FixErroBuild;
