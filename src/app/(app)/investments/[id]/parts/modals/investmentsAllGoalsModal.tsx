import { InputTypeMoney } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import React from 'react'

const InvestmentsAllGoalsModal = ({
  userData,
  setOpenModal,
  openModal,
  investmentsAllGoalsData,
  handleSubmitGoals,
  controlGoals,
  errorsGoals,
  addGoalinvestment
}: any) => {
  return (
    <Modal
      isOpen={openModal.investmentsAllGoals}
      onClose={() => {
        setOpenModal({
          ...openModal,
          investmentsAllGoals: false
        })
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="#202937">
        <ModalHeader>Defina uma meta</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={handleSubmitGoals((value: any) => {
            setOpenModal({
              ...openModal,
              investmentsAllGoals: false
            })
            addGoalinvestment(value)
          })}
        >
          <ModalBody>
            <InputTypeMoney
              control={controlGoals}
              name="goal"
              defaultValue={investmentsAllGoalsData?.goal}
              label={`Valor (${
                optionsLabelCurrencyKeyAndValue[userData.primary_currency]
              })`}
              placeholder={`Ex: ${
                optionsLabelCurrencyKeyAndValue[userData.primary_currency]
              } 10.00`}
              errors={
                <>
                  {errorsGoals.goal && (
                    <span className="text-red-500 text-sm ">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              }
            />
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

export default InvestmentsAllGoalsModal
