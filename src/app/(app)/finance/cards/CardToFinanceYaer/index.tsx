'use client'

import React, { useState } from 'react'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import {
  currentAndPreviousYearValidity,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import useUpdateFinancialPlaningYear from '@/hooks/finance/useUpdateFinancialPlaningYear'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useCustomDisclosure } from '@/hooks/globalStates'
import { Accordion, AccordionFinanceYear, Card, Modal } from '@/components'
import ModalContent from './ModalContent'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments/types'

interface CardToFinanceYaerProps {
  investimentsData?: IInvestimentsData
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
    downPayment: '',
    homePurchases: '',
    otherDeductions: '',
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
      downPayment: formatToJavaScriptNumber(values.downPayment ?? ''),
      homePurchases: formatToJavaScriptNumber(values.homePurchases ?? ''),
      otherDeductions: formatToJavaScriptNumber(values.otherDeductions ?? '')
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
          ((Number(dataAtual.downPayment) || 0) +
            (Number(dataAtual.homePurchases) || 0) +
            (Number(dataAtual.otherDeductions) || 0))

        data[i + 1].totoalReserveLastYear = String(total)
      }

    return data
  }

  return (
    <Card
      title="Planejamento Financeiro"
      isLoading={isLoadingInvestimentsData}
      hasData={!!financialPlanningYear}
      className="h-[433px] overflow-hidden"
    >
      <div className="overflow-y-auto">
        {financialPlanningYear && financialPlanningYear.length > 0 ? (
          <Accordion allowMultiple className="overflow-y-auto max-h-[360px] ">
            {calcTotalsLaterYear(financialPlanningYear)?.map((item) => (
              <Accordion.Item
                key={item.year}
                id={item.year}
                className="border-b border-gray-600/50  last:border-b-0"
              >
                <Accordion.Button className="hover:bg-gray-600/30 transition-colors">
                  <AccordionFinanceYear.Button year={item.year} />
                </Accordion.Button>
                <Accordion.Panel>
                  <AccordionFinanceYear.Panel
                    data={item}
                    onOpen={() => onOpenModal(item)}
                    userData={userData}
                    isVisibilityData={isVisibilityData}
                    year={item.year}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : null}
      </div>
      <div className="px-0 py-6 flex justify-end gap-3">
        <Modal
          isOpen={isOpen}
          onClose={onCloseModal}
          size="2xl"
          isCentered
          title="Atualizar Valores"
        >
          <ModalContent
            onClose={onCloseModal}
            onSubmit={handleSubmit}
            initialValues={selectedData}
            currency={userData.primary_currency}
          />
        </Modal>
      </div>
    </Card>
  )
}

export default CardToFinanceYaer
