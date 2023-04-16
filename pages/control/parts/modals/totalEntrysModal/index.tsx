import React, { Fragment } from 'react';
import { formatCurrency } from '../../utils';
import { ButtonGroup } from '@/components';
import { AiOutlineDelete } from 'react-icons/ai';

interface IData {
  value: number
  id?: string
}

interface IContentModal {
  handleOpenModal: any
  data: IData[]
  onDelete: ({ data }: { data: IData }) => void
}

export const columsHeadProps = [
  {
    header: "Entradas",
    field: "value",
  },
  {
    header: "Ação",
    field: "actions",
  },
];


const ContentTotalEntrys = ({
  handleOpenModal,
  data,
  onDelete,
}: IContentModal) => {

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 z-50 w-1/2">
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Veja todas entradas
            </h3>
          </div>


          <table className="w-full text-sm text-left dark:text-gray-300">
            <thead className="text-md  uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
              <tr>
                {
                  columsHeadProps?.map((item: any) => (
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
                data?.map((item: any, index: any) => (
                  <Fragment key={index}>
                    <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.value !== 0 ? formatCurrency(item?.value, "BRL") : "-"}
                      </th>
                      {
                        item.description !== "Totais" ? (
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <ButtonGroup buttonOptions={[
                              {
                                onClick: () => {
                                  onDelete({ data: item })
                                },
                                content: <AiOutlineDelete />
                              }
                            ]} />
                          </th >
                        ) : (
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" />
                        )
                      }
                    </tr >
                  </Fragment>
                ))
              }
            </tbody>
          </table >

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={handleOpenModal}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ContentTotalEntrys;