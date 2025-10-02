import { Modal } from '@/components/common/Modal'

import InfoCardContent from '../modals/infoCardContent'
import ContentAddEntryModal from './addEntryModal'
import ExpenseModalContent from './expenseModalContent'
import ConfirmSaveReportModal from './confirmSaveReportModal'
import ContentTotalEntrys from './totalEntrysModal'
import { validateTextToModal } from '@/app/(app)/control/utils'

export const ModalsControl = ({
  controlModals,
  configModalExpense,
  expensesData,
  isLoadingAddExpense,
  onAddExpense,
  onAddEntrys,
  onSaveReport,
  entrysData,
  deletedEntry
}: any) => {
  return (
    <>
      <Modal
        isOpen={controlModals.controlModalAddExpense.isOpen}
        onClose={controlModals.controlModalAddExpense.onClose}
        isCentered
        size="xl"
        title={validateTextToModal[configModalExpense?.type || '']?.title}
      >
        <ExpenseModalContent
          typeModal={configModalExpense?.type}
          initialData={configModalExpense?.selectedData}
          handleOpenModal={controlModals.handleControlModalExpense}
          onSubmit={onAddExpense}
          isLoadingAddExpense={isLoadingAddExpense}
        />
      </Modal>

      <Modal
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
      </Modal>

      <Modal
        isOpen={controlModals.controlModalAddEntry.isOpen}
        onClose={controlModals.controlModalAddEntry.onClose}
        isCentered
        size="xl"
        title="Adicione uma Entrada"
      >
        <ContentAddEntryModal
          handleOpenModal={controlModals.controlModalAddEntry.onClose}
          onSubmit={onAddEntrys}
        />
      </Modal>

      <Modal
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
      </Modal>

      <Modal
        isOpen={controlModals.controlModalInfoCard.isOpen}
        onClose={controlModals.controlModalInfoCard.onClose}
        isCentered
        size="xl"
      >
        <InfoCardContent
          handleInfoAction={controlModals.controlModalInfoCard.onOpen}
        />
      </Modal>
    </>
  )
}
