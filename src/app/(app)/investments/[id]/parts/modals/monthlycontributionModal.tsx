import { InputTypeMoney } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

const MonthlyContributionModal = ({
  userData,
  setOpenModal,
  openModal,
  monthlycontributionData,
  handleSubmitContribution,
  controlContribution,
  errorsContribution,
  addMonthlyContribution,
}: any) => {
  return (
    <Modal
      isOpen={openModal.monthlycontribution}
      onClose={() => {
        setOpenModal({
          ...openModal,
          monthlycontribution: false,
        })
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="#202937">
        <ModalHeader>Defina um aporte e seu periodo</ModalHeader>

        <ModalCloseButton />
        <form
          onSubmit={handleSubmitContribution((value: any) => {
            setOpenModal({
              ...openModal,
              monthlycontribution: false,
            })
            addMonthlyContribution(value)
          })}
        >
          <ModalBody>
            <Box display="flex" gap={3} flexDirection="column">
              <InputTypeMoney
                control={controlContribution}
                name="value"
                defaultValue={monthlycontributionData?.value}
                label={`Valor (${
                  optionsLabelCurrencyKeyAndValue[userData.primary_currency]
                })`}
                placeholder={`Ex: ${
                  optionsLabelCurrencyKeyAndValue[userData.primary_currency]
                } 10.00`}
                errors={
                  <>
                    {errorsContribution.goal && (
                      <span className="text-red-500 text-sm ">
                        Este campo é obrigatório
                      </span>
                    )}
                  </>
                }
              />
              <InputTypeMoney
                control={controlContribution}
                name="date"
                defaultValue={monthlycontributionData?.value}
                label="Quantos Meses ira fazer o aporte"
                placeholder="Ex: 12"
                errors={
                  <>
                    {errorsContribution.goal && (
                      <span className="text-red-500 text-sm ">
                        Este campo é obrigatório
                      </span>
                    )}
                  </>
                }
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" bg="green" type="submit">
              Confirmar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default MonthlyContributionModal
