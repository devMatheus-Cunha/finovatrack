'use client'

import { InputHTMLAttributes, ReactNode, useState } from 'react'
import { EyeSlash, Eye } from '@phosphor-icons/react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface PasswordInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  errors?: ReactNode
}

export default function InputPassword<T extends FieldValues>({
  label,
  name,
  register,
  required,
  errors,
  ...rest
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(() => !showPassword)
  }

  return (
    <div className="w-[100%]">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-white"
      >
        {required ? `${label} *` : label}
      </label>
      <div className="relative">
        <input
          id={name as string}
          type={showPassword ? 'text' : 'password'}
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          {...register(name)}
          {...rest}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
          onClick={() => togglePasswordVisibility()}
        >
          {showPassword ? (
            <EyeSlash size={20} color="#eee2e2" />
          ) : (
            <Eye size={20} color="#eee2e2" />
          )}
        </button>
      </div>
      {errors && <>{errors}</>}
    </div>
  )
}
