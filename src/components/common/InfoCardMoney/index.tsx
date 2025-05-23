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
}

// SVG do ícone de informação (substitui InfoOutlineIcon do Chakra)
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
  actionCard
}: InfoCardProps) {
  return (
    <>
      {infoData ? (
        <div
          className={`flex w-full items-center bg-gray-700 rounded-md py-5 px-2 lg:px-4`}
          onClick={actionCard}
          style={{ cursor: contentAction ? 'pointer' : 'default' }}
        >
          <div className="flex-1">
            <div className="flex items-center text-xs text-gray-500 font-medium mb-1">
              <span>{title}</span>
              {contentAction && <span className="ml-1">{contentAction}</span>}
              {infoAction && (
                <Button
                  variant="ghost"
                  className="ml-1 text-cyan-500 hover:text-cyan-600 p-0"
                  onClick={(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e?.stopPropagation()
                    infoAction()
                  }}
                  aria-label="Informações"
                >
                  <InfoOutlineSvg />
                </Button>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-lg lg:text-[23px] font-bold mr-1">
                {formatCurrencyMoney(infoData, currency, isVisibilityData)}
              </span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center">
            {IconComponent && typeof IconComponent === 'function' ? (
              <IconComponent
                className="w-7 md:w-8 lg:w-10 h-7 md:h-8 lg:h-10"
                style={{ color: iconColor }}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div
          className="w-full rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"
          style={{ height: '92.5px', minHeight: '85px' }}
        />
      )}
    </>
  )
}

export default InfoCardMoney
