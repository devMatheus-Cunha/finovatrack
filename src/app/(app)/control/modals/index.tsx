import { Modal as ModalChakra } from '@chakra-ui/react'

import InfoCardContent from '../modals/infoCardContent'
import ContentAddEntryModal from './addEntryModal'
import ExpenseModalContent from './expenseModalContent'
import ConfirmSaveReportModal from './confirmSaveReportModal'
import DeleteModalContent from './deleteModal'
import ContentTotalEntrys from './totalEntrysModal'

export const ModalsControl = ({
  controlModals,
  configModalExpense,
  expensesData,
  clearExpensesData,
  isLoadingAddExpense,
  onAddExpense,
  onDelete,
  onAddEntrys,
  onSaveReport,
  entrysData,
  deletedEntry
}: any) => {
  return (
    <>
      <ModalChakra
        isOpen={controlModals.controlModalAddExpense.isOpen}
        onClose={controlModals.controlModalAddExpense.onClose}
        isCentered
        size="xl"
      >
        <ExpenseModalContent
          typeModal={configModalExpense?.type}
          initialData={configModalExpense?.selectedData}
          handleOpenModal={controlModals.handleControlModalExpense}
          onSubmit={onAddExpense}
          isLoadingAddExpense={isLoadingAddExpense}
          onDelete={onDelete}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModals.controlModalDeleteExpenses.isOpen}
        onClose={controlModals.controlModalDeleteExpenses.onClose}
        isCentered
      >
        <DeleteModalContent
          onCancel={controlModals.controlModalDeleteExpenses.onClose}
          onSubmit={
            configModalExpense?.type === 'deleteAllExpenses'
              ? clearExpensesData
              : onDelete
          }
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModals.controlModalSaveReport.isOpen}
        onClose={controlModals.controlModalSaveReport.onClose}
        isCentered
        size="xl"
      >
        <ConfirmSaveReportModal
          initialData={expensesData}
          onCancel={controlModals.controlModalSaveReport.onClose}
          onSubmit={({ data, period }: any) => onSaveReport({ data, period })}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModals.controlModalAddEntry.isOpen}
        onClose={controlModals.controlModalAddEntry.onClose}
        isCentered
        size="xl"
      >
        <ContentAddEntryModal
          handleOpenModal={controlModals.controlModalAddEntry.onClose}
          onSubmit={onAddEntrys}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModals.controlModalTotalEntrys.isOpen}
        onClose={controlModals.controlModalTotalEntrys.onClose}
        isCentered
        size="xl"
      >
        <ContentTotalEntrys
          handleOpenModal={controlModals.controlModalTotalEntrys.onClose}
          data={entrysData}
          onDelete={deletedEntry}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModals.controlModalInfoCard.isOpen}
        onClose={controlModals.controlModalInfoCard.onClose}
        isCentered
        size="xl"
      >
        <InfoCardContent
          handleInfoAction={controlModals.controlModalInfoCard.onOpen}
        />
      </ModalChakra>
    </>
  )
}
