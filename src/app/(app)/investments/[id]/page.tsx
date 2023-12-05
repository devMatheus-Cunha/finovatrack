'use client'

import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useFetchInvestmentsTotalGoal from '@/hooks/investments/useFetchInvestmentsTotalGoal'
import useAddTotalGoalInvestments from '@/hooks/investments/useAddTotalGoalInvestments'
import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useFetchMonthlycontribution from '@/hooks/investments/useFetchMonthlycontribution'
import useAddMonthlyContribution from '@/hooks/investments/useAddMonthlyContribution'
import Cards from './parts/Cards'
import MonthlyContributionModal from './parts/modals/monthlycontributionModal'
import InvestmentsAllGoalsModal from './parts/modals/investmentsAllGoalsModal'

const schemaContributions = z.object({
  value: z.string().nonempty(),
  date: z.string().nonempty()
})

const schemaGoals = z.object({
  goal: z.string().nonempty()
})

const Investments = () => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const { investmentsAllGoalsData } = useFetchInvestmentsTotalGoal()
  const { addGoalinvestment } = useAddTotalGoalInvestments()

  const { monthlycontributionData } = useFetchMonthlycontribution()
  const { addMonthlyContribution } = useAddMonthlyContribution()

  const [openModal, setOpenModal] = useState({
    monthlycontribution: false,
    investmentsAllGoals: false
  })

  const {
    handleSubmit: handleSubmitGoals,
    control: controlGoals,
    formState: { errors: errorsGoals }
  } = useForm({
    defaultValues: investmentsAllGoalsData,
    resolver: zodResolver(schemaGoals)
  })

  const {
    handleSubmit: handleSubmitContribution,
    control: controlContribution,
    formState: { errors: errorsContribution }
  } = useForm({
    defaultValues: monthlycontributionData,
    resolver: zodResolver(schemaContributions)
  })

  return (
    <>
      <Box display="flex" gap={4}>
        <Cards
          isVisibilityData={isVisibilityData}
          userData={userData}
          setOpenModal={setOpenModal}
          investmentsAllGoalsData={investmentsAllGoalsData}
          openModal={openModal}
          monthlycontributionData={monthlycontributionData}
        />
      </Box>

      <MonthlyContributionModal
        userData={userData}
        setOpenModal={setOpenModal}
        openModal={openModal}
        monthlycontributionData={monthlycontributionData}
        handleSubmitContribution={handleSubmitContribution}
        controlContribution={controlContribution}
        errorsContribution={errorsContribution}
        addMonthlyContribution={addMonthlyContribution}
      />

      <InvestmentsAllGoalsModal
        userData={userData}
        setOpenModal={setOpenModal}
        openModal={openModal}
        investmentsAllGoalsData={investmentsAllGoalsData}
        handleSubmitGoals={handleSubmitGoals}
        controlGoals={controlGoals}
        errorsGoals={errorsGoals}
        addGoalinvestment={addGoalinvestment}
      />
    </>
  )
}

export default Investments
