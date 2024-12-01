import React, { useState } from 'react'
import {
  Accordion,
  Card,
  CardHeader,
  Heading,
  Modal,
  Skeleton,
  useDisclosure
} from '@chakra-ui/react'
import { AccordionFinanceYear } from './AccordionFinanceYear'
import ModalContent from './ModalContent'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import { formatToJavaScriptNumber } from '@/utils/formatNumber'
import useUpdateFinancialPlaningYear from '@/hooks/finance/useUpdateFinancialPlaningYear'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

interface CardToFinanceYaerProps {
  investimentsData?: IInvestmentsProps
  isLoadingInvestimentsData?: boolean
  financialPlanningYear?: IFinancialPlanningProps[]
}

const CardToFinanceYaer = ({
  financialPlanningYear,
  isLoadingInvestimentsData
}: CardToFinanceYaerProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const { updateFinancialPlaningYear } = useUpdateFinancialPlaningYear()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedData, setSelectedData] = useState<
    IFinancialPlanningProps | undefined
  >({
    id: '',
    year: '',
    investments: '',
    reserve: '',
    monthlyContributions: '',
    receivables: '',
    deduction: '',
    periodContributions: ''
  })

  const onCloseModal = () => {
    setSelectedData(undefined)
    onClose()
  }

  const handleSubmit = (values: IFinancialPlanningProps) => {
    setSelectedData(undefined)
    updateFinancialPlaningYear({
      ...values,
      reserve: formatToJavaScriptNumber(values.reserve),
      investments: formatToJavaScriptNumber(values.investments),
      monthlyContributions: formatToJavaScriptNumber(
        values.monthlyContributions
      ),
      receivables: formatToJavaScriptNumber(values.receivables),
      deduction: formatToJavaScriptNumber(values.deduction)
    })
    onCloseModal()
  }

  const onOpenModal = (item: IFinancialPlanningProps) => {
    setSelectedData(item)
    onOpen()
  }

  function calcTotalsLaterYear(data?: IFinancialPlanningProps[]) {
    if (data)
      for (let i = 0; i < data.length - 1; i++) {
        const dataAtual = data[i]
        const total =
          Number(dataAtual.investments) +
          Number(dataAtual.totoalReserveLastYear ?? dataAtual.reserve) +
          Number(dataAtual.monthlyContributions) *
            Number(dataAtual.periodContributions) +
          Number(dataAtual.receivables) -
          Number(dataAtual.deduction)

        data[i + 1].totoalReserveLastYear = String(total)
      }

    return data
  }

  return (
    <>
      {isLoadingInvestimentsData ? (
        <Skeleton
          w="100%"
          minH="433px"
          maxH="433px"
          height="100%"
          rounded="md"
        />
      ) : (
        <Card width="100%" minH="433px" bg="gray.700">
          <CardHeader>
            <Heading size="md" mb={6} color="white">
              Finanças
            </Heading>
            <Accordion allowMultiple>
              {calcTotalsLaterYear(financialPlanningYear) &&
                calcTotalsLaterYear(financialPlanningYear)?.map((item) => (
                  <React.Fragment key={item.year}>
                    <AccordionFinanceYear.Root>
                      <AccordionFinanceYear.Button year={item.year} />
                      <AccordionFinanceYear.Panel
                        data={item}
                        onOpen={() => onOpenModal(item)}
                        userData={userData}
                        isVisibilityData={isVisibilityData}
                      />
                    </AccordionFinanceYear.Root>
                  </React.Fragment>
                ))}
              <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                <ModalContent
                  onClose={onCloseModal}
                  onSubmit={handleSubmit}
                  initialValues={selectedData}
                  currency={userData.primary_currency}
                />
              </Modal>
            </Accordion>
          </CardHeader>
        </Card>
      )}
    </>
  )
}

export default CardToFinanceYaer
