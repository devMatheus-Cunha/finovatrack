import { Button } from '@/components'
import React from 'react'

interface IInfoCardContentProps {
  handleInfoAction: any
}

const InfoCardContent = ({ handleInfoAction }: IInfoCardContentProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow">
      <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
        <h3 className="text-xl font-semibold text-white">
          Saiba como calculamos o valor total de gastos!
        </h3>
      </div>
      <div className="flex flex-col gap-2 px-3 py-4">
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

      <div className="flex justify-center px-4 py-6 gap-3 border-t rounded-b border-gray-600">
        <Button onClick={handleInfoAction} type="button" variant="cancel">
          Fechar
        </Button>
        <Button
          onClick={() => {
            const linkWise = 'https://wise.com/invite/dic/matheusc1004'
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
