import { ExpenseData } from '@/services/expenses/getExpenses'
import { useDisclosure } from '@chakra-ui/react'
import { initialDataSelectedData } from '../utils'
import { useState } from 'react'

type UseDisclosureReturn = {
  isOpen: boolean
  onOpen: () => void
  onClose: any
  onToggle: () => void
  isControlled: boolean
  getButtonProps: (props?: any) => any
  getDisclosureProps: (props?: any) => any
}
export type ITypeModalExpense =
  | 'cancel'
  | 'add'
  | 'delete'
  | 'edit'
  | 'deleteAllExpenses'
  | undefined

export interface IConfigModalExpenseProps {
  selectedData: ExpenseData
  type?: ITypeModalExpense
}
export type IHandleControlModalExpenseFunction = (
  type: ITypeModalExpense,
  item?: ExpenseData
) => void

const useControlModals = () => {
  const [configModalExpense, setConfigModalExpense] =
    useState<IConfigModalExpenseProps>({
      selectedData: initialDataSelectedData
    })

  const controlModalAddEntry: UseDisclosureReturn = useDisclosure()
  const controlModalTotalEntrys: UseDisclosureReturn = useDisclosure()
  const controlModalSaveReport: UseDisclosureReturn = useDisclosure()
  const controlModalDeleteExpenses: UseDisclosureReturn = useDisclosure()
  const controlModalAddExpense: UseDisclosureReturn = useDisclosure()
  const controlModalInfoCard: UseDisclosureReturn = useDisclosure()

  const handleControlModalExpense = (
    type: ITypeModalExpense,
    item?: ExpenseData
  ) => {
    switch (type) {
      case 'add':
        setConfigModalExpense({
          type: type,
          selectedData: initialDataSelectedData
        })
        controlModalAddExpense.onOpen()
        break
      case 'cancel':
        setConfigModalExpense({
          type: type,
          selectedData: initialDataSelectedData
        })
        controlModalAddExpense.onClose()
        break
      case 'delete':
        setConfigModalExpense({
          type: type,
          selectedData: item || initialDataSelectedData
        })
        controlModalDeleteExpenses.onOpen()
        break
      case 'edit':
        setConfigModalExpense({
          type: type,
          selectedData: item || initialDataSelectedData
        })
        controlModalAddExpense.onOpen()
        break
      default:
        console.warn('Tipo de ação desconhecido:', type)
    }
  }

  return {
    controlModalAddEntry,
    controlModalAddExpense,
    controlModalTotalEntrys,
    controlModalSaveReport,
    controlModalDeleteExpenses,
    controlModalInfoCard,
    handleControlModalExpense,
    configModalExpense
  }
}

export default useControlModals
