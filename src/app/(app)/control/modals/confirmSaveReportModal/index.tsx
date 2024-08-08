'use client'

import { useState } from 'react'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  HStack,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Box
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { FolderPlus } from '@phosphor-icons/react'

interface ConfirmSaveReportModalProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData: ExpenseData[]
}

function ConfirmSaveReportModal({
  onSubmit,
  onCancel,
  initialData
}: ConfirmSaveReportModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(new Date())

  function onChangeDate(date: Date) {
    setSelectedPeriod(date)
  }

  const formattedDate = new Date(selectedPeriod).toLocaleDateString('pt-BR', {
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <>
      <ModalOverlay />
      <ModalContent display="flex" flexDirection="column" gap={6}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <ModalHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Icon as={FolderPlus} boxSize={12} color="gray.300" />
            <Text
              fontSize="lg"
              fontWeight="normal"
              color="gray.400"
              textAlign="center"
            >
              Essa ação irá salvar todos os dados abaixo como fechamento do mês
              atual. Caso já exista um relatório salvo para este mês, ele será
              substituído por este.
            </Text>
          </ModalHeader>

          <ModalBody>
            <FormControl>
              <FormLabel
                htmlFor="selectedPeriod"
                mb="2"
                color="white"
                fontSize="md"
                w="100%"
              >
                Selecione um período para salvar:
              </FormLabel>
              <DatePicker
                id="selectedPeriod"
                selected={selectedPeriod}
                onChange={onChangeDate}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                customInput={
                  <Input
                    variant="filled"
                    _focus={{ boxShadow: 'none' }}
                    w="100%"
                  />
                }
              />
            </FormControl>
          </ModalBody>
        </Box>

        <ModalFooter
          px={4}
          py={6}
          borderTop="1px"
          borderColor="gray.600"
          display="flex"
          alignItems="center"
        >
          <HStack>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button
              colorScheme="green"
              onClick={() =>
                onSubmit({ data: initialData, period: formattedDate })
              }
            >
              Confirmar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ConfirmSaveReportModal
