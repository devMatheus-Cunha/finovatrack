import { InfoCardMoney } from '@/components';
import { formatCurrencyMoney } from '@/utils/formatCurrencyMoney';
import React from 'react';
import { validaTextForTypeAccount } from '../../utils';
import { TypeAccount } from '@/hooks/useAuth/types';
import { IData } from '../../hooks/useFetchEntrysData';
import { ExpenseData } from '../../hooks/useFetchExpensesData';
import { ITypeModal } from '../../types';

interface IInfoCardsToControl {
 typeAccount: TypeAccount
 totalEntrys: number
 entrysData: IData[]
 totalExpensesEurToReal: number
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
}

const InfoCardsToControl = ({
 typeAccount,
 totalEntrys,
 entrysData,
 totalExpensesEurToReal,
 handleOpenModal,
}: IInfoCardsToControl) => {
 return (
  <div className="flex w-[100%] text-center items-center justify-center h-[20vh] spac e-y-4 sm:flex sm:space-y-0 sm:space-x-4">
   <InfoCardMoney
    infoData={formatCurrencyMoney(totalEntrys, typeAccount)}
    title={validaTextForTypeAccount[typeAccount]?.titleEntrys}

    contentAction={
     <button
      onClick={() => handleOpenModal("totalsEntrys")}
      className={`text-xs italic  ${entrysData.length <= 0 ? "cursor-not-allowed dark:text-gray-400" : 'dark:hover:text-gray-400 dark:text-gray-300'}`}
      disabled={entrysData.length <= 0}
     >
      Visualizar
     </button>
    }
   />
   <InfoCardMoney
    infoData={formatCurrencyMoney(totalExpensesEurToReal, typeAccount)}
    title={validaTextForTypeAccount[typeAccount]?.titleExpenses}
   />
   <InfoCardMoney
    infoData={formatCurrencyMoney(totalEntrys - totalExpensesEurToReal, typeAccount)
    }
    title={validaTextForTypeAccount[typeAccount]?.totalFree}
   />
  </div>
 );
}

export default InfoCardsToControl;