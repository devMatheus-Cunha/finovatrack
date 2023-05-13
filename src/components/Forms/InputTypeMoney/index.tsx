/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

'use client';

import React, { ReactNode } from 'react';
import {
  Controller, Control, FieldValues, Path,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

type InputTypeMoneyProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
 label: string;
  errors?: ReactNode;
};

function InputTypeMoney<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  errors,
}: InputTypeMoneyProps<T>) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {`${label} *`}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <NumericFormat
            placeholder={placeholder}
            allowLeadingZeros
            displayType="input"
            type="text"
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            decimalSeparator=","
            thousandSeparator="."
            allowNegative={false}
            decimalScale={2}
            {...field}
          />
        )}
      />
       {
        errors && (
          <>
            {errors}
          </>
        )
      }
    </div>
  );
}

export default InputTypeMoney;
