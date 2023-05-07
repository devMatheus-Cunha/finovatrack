import { Button } from '@/components';
import { formatCurrencyMoney } from '@/utils/formatCurrencyMoney';
import { Coins, HandCoins, Broom, FolderOpen, ArrowsCounterClockwise } from '@phosphor-icons/react';
import React from 'react';
import { optionsFilter } from '../../utils';
import { TypeAccount } from '@/hooks/useAuth/types';
import { ExpenseData } from '../../hooks/useFetchExpensesData';
import { ITypeModal } from '../../types';
import { RefetchQuationDataType } from '../../hooks/useFetchQuatationEur';

interface IHeaderDataTableToControl {
 typeAccount: TypeAccount
 currentQuotation: number | undefined
 filter: string,
 onFilter: (filter: React.ChangeEvent<HTMLSelectElement>) => void
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
 handleOpenModalSaveReport: (data?: ExpenseData[]) => void
 refetchQuationData: RefetchQuationDataType
}

const HeaderDataTableToControl = ({
 typeAccount,
 currentQuotation,
 handleOpenModal,
 filter,
 onFilter,
 handleOpenModalSaveReport,
 refetchQuationData,
}: IHeaderDataTableToControl) => {
 return (
  <div className="flex  justify-between	items-center">
   <div className='flex flex-wrap justify-between	items-center'>
    <Button
     type="button"
     onClick={() => handleOpenModal("addExpense")}>
     <div className='flex gap-2 justify-center items-center'>
      <Coins size={20} color="#eee2e2" />
      Add Gastos
     </div>

    </Button>
    <Button
     type="button"
     onClick={() => handleOpenModal("addEntry")}>
     <div className='flex gap-2 justify-center items-center'>
      <HandCoins size={20} color="#eee2e2" />
      Add Entrada
     </div>
    </Button>
    <Button
     type="button"
     onClick={() => handleOpenModal("deleteAllExpenses")}
    >
     <div className='flex gap-2 justify-center items-center'>
      <Broom size={20} color="#eee2e2" />
      Limpar Gastos
     </div>
    </Button>
    <Button
     type="button"
     onClick={() => handleOpenModalSaveReport()}
    >
     <div className='flex gap-2 justify-center items-center'>
      <FolderOpen size={20} color="#eee2e2" />
      Salvar Relatório
     </div>
    </Button>
    <select
     id="type"
     className="cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
     onChange={(e) => onFilter(e)}
     value={filter}
    >
     <option value="" disabled selected>
      Filtre o Tipo
     </option>
     {optionsFilter.map((option) => (
      <option
       key={option.value}
       value={option.value}
      >
       {option.label}
      </option>
     ))}
    </select>
   </div>
   {
    typeAccount === "hybrid" && (
     <div className='flex gap-3 justify-center items-center'>
      <h3 className='italic'>
       {`Cotação: ${formatCurrencyMoney(currentQuotation, typeAccount)} `}
      </h3>
      <button
       type="button"
       onClick={() => refetchQuationData()}
       className='dark:hover:text-gray-400'
      >
       <ArrowsCounterClockwise size={20} color="#eee2e2" />
      </button>
     </div>
    )
   }
  </div>
 );
}

export default HeaderDataTableToControl;