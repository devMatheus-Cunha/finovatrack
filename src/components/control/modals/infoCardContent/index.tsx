import React from 'react'
import { Button } from '@/components'

interface IInfoCardContentProps {
  handleInfoAction: any
}

const InfoCardContent = ({ handleInfoAction }: IInfoCardContentProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2 py-4">
        <p className="text-gray-300">
          Utilizamos a cotação atual da moeda secundária da conta, combinada com
          a taxa aproximada da plataforma Wise. Com a Wise, você terá cálculos
          precisos e próximos à realidade, além de contar com as menores taxas
          do mercado para suas conversões em multi-moedas.
        </p>
        <p className="text-gray-300">
          Descubra a Wise agora mesmo e aproveite uma vantagem exclusiva!
          Através da nossa plataforma, sua primeira transferência terá taxa 0.
        </p>
      </div>
      <div className="flex justify-center py-6 gap-3">
        <Button onClick={handleInfoAction} type="button" variant="cancel">
          Fechar
        </Button>
        <Button
          onClick={() => {
            const linkWise = 'https://millenium.com/invite/dic/matheusc1004'
            window.open(linkWise, '_blank')
          }}
          type="button"
          variant="confirm"
        >
          Conhecer a Wise
        </Button>
      </div>
    </div>
  )
}

export default InfoCardContent
