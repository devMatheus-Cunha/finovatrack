import React from 'react'
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
  Heading,
  Text
} from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'

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
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h3" size="xl" fontWeight="semibold" color="white">
            Detalhes das Entradas
          </Heading>
        </ModalHeader>
        <ModalBody pb={6}>
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                {columsHeadProps.map((item) => (
                  <Th key={item.field}>{item.header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {entrys?.map((item, index) => (
                <Tr key={index} bg="gray.700">
                  <Td color="white">
                    <Text>
                      {formatCurrencyMoney(
                        item.value,
                        userData.primary_currency,
                        isVisibilityData
                      )}
                    </Text>
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
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default EntrysModal
