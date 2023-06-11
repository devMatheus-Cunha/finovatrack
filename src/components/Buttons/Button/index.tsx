/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */

import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cancel' | 'confirm' | 'delete' | 'default' | 'link' | 'default700'
  routeLink?: string
}

function Button({ variant = 'default', routeLink = '', ...props }: IButtonProps) {
  const validateStyles: any = {
    cancel: 'px-5 py-2.5 rounded-lg border text-sm font-medium focus:z-10 bg-gray-800 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600',
    confirm: 'px-5 py-2.5 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm inline-flex items-center ',
    delete: 'bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center',
    link: 'text-white bg-gray-800 focus:outline-none font-medium rounded-lg text-sm bg-gray-800 underline',
    default: 'font-medium px-5 py-2.5  rounded-lg text-sm bg-gray-800 hover:bg-gray-700 border-gray-700',
    default700: 'w-full px-5 py-2.5 font-medium rounded-lg text-sm bg-gray-700 hover:bg-gray-700 border-gray-700',
  };

  return variant === 'link' ? (
    <Link
      className="text-white bg-gray-800 focus:outline-none font-medium rounded-lg text-sm bg-gray-800 underline"
      href={routeLink}
    >
      {props.children}
    </Link>
  ) : (
    <button
      {...props}
      className={props.className ? props.className : validateStyles[variant]}
    >
      {props.children}
    </button>
  );
}

export default Button;