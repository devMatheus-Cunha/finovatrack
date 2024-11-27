'use client'

import React, { Fragment } from 'react'
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Heading
} from '@chakra-ui/react'
import { Trash } from '@phosphor-icons/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'

interface IContentModal {
  handleOpenModal: () => void // Alterado para função sem parâmetro
  data: IEntrysData[]
  onDelete: (itemId?: string) => void
  userData: UserData
}

const columsHeadProps = [
  { header: 'Entradas', field: 'value' },
  { header: 'Ação', field: 'actions' }
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
          <Heading as="h3" size="xl" fontWeight="semibold" color="white">
            Veja todas entradas
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                {columsHeadProps.map((item) => (
                  <Th key={item.field}>{item.header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => (
                <Tr key={item.id} bg="gray.700">
                  <Td color="white">
                    {formatCurrencyMoney(
                      item.value,
                      userData.primary_currency,
                      isVisibilityData
                    )}
                  </Td>
                  <Td>
                    <Button
                      leftIcon={<Trash />}
                      colorScheme="red"
                      variant="ghost"
                      p={0}
                      _hover={{
                        background: 'transparent'
                      }}
                      onClick={() => onDelete(item.id)}
                    >
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter
          mt={8}
          px={4}
          py={6}
          borderTop="1px"
          borderColor="gray.600"
        >
          <Button variant="outline" onClick={handleOpenModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ContentTotalEntrys
