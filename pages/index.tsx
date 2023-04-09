import Head from 'next/head'
import { useState } from 'react'

type ITypeModal = "edit" | "delete" | "addEntry" | "addExpense" | ""

type Item = {
  description: string;
  real_value: string;
  euro_value: string;
}

export default function Home() {
  const [configModal, setConfigModal] = useState<{
    open: boolean
    type: ITypeModal
    selectedData: Item | undefined
  }>({
    open: false,
    type: "",
    selectedData: {
      description: "",
      real_value: "",
      euro_value: "",
    }
  })

  console.log(configModal)


  const validateTextToModal: any = {
    addEntry: {
      title: "Add Entry",
      description: "Add a new entry"
    },
    addExpense: {
      title: "Add Expense",
      description: "Add a new Expense"
    },
    edit: {
      title: "edit data",
      description: "edit data"
    },
    delete: {
      title: "delete data",
      description: "delete data"
    }
  }


  const handleOpenModal = (type?: ITypeModal, data?: Item) => {
    setConfigModal({
      open: !configModal.open,
      type: type || "",
      selectedData: data
    })
  }

  const [data, setdata] = useState({
    data: [
      {
        description: 'Descrição',
        real_value: "100",
        euro_value: "100",
      },
      {
        description: 'Descrição',
        real_value: "200",
        euro_value: "200",
      }
    ]
  })

  const columsHeadProps = [
    {
      header: "Descrição",
      field: "description",
    },
    {
      header: "Valor Real",
      field: "real_value",
    },
    {
      header: "Valor Euro",
      field: "euro_value",
    },
    {
      header: "Ação",
      field: "actions",
    }
  ]

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex gap-10 flex-col items-center justify-center h-[100vh]'>
          <div className='text-center'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">Controle Financeiro</h1>
            <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48">Controle o valor que ira usar de base e mostrar quanto dinheiro restara apos retirar suas despesas mensais</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenModal("addEntry")}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Default
              </button>
              <button
                type="button"
                onClick={() => handleOpenModal("addExpense")}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Default
              </button>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {
                      columsHeadProps.map((item) => (
                        <>
                          <th scope="col" className="px-6 py-3" key={item.field}>
                            {item.header}
                          </th>
                        </>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    data.data.map((item) => (
                      <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.description}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.euro_value}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.real_value}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenModal("edit", item)
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenModal("delete", item)
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                Deletar
                              </button>
                            </div>
                          </th >
                        </tr >
                      </>
                    ))
                  }
                </tbody>
              </table >
            </div>
          </div>
          {
            configModal.open && (
              <div style={{
                zIndex: "9999"
              }} className="fixed w-[40%] flex items-center justify-center">
                <div className="relative w-full max-w-2xl md:h-auto mx-auto my-0 bg-gray-800 rounded-lg shadow">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {validateTextToModal[configModal?.type || ""]?.title}
                      </h3>
                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="p-6 space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {validateTextToModal[configModal?.type || ""]?.description}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {configModal?.selectedData?.euro_value}
                        {" "}
                        {configModal?.selectedData?.real_value}
                      </p>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => handleOpenModal()}
                        data-modal-hide="defaultModal"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => handleOpenModal()}
                        data-modal-hide="defaultModal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div >
            )
          }

        </div >
      </main >
    </>
  )
}
