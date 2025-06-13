import React, { ReactNode } from 'react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Button } from '@/components'

interface InfoCardProps {
  infoData: any
  infoAction?: () => void
  actionCard?: () => void
  title: string
  contentAction?: ReactNode
  currency: any
  icon: React.ElementType // Aceita apenas componente, não elemento pronto
  iconColor: string
  isVisibilityData: boolean
  showEyeIcon?: boolean // novo: controla se mostra o olhinho (default true)
  percentageInfo?: ReactNode // novo: info extra ao lado do valor
  valorGuardadoMes?: any // novo: info extra ao lado do valor
}

const InfoOutlineSvg = ({
  className = '',
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-4 h-4 ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

function InfoCardMoney({
  infoData,
  title,
  contentAction,
  infoAction,
  isVisibilityData,
  currency,
  icon: IconComponent,
  iconColor,
  actionCard,
  showEyeIcon = true,
  percentageInfo,
  valorGuardadoMes
}: InfoCardProps) {
  return (
    <>
      {infoData ? (
        <div
          className="bg-gray-700 rounded-xl shadow-sm p-4 w-full min-w-[220px] max-w-[340px] flex flex-row items-center justify-between mx-auto border border-gray-600/50  hover:shadow-md transition-shadow duration-200"
          onClick={actionCard}
          style={{ cursor: contentAction ? 'pointer' : 'default' }}
        >
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="flex items-center text-gray-400 font-medium mb-1 text-xs gap-1">
              <span className="truncate">{title}</span>
              {contentAction && (
                <span className="ml-1 text-xs">{contentAction}</span>
              )}
              {infoAction && showEyeIcon && (
                <Button
                  variant="ghost"
                  className="text-blue-500 hover:text-blue-600 p-0 ml-1"
                  onClick={(
                    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e?.stopPropagation()
                    infoAction()
                  }}
                  aria-label="Informações"
                >
                  <InfoOutlineSvg />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-1">
              <div className="flex flex-col ">
                <div className="flex gap-1 items-center">
                  <span className="text-lg md:text-xl font-semibold text-white leading-tight truncate">
                    {formatCurrencyMoney(infoData, currency, isVisibilityData)}
                  </span>
                  {percentageInfo && (
                    <span className="flex items-center text-green-400 text-xs font-semibold ml-1">
                      {percentageInfo}
                    </span>
                  )}
                </div>
                {valorGuardadoMes && (
                  <span className="mt-1 text-xs flex items-center gap-1">
                    <span className="text-gray-300"> Media Mensal: </span>
                    {formatCurrencyMoney(
                      valorGuardadoMes,
                      currency,
                      isVisibilityData
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center ml-3">
            {IconComponent && typeof IconComponent === 'function' ? (
              <IconComponent
                className="w-6 h-6 md:w-7 md:h-7"
                style={{ color: iconColor }}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl bg-gray-700 animate-pulse shadow-sm border border-gray-600/50  h-[86px]" />
      )}
    </>
  )
}

export default InfoCardMoney
