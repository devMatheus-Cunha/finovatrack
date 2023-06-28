/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */

import Link from 'next/link'
import React, { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cancel' | 'confirm' | 'delete' | 'default' | 'link' | 'default700'
  routeLink?: string
  addStyleInTheCurrent?: string
}

function Button({
  variant = 'default',
  addStyleInTheCurrent = '',
  routeLink = '',
  ...props
}: IButtonProps) {
  const validateStyles: any = {
    cancel: `${addStyleInTheCurrent} border focus:z-10 bg-gray-800 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600`,
    confirm: `${addStyleInTheCurrent} text-white bg-green-600 hover:bg-green-700`,
    delete: `${addStyleInTheCurrent} bg-red-600 hover:bg-red-800`,
    link: `${addStyleInTheCurrent} text-white bg-gray-800 focus:outline-none bg-gray-800 underline`,
    default: `${addStyleInTheCurrent} bg-gray-800 hover:bg-gray-700 border-gray-700`,
    default700: `${addStyleInTheCurrent} w-full bg-gray-700 hover:bg-gray-700 border-gray-700`,
  }

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
      className={
        props.className
          ? props.className
          : `px-5 py-2.5 text-sm font-medium rounded-lg ${validateStyles[variant]}`
      }
    >
      {props.children}
    </button>
  )
}

export default Button
