import React from 'react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { Button } from '@/components'

interface IEntrysModalProps {
  onClose: () => void
  entrys: IEntrysData[]
}

const columsHeadProps = [{ header: 'Entradas', field: 'value' }]

function EntrysModal({ onClose, entrys }: IEntrysModalProps) {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  return (
    <>
      <table className="min-w-full text-left">
        <thead>
          <tr>
            {columsHeadProps.map((item) => (
              <th key={item.field} className="text-gray-400 pb-2 font-medium">
                {item.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {entrys?.map((item, index) => (
            <tr key={index}>
              <td className="text-white py-2">
                {formatCurrencyMoney(
                  item.value,
                  userData.primary_currency,
                  isVisibilityData
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-0 py-6 flex justify-end gap-3">
        <Button variant="cancel" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </>
  )
}

export default EntrysModal
