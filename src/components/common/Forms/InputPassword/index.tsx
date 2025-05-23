'use client'

import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { useState } from 'react'

// Import eye icons from a compatible library or use SVG directly
const ViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
)

const ViewOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
)

interface PasswordInputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  errors?: string
  placeholder?: string
  disabled?: boolean
  labelHint?: string
  className?: string
  [key: string]: any
}

export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  required,
  errors,
  placeholder,
  disabled,
  labelHint,
  className,
  ...rest
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false)
  const { ref, ...field } = register(name)

  const handleToggleVisibility = () => setShowPassword(!showPassword)

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2 text-sm font-medium text-white block flex gap-1 items-center"
      >
        {required ? `${label} *` : label}
        {labelHint && (
          <span className="text-orange-400 cursor-pointer" title={labelHint}>
            {/* Info icon SVG inline */}
            <svg
              className="w-4 h-4 inline"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>
        )}
      </label>
      <div className="relative">
        <input
          id={name}
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          disabled={disabled}
          className={`w-full px-3 py-2 pr-10 bg-transparent border rounded-md border-[#4A5568] text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors duration-150 appearance-none ${
            disabled
              ? 'bg-gray-700 border-gray-600 text-gray-300 cursor-not-allowed'
              : 'hover:border-blue-500'
          } ${className || ''}`}
          placeholder={disabled ? 'Disabled' : placeholder}
          {...field}
          {...rest}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-white hover:text-gray-300"
          onClick={handleToggleVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          disabled={disabled}
        >
          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
        </button>
      </div>
      {errors && <div className="mt-1 text-sm text-red-500">{errors}</div>}
    </div>
  )
}
