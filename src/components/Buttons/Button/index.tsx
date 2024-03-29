import Link from 'next/link'
import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'cancel'
    | 'confirm'
    | 'delete'
    | 'default'
    | 'link'
    | 'default700'
    | 'primary'
  routeLink?: string
}

function Button({
  variant = 'default',
  routeLink = '',
  ...props
}: IButtonProps) {
  const validateStyles: any = {
    cancel: `border focus:z-10 bg-gray-800 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600`,
    confirm: `text-white bg-green-600 hover:bg-green-700`,
    delete: `bg-red-600 hover:bg-red-800`,
    link: `text-white bg-gray-800 focus:outline-none underline`,
    primary: `text-white bg-cyan-600 hover:bg-cyan-700`,
    default: `bg-gray-800 hover:bg-gray-700 border-gray-700`,
    default700: `w-full bg-gray-700 hover:bg-gray-700 border-gray-700`
  }

  return variant === 'link' ? (
    <Link
      className="text-white focus:outline-none font-medium rounded-lg text-sm bg-gray-800 underline"
      href={routeLink}
    >
      {props.children}
    </Link>
  ) : (
    <button
      {...props}
      className={twMerge(
        `px-5 py-2.5 text-sm font-medium rounded-lg ${validateStyles[variant]} `,
        props.className
      )}
    >
      {props.children}
    </button>
  )
}

export default Button
