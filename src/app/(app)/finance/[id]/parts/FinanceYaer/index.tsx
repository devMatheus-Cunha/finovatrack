import React, { useState } from 'react'
import { Accordion, useDisclosure } from '@chakra-ui/react'
import { AccordionFinanceYear } from '../AccordionFinanceYear'
import { Modal } from '@/components'
import ModalContent from './ModalContent'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'
import { IFinancialPlanningProps } from '@/service/finance/getFinancialPlanningYear'
import { formatToJavaScriptNumber } from '@/utils/formatNumber'
import useFetchFinancialPlaningYear from '@/hooks/finance/useFetchFinancialPlaningYear'
import useUpdateFinancialPlaningYear from '@/hooks/finance/useUpdateFinancialPlaningYear'
import { UserData } from '@/hooks/auth/useAuth/types'

interface IFinanceYearProps {
  investimentsData?: IInvestmentsProps
  userData: UserData
  isVisibilityData?: boolean
}

const FinanceYear: React.FC<IFinanceYearProps> = ({
  userData,
  isVisibilityData
}) => {
  const { financialPlanningYear } = useFetchFinancialPlaningYear()
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
        {isOpen && (
          <Modal className="w-[95%] lg:w-[50%]">
            <ModalContent
              onClose={onCloseModal}
              onSubmit={handleSubmit}
              initialValues={selectedData}
              currency={userData.primary_currency}
            />
          </Modal>
        )}
      </Accordion>
    </>
  )
}

export default FinanceYear
