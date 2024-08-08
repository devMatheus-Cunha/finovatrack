import { Button as ButtonChakra, ButtonProps, Link } from '@chakra-ui/react'

export interface IButtonProps extends ButtonProps {
  variant?:
    | 'cancel'
    | 'confirm'
    | 'delete'
    | 'default'
    | 'link'
    | 'default700'
    | 'primary'
    | 'outline'
    | 'ghost' // Added more variants
  routeLink?: string
  isLoading?: boolean // Added isLoading prop
  loadingText?: string
  spinnerPlacement?: 'start' | 'end'
  isDisabled?: boolean // Added isDisabled prop
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

const Button = ({
  variant = 'default',
  routeLink = '',
  isLoading = false,
  loadingText = 'Loading...',
  spinnerPlacement = 'start',
  isDisabled = false,
  leftIcon,
  rightIcon,
  ...props
}: IButtonProps) => {
  const styles = {
    cancel: {
      bg: 'gray.800',
      color: 'gray.300',
      borderColor: 'gray.500',
      _hover: { bg: 'gray.600', color: 'white' }
    },
    confirm: { bg: 'green.600', color: 'white', _hover: { bg: 'green.700' } },
    delete: { bg: 'red.600', _hover: { bg: 'red.800' } },
    link: {
      color: 'blue.500',
      textDecoration: 'underline',
      _hover: { color: 'blue.700' }
    },
    primary: { bg: 'blue.500', color: 'white', _hover: { bg: 'blue.600' } },
    outline: {
      borderColor: 'blue.500',
      color: 'blue.500',
      _hover: { bg: 'blue.50' }
    },
    ghost: { color: 'blue.500', _hover: { bg: 'blue.50' } },
    default: { bg: 'gray.200', color: 'gray.800', _hover: { bg: 'gray.300' } },
    default700: {
      bg: 'gray.700',
      borderColor: 'gray.700',
      width: 'full',
      _hover: { bg: 'gray.600' }
    }
  }

  const buttonProps: ButtonProps = {
    ...props,
    ...styles[variant],
    size: 'md',
    fontSize: 'md',
    fontWeight: 'medium',
    isLoading,
    loadingText,
    spinnerPlacement,
    isDisabled,
    leftIcon,
    rightIcon,
    className: 'rounded-md'
  }

  return variant === 'link' ? (
    <Link as={Link} href={routeLink}>
      {props.children}
    </Link>
  ) : (
    <ButtonChakra {...buttonProps}>{props.children}</ButtonChakra>
  )
}

export default Button
