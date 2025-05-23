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
  colorScheme?: string
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
  colorScheme,
  ...rest
}: IButtonProps) => {
  // Estilos base para cada variante do botão
  const styles = {
    cancel:
      'bg-gray-800 text-gray-300 border border-gray-500 hover:bg-gray-600 hover:text-white',
    confirm: 'bg-green-600 text-white hover:bg-green-700',
    delete: 'bg-red-600 text-white hover:bg-red-800',
    link: 'text-blue-500 underline hover:text-blue-700',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline:
      'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    ghost:
      'bg-transparent text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    default:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    default700:
      'bg-[#2D3748] text-white border-[#2D3748] w-full hover:bg-[#4A5568]'
  }

  // Mapeamento de colorScheme para classes Tailwind CSS
  const colorSchemeStyles: Record<string, string> = {
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
    purple: 'bg-purple-500 text-white hover:bg-purple-600',
    yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
    teal: 'bg-teal-500 text-white hover:bg-teal-600',
    gray: 'bg-gray-500 text-white hover:bg-gray-600',
    orange: 'bg-orange-500 text-white hover:bg-orange-600',
    pink: 'bg-pink-500 text-white hover:bg-pink-600',
    cyan: 'bg-cyan-500 text-white hover:bg-cyan-600'
  }

  // Mapeamento de colorScheme para variantes específicas
  const variantColorSchemeStyles: Record<string, Record<string, string>> = {
    outline: {
      blue: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      green:
        'bg-transparent border border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
      red: 'bg-transparent border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
      purple:
        'bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20',
      yellow:
        'bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
      teal: 'bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20',
      gray: 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900/20',
      orange:
        'bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20',
      pink: 'bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20',
      cyan: 'bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
    },
    ghost: {
      blue: 'bg-transparent text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      green:
        'bg-transparent text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
      red: 'bg-transparent text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
      purple:
        'bg-transparent text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20',
      yellow:
        'bg-transparent text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
      teal: 'bg-transparent text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20',
      gray: 'bg-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900/20',
      orange:
        'bg-transparent text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20',
      pink: 'bg-transparent text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20',
      cyan: 'bg-transparent text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
    },
    link: {
      blue: 'text-blue-500 underline hover:text-blue-700',
      green: 'text-green-500 underline hover:text-green-700',
      red: 'text-red-500 underline hover:text-red-700',
      purple: 'text-purple-500 underline hover:text-purple-700',
      yellow: 'text-yellow-500 underline hover:text-yellow-700',
      teal: 'text-teal-500 underline hover:text-teal-700',
      gray: 'text-gray-500 underline hover:text-gray-700',
      orange: 'text-orange-500 underline hover:text-orange-700',
      pink: 'text-pink-500 underline hover:text-pink-700',
      cyan: 'text-cyan-500 underline hover:text-cyan-700'
    }
  }

  // Determinar quais classes de estilo usar baseado na variante e colorScheme
  let styleClasses = styles[variant]

  // Se colorScheme for fornecido, substituir o estilo da variante
  if (colorScheme) {
    if (variant === 'outline' || variant === 'ghost' || variant === 'link') {
      styleClasses =
        variantColorSchemeStyles[variant][colorScheme] || styleClasses
    } else {
      styleClasses = colorSchemeStyles[colorScheme] || styleClasses
    }
  }

  const baseClasses =
    'px-4 py-2 rounded-md text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
  const buttonClasses = `${baseClasses} ${styleClasses} ${className}`

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
