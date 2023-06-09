/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */

'use client'

import { FolderOpen } from '@phosphor-icons/react'
import { Fragment, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Button } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { validateColumsHeadProps } from './utils'

function Reports() {
  const { userData } = useUserData()
  const [selectedPeriod, setSelectedPeriod] = useState(new Date())
  const { isVisibilityData } = useIsVisibilityDatas()

  const { reportData, setPeriod } = useFetchReportsData()

  const [data] = reportData ?? []

  function onChangeDate(date: Date) {
    setSelectedPeriod(date)
  }

  const onSubmit = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
      month: '2-digit',
      year: 'numeric',
    })

    setPeriod(formattedDate)
  }

  return (
    <div className="h-[100vh] w-[100%]">
      <div className="flex items-center flex-col w-[100%] gap-10 p-3">
        <div className="p-4 flex h-auto gap-4 bg-gray-800 rounded-lg flex-col w-[40%]">
          <h2>Escolha um período para solicitar um relatório:</h2>
          <div className="flex gap-4 bg-gray-800 rounded-lg justify-center items-center">
            <DatePicker
              selected={selectedPeriod}
              onChange={(date: Date) => onChangeDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="border text-sm rounded-lg w-full p-1.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />

            <Button
              type="button"
              onClick={() => onSubmit(selectedPeriod)}
              className="font-medium rounded-lg text-sm p-2 bg-gray-700 hover:bg-gray-600 focus:ring-gray-600 border-gray-700 w-full"
            >
              <div className="flex gap-2 justify-center items-center">
                <FolderOpen size={20} color="#eee2e2" />
                Solicitar Relatório
              </div>
            </Button>
          </div>
        </div>
        <div className="w-[95%]">
          {data ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-xl">
                Relatório referente ao período{' '}
                <span className="italic">{data?.period}</span>
              </h1>
              <div className="flex gap-4">
                <h1 className="text-gray-300">
                  Total Entradas:{' '}
                  <span className="italic text-white">
                    {isVisibilityData ? data.totalEntrys : '****'}
                  </span>
                </h1>
                {userData.typeAccount === 'hybrid' && (
                  <h1 className="text-gray-300">
                    {`Total gastos em ${userData.secondary_currency}:`}{' '}
                    <span className="italic text-white">
                      {isVisibilityData ? data.totalExpenseEurToReal : '****'}
                    </span>
                  </h1>
                )}
                <h1 className="text-gray-300">
                  Total Gastos:{' '}
                  <span className="italic text-white">
                    {isVisibilityData ? data.totalExpenses : '****'}
                  </span>
                </h1>
                <h1 className="text-gray-300">
                  Total Livre{' '}
                  <span className="italic text-white">
                    {isVisibilityData ? data.totalInvested : '****'}
                  </span>
                </h1>
                {userData.typeAccount === 'hybrid' && (
                  <h1 className="text-gray-300">
                    Cotação Usada:{' '}
                    <span className="italic text-white">{data.quatation}</span>
                  </h1>
                )}
              </div>
              <div className="relative overflow-y-auto sm:rounded-lg h-[62vh] w-[100%] bg-gray-800">
                {data?.data?.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-500 text-gray-400">
                    <thead className="text-md text-gray-700 uppercase  bg-gray-800 text-gray-400 border-b border-gray-700">
                      <tr>
                        {validateColumsHeadProps[userData.typeAccount].map(
                          (item: { field: string; header: string }) => (
                            <th
                              scope="col"
                              className="px-6 py-3"
                              key={item.field}
                            >
                              {item.header}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((item, index) => (
                        <Fragment key={index}>
                          <tr className="border-b bg-gray-800 border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap text-white"
                            >
                              {item.description}
                            </th>
                            {userData.primary_currency && (
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap text-white"
                              >
                                {item.value_primary_currency !== 0 &&
                                isVisibilityData
                                  ? formatCurrencyMoney(
                                      item.value_primary_currency,
                                      userData.primary_currency,
                                    )
                                  : '-'}
                              </th>
                            )}

                            {userData.secondary_currency && (
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap text-white"
                              >
                                {item.value_secondary_currency !== 0 &&
                                isVisibilityData
                                  ? formatCurrencyMoney(
                                      item.value_secondary_currency,
                                      userData.secondary_currency,
                                    )
                                  : '-'}
                              </th>
                            )}
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap text-white"
                            >
                              {item.type}
                            </th>
                            {userData.typeAccount === 'hybrid' && (
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap text-white"
                              >
                                {item.typeMoney}
                              </th>
                            )}
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <h1 className="text-2xl">Não a nenhum dado na tabela!</h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="mt-4 text-3xl font-bold text-white">
                Nenhum relatório gerado
              </h1>
              <p className="mt-2 text-md text-gray-300">
                Não há dados disponíveis para este período.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports
