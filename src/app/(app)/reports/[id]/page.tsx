'use client'

import { FolderOpen } from '@phosphor-icons/react'
import { Fragment, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Button } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import Table, { TableColumn } from '@/components/Table'

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
      year: 'numeric'
    })

    setPeriod(formattedDate)
  }

  const columsHeadProps = (): TableColumn[] => {
    const columns = [
      {
        header: 'Descrição',
        field: 'description'
      },
      {
        header: optionsCurrencyKeyAndValue[userData.primary_currency],
        field: 'value_primary_currency',
        modifier: (value: number) =>
          !isVisibilityData || !value
            ? '-'
            : formatCurrencyMoney(value, userData?.primary_currency)
      },
      {
        header: 'Categoria',
        field: 'category',
        modifier: (value: string) => value ?? '-'
      },
      {
        header: 'Status',
        field: 'payment',
        styles: (value: string) => ({
          color: value === 'A Pagar' ? 'red' : 'green'
        })
      }
    ]

    if (userData.typeAccount === 'hybrid') {
      columns.splice(2, 0, {
        header: optionsCurrencyKeyAndValue[userData.secondary_currency],
        field: 'value_secondary_currency',
        modifier: (value: number) =>
          !isVisibilityData || !value
            ? '-'
            : formatCurrencyMoney(value, userData.secondary_currency)
      })
      columns.splice(3, 0, {
        header: 'Moeda',
        field: 'typeMoney'
      })
    }

    return columns
  }

  return (
    <div className=" w-[100%]">
      <div className="flex items-center flex-col w-[100%] gap-4 md:gap-10 p-3">
        <div className="p-4 flex h-auto gap-4 bg-gray-800 rounded-lg flex-col md:w-[40%]">
          <h2>Escolha um período para solicitar um relatório:</h2>
          <div className="flex gap-2 md:gap-4 bg-gray-800 rounded-lg justify-center items-center">
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
              className="font-medium rounded-lg text-[13px] md:text-sm p-2 bg-gray-700 hover:bg-gray-600 focus:ring-gray-600 border-gray-700 w-full"
            >
              <div className="flex gap-1 md:gap-2 justify-center items-center">
                <FolderOpen size={20} color="#eee2e2" />
                Solicitar Relatório
              </div>
            </Button>
          </div>
        </div>
        <div className="w-[95%]">
          {data ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-xl">
                Relatório referente ao período{' '}
                <span className="italic">{data?.period}</span>
              </h1>
              <div className="flex flex-wrap gap-2 md:gap-4">
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
              <div className="relative md:overflow-y-auto sm:rounded-lg h-[62vh] w-[100%] lg:bg-gray-800">
                {data?.data?.length > 0 ? (
                  <>
                    <Table columns={columsHeadProps()} data={data?.data} />
                    <div className="lg:hidden flex flex-nowrap flex-col md:flex-wrap md:flex-row gap-4">
                      {data?.data.map((item) => (
                        <>
                          {item.value && (
                            <div className="flex h-[85px] w-[100%] md:w-[45%] text-white bg-gray-800 rounded-lg justify-between items-center p-4">
                              <div className="flex flex-col gap-4 ">
                                <p className="text-ms">{item?.description}</p>
                                <p className="-mt-1 font-sans text-m font-semibold">
                                  {isVisibilityData
                                    ? formatCurrencyMoney(
                                        Number(item?.value),
                                        userData.typeAccount === 'oneCurrency'
                                          ? userData.primary_currency
                                          : item?.typeMoney
                                      )
                                    : '-'}
                                </p>
                              </div>
                              <div className="flex flex-col gap-4 text-left w-[33%]">
                                <p
                                  className={`font-medium text-ms ${
                                    item?.payment === 'A Pagar'
                                      ? ' text-red-500'
                                      : 'text-green-500'
                                  }`}
                                >
                                  {item?.payment}
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <h1 className="text-2xl">Não a nenhum dado na tabela!</h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="mt-4 text-2xl md:text-3xl font-bold text-white">
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
