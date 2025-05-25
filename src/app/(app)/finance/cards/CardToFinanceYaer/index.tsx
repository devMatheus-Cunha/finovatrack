import React, { useState } from 'react'
import { AccordionFinanceYear } from './AccordionFinanceYear'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import {
  currentAndPreviousYearValidity,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import useUpdateFinancialPlaningYear from '@/hooks/finance/useUpdateFinancialPlaningYear'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useCustomDisclosure from '@/hooks/globalStates/useCustomDisclosure'
import Modal from '@/components/common/Modal'
import ModalContent from './ModalContent'
import { Accordion } from '@chakra-ui/react'
import { Card } from '@/components'

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
  const { isOpen, onOpen, onClose } = useCustomDisclosure()
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
          Number(
            currentAndPreviousYearValidity(dataAtual.year)
              ? dataAtual.reserve
              : dataAtual.totoalReserveLastYear
          ) +
          Number(dataAtual.monthlyContributions) *
            Number(dataAtual.periodContributions) +
          Number(dataAtual.receivables) -
          Number(dataAtual.deduction)

        data[i + 1].totoalReserveLastYear = String(total)
      }

    return data
  }

  return (
    <Card
      title="Finanças"
      isLoading={isLoadingInvestimentsData}
      hasData={!!financialPlanningYear}
      className=" min-h-[433px] max-h-[433px]"
    >
      <div className="pt-4">
        <Accordion allowMultiple>
          {calcTotalsLaterYear(financialPlanningYear) &&
            calcTotalsLaterYear(financialPlanningYear)?.map((item) => (
              <AccordionFinanceYear.Root key={item.year}>
                <AccordionFinanceYear.Button year={item.year} />
                <AccordionFinanceYear.Panel
                  data={item}
                  onOpen={() => onOpenModal(item)}
                  userData={userData}
                  isVisibilityData={isVisibilityData}
                  year={item.year}
                />
              </AccordionFinanceYear.Root>
            ))}
          <Modal isOpen={isOpen} onClose={onCloseModal} size="2xl" isCentered>
            <ModalContent
              onClose={onCloseModal}
              onSubmit={handleSubmit}
              initialValues={selectedData}
              currency={userData.primary_currency}
            />
          </Modal>
        </Accordion>
      </div>
    </Card>
  )
}

export default CardToFinanceYaer
