'use client'

import { useState } from 'react'
import { useUserData } from '@/hooks/globalStates'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useUpdatedUser from '@/hooks/myProfile/useUpdatedUser'
import { Select } from '@/components'
import { dropdownOptionsCurrencyHybrid } from '@/app/(auth)/signup/utils'
import EditableField from './parts/EditableField'
import { Box, Container, Heading, VStack, Text, Button } from '@chakra-ui/react'

type FormValues = {
  email?: string
  name?: string
}

type FormValuesCurrencys = {
  primary_currency: string
  secondary_currency: string
}

const schemaName = z.object({
  name: z.string().optional()
})

const schemaEmail = z.object({
  email: z.string().email('Email inválido')
})

const schemaTypeAccount = z
  .object({
    primary_currency: z.string().optional(),
    secondary_currency: z.string().optional()
  })
  .refine(
    (data) => {
      return data.primary_currency !== data.secondary_currency
    },
    {
      message: 'A moeda primária e a secundária não podem ter a mesma seleção',
      path: ['secondary_currency']
    }
  )

function MyProfile() {
  const { userData } = useUserData()
  const { updatedUserData } = useUpdatedUser()

  const [optionsCurrencyEnabled, setOptionsCurrencyEnabled] = useState(false)

  const {
    register: registerName,
    handleSubmit: onSubmitName,
    reset: resetName,
    formState: { errors: errorsName }
  } = useForm({
    defaultValues: { name: userData.name },
    resolver: zodResolver(schemaName)
  })

  const {
    register: registerEmail,
    handleSubmit: onSubmitEmail,
    reset: resetEmail,
    formState: { errors: errorsEmail }
  } = useForm<{ email: string | undefined }>({
    defaultValues: {
      email: userData.email
    },
    resolver: zodResolver(schemaEmail)
  })

  const {
    register: registerCurrencys,
    handleSubmit: onSubmitCurrencys,
    reset: resetTypeAccount,
    formState: { errors }
  } = useForm({
    defaultValues: {
      primary_currency: userData.primary_currency,
      secondary_currency: userData.secondary_currency
    },
    resolver: zodResolver(schemaTypeAccount)
  })

  const handleOptionsCurrencyEnabled = () => {
    setOptionsCurrencyEnabled(false)
    resetTypeAccount()
  }

  const handleSubmit = (fieldName: 'email' | 'name', values: FormValues) => {
    if (values[fieldName] === userData[fieldName]) return
    updatedUserData(values)
  }

  const updatedCurrencys = async (values: FormValuesCurrencys) => {
    if (
      values.primary_currency === userData.primary_currency &&
      values.secondary_currency === userData.secondary_currency
    ) {
      setOptionsCurrencyEnabled(false)
      return
    }
    updatedUserData(values)
    setOptionsCurrencyEnabled(false)
  }

  return (
    <Container
      bg="gray.700"
      display="flex"
      flexDirection="column"
      gap={{ base: 4, sm: 6 }}
      w="full"
      maxW="600px"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={1} align="stretch">
        <Heading fontSize={{ base: '23px', sm: '3xl' }} fontWeight="bold">
          Olá {userData.name}
        </Heading>
        <Text color="gray.300" fontSize={{ base: '14px', sm: 'md' }}>
          Aqui você pode visualizar e alterar as informações do seu perfil de
          forma simples e fácil.
        </Text>
      </VStack>
      <EditableField
        label="Nome"
        name="name"
        placeholder="Pedro..."
        type="text"
        onCancel={() => resetName()}
        onSubmit={onSubmitName((value) => handleSubmit('name', value))}
        register={registerName as any}
        required
        errors={errorsName.name?.message}
      />
      <EditableField
        label="Email"
        name="email"
        placeholder="teste@gmail.com"
        type="email"
        onCancel={() => resetEmail()}
        onSubmit={onSubmitEmail((value) => handleSubmit('email', value))}
        register={registerEmail as any}
        required
        errors={errorsEmail.email?.message}
      />
      <Box as="form" w="full" display="flex" flexDir="column">
        <Box
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          gap={2}
        >
          <Select
            label={
              userData.typeAccount === 'oneCurrency'
                ? 'Moeda Selecionada'
                : 'Moeda Principal Selecionada'
            }
            disabledSelect={!optionsCurrencyEnabled}
            name="primary_currency"
            options={dropdownOptionsCurrencyHybrid}
            register={registerCurrencys}
            errors={errors.primary_currency?.message}
          />
          {userData.typeAccount === 'hybrid' && (
            <Select
              label="Moeda Secundária Selecionada"
              name="secondary_currency"
              disabledSelect={!optionsCurrencyEnabled}
              options={dropdownOptionsCurrencyHybrid}
              register={registerCurrencys}
              errors={errors.secondary_currency?.message}
            />
          )}
        </Box>
        <Box display="flex" gap={2} mt={4} className="flex gap-2 mt-4">
          {optionsCurrencyEnabled && (
            <Button
              type="button"
              onClick={() => handleOptionsCurrencyEnabled()}
              w="100%"
            >
              Cancelar
            </Button>
          )}
          <Button
            colorScheme={!optionsCurrencyEnabled ? 'gray' : 'green'}
            type={!optionsCurrencyEnabled ? 'submit' : 'button'}
            w="100%"
            onClick={
              !optionsCurrencyEnabled
                ? () => setOptionsCurrencyEnabled(true)
                : onSubmitCurrencys(updatedCurrencys)
            }
          >
            {!optionsCurrencyEnabled ? 'Alterar' : 'Salvar'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default MyProfile
