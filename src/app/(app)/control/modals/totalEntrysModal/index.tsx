'use client'

import React, { Fragment } from 'react'
import { Button, ButtonGroup } from '@/components'
import { Trash } from '@phosphor-icons/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { UserData } from '@/hooks/auth/useAuth/types'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

interface IContentModal {
  handleOpenModal: any
  data: IEntrysData[]
  onDelete: (itemId?: string) => void
  userData: UserData
}

export const columsHeadProps = [
  {
    header: 'Entradas',
    field: 'value'
  },
  {
    header: 'Ação',
    field: 'actions'
  }
]

function ContentTotalEntrys({
  handleOpenModal,
  data,
  onDelete,
  userData
}: IContentModal) {
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h3 className="text-xl font-semibold text-white">
            Veja todas entradas
          </h3>
        </ModalHeader>

        <ModalBody>
          <table className="w-full text-sm text-left">
            <thead className="text-md uppercase border-b border-gray-600 text-gray-300">
              <tr>
                {columsHeadProps?.map((item: any) => (
                  <th scope="col" className="px-6 py-3" key={item.field}>
                    {item.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <Fragment key={index}>
                  <tr className="border-b bg-gray-800 border-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {formatCurrencyMoney(
                        item.value,
                        userData.primary_currency,
                        isVisibilityData
                      )}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      <ButtonGroup
                        buttonOptions={[
                          {
                            onClick: () => {
                              onDelete(item?.id)
                            },
                            content: <Trash color="#eee2e2" />
                          }
                        ]}
                      />
                    </th>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleOpenModal} type="button" variant="cancel">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ContentTotalEntrys
