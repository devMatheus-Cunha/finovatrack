import { ArrowsCounterClockwise, CircleNotch } from '@phosphor-icons/react'
import React from 'react'

interface CardProps {
  title?: string | React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  className?: string
  isLoading?: boolean
  hasData?: boolean
  isLoadingIcon?: boolean // Prop que será validada
  skeleton?: React.ReactNode
  empty?: React.ReactNode
  action?: () => void
  actionIcon?: React.ReactNode
  actionTooltip?: string
}

const defaultEmpty = (
  <div className="flex flex-1 flex-col items-center justify-center p-4 min-h-[120px] w-full h-full">
    <span className="font-bold text-lg lg:text-2xl text-white text-center">
      Nenhum dado encontrado
      <br />
    </span>
    <span className="mt-2 text-sm lg:text-md text-gray-300 text-center">
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
  isLoadingIcon = false, // Valor padrão definido como false
  hasData = true,
  skeleton,
  empty,
  action,
  actionIcon,
  actionTooltip
}) => {
  if (isLoading && skeleton) {
    return <>{skeleton}</>
  }

  function renderContent() {
    if (isLoading) {
      return null
    }
    if (!hasData) {
      return (
        <div className="flex flex-1 items-center justify-center min-h-[120px] w-full h-full">
          {empty || defaultEmpty}
        </div>
      )
    }
    return children
  }

  function renderTitle() {
    if (isLoading) return null
    if (typeof title === 'string') {
      return <h1 className="text-lg font-semibold text-white">{title}</h1>
    }
    return title
  }

  return (
    <div
      className={`bg-gray-700 rounded-md shadow-sm w-full border border-gray-600/50 p-2.5${
        isLoading ? ' animate-pulse' : ''
      } ${className}`}
    >
      <div className="flex flex-col ">
        <div className="flex items-center justify-between">
          {renderTitle()}

          {/* --- LÓGICA VALIDADA AQUI --- */}
          {/* Só mostra algo no canto se não estiver no loading principal */}
          {!isLoading && (
            <div>
              {isLoadingIcon ? (
                // Se isLoadingIcon for true, mostra o ícone de carregamento girando
                <CircleNotch size={20} color="#fff" className="animate-spin" />
              ) : (
                // Caso contrário, se a ação existir, mostra o botão
                action && (
                  <button
                    type="button"
                    onClick={action}
                    className="hover:text-gray-400 transition-colors"
                    title={actionTooltip || 'Ação'}
                  >
                    {actionIcon || (
                      <ArrowsCounterClockwise
                        size={20}
                        color="#fff"
                        className="hover:opacity-75 p-0 m-0"
                      />
                    )}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {subtitle && !isLoading && (
          <span className="text-gray-400 text-sm">{subtitle}</span>
        )}
      </div>
      {renderContent()}
    </div>
  )
}

export default Card
