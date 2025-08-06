import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import {
  Eye,
  MoneyWavy,
  ArrowCircleDown,
  Bank,
  ArrowCircleUp
} from '@phosphor-icons/react'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'

export interface CardDataProps {
  totalEntrys: number
  totalFree: number
  totalExpenses: number
  investments?: { totalInvestments: number }
  entrysData?: IEntrysData[]
  userData: UserData
  isVisibilityData: boolean
  onOpenTotalEntrys?: () => void
  infoAction?: () => void
}

export const generateCardsData = ({
  totalEntrys,
  totalExpenses,
  investments,
  entrysData,
  userData,
  isVisibilityData,
  onOpenTotalEntrys,
  totalFree
}: CardDataProps) => {
  if (!entrysData) return
  return [
    {
      infoData: totalEntrys,
      title: 'Entradas',
      currency: userData.primary_currency,
      isVisibilityData,
      icon: ArrowCircleUp,
      iconColor: 'green',
      centerPadding: '0px',
      actionCard: onOpenTotalEntrys,
      contentAction:
        entrysData?.length > 0 ? (
          <Eye
            size={20}
            className="text-blue-400 cursor-pointer ml-1"
            onClick={onOpenTotalEntrys}
          />
        ) : null
    },
    {
      infoData: totalExpenses,
      title: 'Gastos',
      icon: ArrowCircleDown,
      iconColor: 'red',
      isVisibilityData,
      currency: userData.primary_currency
    },
    {
      infoData: totalFree,
      currency: userData.primary_currency,
      icon: MoneyWavy,
      iconColor: 'blue',
      title: 'Livre',
      isVisibilityData
    },
    {
      infoData: investments?.totalInvestments,
      currency: userData.primary_currency,
      icon: Bank,
      iconColor: 'blue',
      title: 'Investimentos',
      isVisibilityData
    }
  ]
}
export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  arrows: false,
  arrowsPadding: 0,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 700,
      settings: {
        arrows: true,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
}
