import { ExpenseData } from '@/services/expenses/getExpenses'
import { initialDataSelectedData } from '../utils'
import { useState } from 'react'
import { useCustomDisclosure } from '@/hooks/globalStates'


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

export const useControlModals = () => {
  const [configModalExpense, setConfigModalExpense] =
    useState<IConfigModalExpenseProps>({
      selectedData: initialDataSelectedData
    })

  const controlModalAddEntry = useCustomDisclosure()
  const controlModalTotalEntrys = useCustomDisclosure()
  const controlModalSaveReport = useCustomDisclosure()
  const controlModalDeleteExpenses = useCustomDisclosure()
  const controlModalAddExpense = useCustomDisclosure()
  const controlModalInfoCard = useCustomDisclosure()

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
