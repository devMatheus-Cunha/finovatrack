import React, { ButtonHTMLAttributes } from 'react'
import NextLink from 'next/link'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'cancel'
    | 'confirm'
    | 'delete'
    | 'default'
    | 'link'
    | 'default700'
    | 'primary'
    | 'outline'
    | 'ghost'
  routeLink?: string
  isLoading?: boolean
  loadingText?: string
  isDisabled?: boolean
  leftIcon?: React.ReactElement | React.ReactNode
  rightIcon?: React.ReactElement | React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children?: React.ReactNode
}

const baseClasses =
  'px-2 py-2 w-full text-md font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'

const styles = {
  cancel:
    'bg-gray-800 text-gray-300 border border-gray-500 hover:bg-gray-600 hover:text-white',
  confirm: 'bg-green-600 text-white hover:bg-green-700',
  delete: 'bg-red-600 text-white hover:bg-red-800',
  link: 'text-blue-500 underline hover:text-blue-700',
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  outline:
    'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-700',
  ghost: 'bg-transparent text-blue-500 hover:bg-blue-700',
  default: 'bg-gray-700 text-gray-200 hover:bg-gray-600'
}

function getButtonClasses(variant: string, className: string) {
  const styleClasses = styles[variant as keyof typeof styles]
  return `${baseClasses} ${styleClasses} ${className}`
}

const Button = ({
  variant = 'default',
  routeLink = '',
  isLoading = false,
  loadingText = 'Loading...',
  isDisabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  children,
  ...rest
}: IButtonProps) => {
  const buttonClasses = getButtonClasses(variant, className)

  if (variant === 'link' && routeLink) {
    return (
      <NextLink href={routeLink} className={buttonClasses}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </NextLink>
    )
  }

  return (
    <button
      type={type}
      disabled={isLoading || isDisabled}
      className={buttonClasses}
      onClick={onClick}
      {...rest}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {isLoading ? loadingText : children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  )
}

export default Button
