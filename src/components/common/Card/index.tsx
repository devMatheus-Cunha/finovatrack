import React from 'react'

interface CardProps {
  title?: string
  subtitle?: React.ReactNode
  children?: React.ReactNode
  className?: string
  isLoading?: boolean
  hasData?: boolean
  skeleton?: React.ReactNode
  empty?: React.ReactNode
}

const defaultEmpty = (
  <div className="flex flex-col items-center justify-center p-4">
    <span className="font-bold text-lg lg:text-2xl text-white">
      Nenhum dado encontrado
    </span>
    <span className="mt-2 text-sm lg:text-md text-gray-300">
      Faça uma nova busca.
    </span>
  </div>
)

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  isLoading = false,
  hasData = true,
  skeleton,
  empty
}) => {
  if (isLoading && skeleton) {
    return <>{skeleton}</>
  }

  function renderContent() {
    if (isLoading) {
      return null
    }
    if (!hasData) {
      return empty || defaultEmpty
    }
    return children
  }

  return (
    <div
      className={`bg-gray-700 rounded-md shadow-none w-full p-4${
        isLoading ? ' animate-pulse' : ''
      } ${className}`}
    >
      <div className="flex flex-col ">
        {!isLoading && (
          <h1 className="text-lg font-semibold text-white mb-2">{title}</h1>
        )}
        {subtitle && !isLoading && (
          <span className="text-gray-400 text-sm">{subtitle}</span>
        )}
      </div>
      {renderContent()}
    </div>
  )
}

export default Card
