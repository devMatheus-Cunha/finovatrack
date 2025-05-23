'use client'

import {
  HStack,
  Text,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Button,
  Menu
} from '@chakra-ui/react'
import {
  Coins,
  HandCoins,
  Broom,
  FolderOpen,
  ArrowsCounterClockwise,
  Plus
} from '@phosphor-icons/react'
import { RefetchQuationDataType } from '@/hooks/quatation/useFetchQuatationEur'
import { optionsFilterCategory } from '../../utils'
import { IHandleControlModalExpenseFunction } from '../../hooks/useControlModal'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { DropdownFilter, ShowAndHide } from '@/components'
import { useUserData } from '@/hooks/globalStates'

interface IHeaderDataTableToControl {
  currentQuotation: number | undefined
  filter: string
  onOpenAddEntry: () => void
  onOpenDeleteExpenses: () => void
  onOpenSaveReport: () => void
  handleControlModalExpense: IHandleControlModalExpenseFunction
  onFilter: (filter: any) => void
  refetchQuationData: RefetchQuationDataType
}

function HeaderDataTableToControl({
  currentQuotation,
  filter,
  onFilter,
  refetchQuationData,
  onOpenAddEntry,
  onOpenSaveReport,
  onOpenDeleteExpenses,
  handleControlModalExpense
}: IHeaderDataTableToControl) {
  const { userData } = useUserData()

  const buttonData = [
    {
      label: 'Add Gastos',
      icon: Coins,
      onClick: () => handleControlModalExpense('add')
    },
    {
      label: 'Add Entrada',
      icon: HandCoins,
      onClick: onOpenAddEntry
    },
    {
      label: 'Salvar Relatório',
      icon: FolderOpen,
      onClick: onOpenSaveReport
    },
    {
      label: 'Limpar Gastos',
      icon: Broom,
      onClick: onOpenDeleteExpenses
    }
  ]

  return (
    <HStack justifyContent="space-between" alignItems="center" wrap="wrap">
      <HStack gap={3} justifyContent="center" flexWrap="wrap">
        {buttonData.map((button, index) => (
          <Button
            key={index}
            bg="gray.700"
            leftIcon={<Icon as={button.icon} color="white" boxSize={5} />}
            onClick={button.onClick}
            display={{ base: 'none', lg: 'flex' }}
          >
            {button.label}
          </Button>
        ))}

        <ShowAndHide displayLg="none" displayBase="initial">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={Plus} />}
              aria-label="Ações"
              bg="gray.700"
            />
            <MenuList>
              {buttonData.map((button, index) => (
                <MenuItem
                  key={index}
                  onClick={button.onClick}
                  icon={<Icon as={button.icon} mr={2} />}
                >
                  {button.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ShowAndHide>
      </HStack>

      <HStack>
        <DropdownFilter
          value={filter}
          options={optionsFilterCategory}
          onFilter={onFilter}
          label="Filtrar Categoria"
        />
        {userData.typeAccount === 'hybrid' && (
          <>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              as="h3"
              fontStyle="italic"
            >
              {`${userData.secondary_currency}: ${formatCurrencyMoney(
                currentQuotation ?? 0,
                userData.primary_currency
              )}`}
            </Text>
            <IconButton
              aria-label="Refresh"
              icon={<ArrowsCounterClockwise size={20} color="white" />}
              onClick={() => refetchQuationData()}
              colorScheme="gray"
            />
          </>
        )}
      </HStack>
    </HStack>
  )
}

export default HeaderDataTableToControl
