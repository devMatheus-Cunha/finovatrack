import React from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputTypeMoney, NumberInput } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import {
  currentAndPreviousYearValidity,
  formatToCustomFormat
} from '@/utils/formatNumber'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import {
  Button,
  HStack,
  SimpleGrid,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Heading
} from '@chakra-ui/react'

const schemaContributions = z.object({
  investments: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  reserve: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  monthlyContributions: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  receivables: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  deduction: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  periodContributions: z.string({
    required_error: 'Campo Obrigatorio'
  })
})

interface ModalProps {
  onClose: () => void
  initialValues?: IFinancialPlanningProps
  onSubmit: any
  currency: string
}

const ContentModalFinanceYear: React.FC<ModalProps> = ({
  onClose,
  initialValues,
  onSubmit,
  currency
}) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<IFinancialPlanningProps>({
    defaultValues: {
      id: initialValues?.id,
      year: initialValues?.year,
      periodContributions: initialValues?.periodContributions,
      investments: formatToCustomFormat(Number(initialValues?.investments)),
      receivables: formatToCustomFormat(Number(initialValues?.receivables)),
      reserve: currentAndPreviousYearValidity(initialValues?.year)
        ? formatToCustomFormat(Number(initialValues?.reserve))
        : formatToCustomFormat(Number(initialValues?.totoalReserveLastYear)),
      monthlyContributions: formatToCustomFormat(
        Number(initialValues?.monthlyContributions)
      ),
      deduction: formatToCustomFormat(Number(initialValues?.deduction))
    },
    resolver: zodResolver(schemaContributions)
  })

  return (
    <>
      <ModalOverlay />
      <form
        onSubmit={handleSubmit((values) => {
          onSubmit({
            ...values,
            year: initialValues?.year,
            id: initialValues?.id
          })
        })}
      >
        <ModalContent>
          <ModalHeader p={4} borderBottom="1px" borderColor="gray.600">
            <Heading as="h3" size="xl" fontWeight="semibold" color="white">
              Atualizar Valores
            </Heading>
          </ModalHeader>
          <ModalBody display="flex" flexDir="column" gap={6} p={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <InputTypeMoney
                control={control}
                name="investments"
                required
                label={`Investimentos (${optionsLabelCurrencyKeyAndValue[currency]})`}
                placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
                errors={errors.investments?.message}
              />
              <InputTypeMoney
                control={control}
                required
                labelHint="Se o campo estiver desabilitado ele está considerando o total do ano anterior na reserva."
                name="reserve"
                label={`Reserva (${optionsLabelCurrencyKeyAndValue[currency]})`}
                placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
                errors={errors?.reserve?.message}
              />
              <InputTypeMoney
                control={control}
                required
                name="monthlyContributions"
                label={`Aporte Mensal (${optionsLabelCurrencyKeyAndValue[currency]})`}
                placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
                errors={errors?.monthlyContributions?.message}
              />
              <NumberInput
                label="Período do Aporte"
                name="periodContributions"
                placeholder="12"
                type="number"
                register={register}
                required
                errors={errors?.periodContributions?.message}
              />
              <InputTypeMoney
                control={control}
                required
                name="receivables"
                label={`Aporte Extra (${optionsLabelCurrencyKeyAndValue[currency]})`}
                placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
                errors={errors?.receivables?.message}
              />
              <InputTypeMoney
                control={control}
                required
                name="deduction"
                label={`Dedução (${optionsLabelCurrencyKeyAndValue[currency]})`}
                placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
                errors={errors?.deduction?.message}
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter
            px={4}
            py={6}
            borderTop="1px"
            borderColor="gray.600"
            display={{ base: 'block', md: 'flex' }}
            justifyContent={{ base: 'center', md: 'flex-end' }}
            alignItems="center"
          >
            <HStack spacing={3}>
              <Button onClick={onClose}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </form>
    </>
  )
}

export default ContentModalFinanceYear
