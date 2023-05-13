/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

function DeleteModalContent({ onSubmit, onCancel }: any) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 z-50 w-1/4">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="p-6 text-center">
          <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Você tem certeza que deseja deletar?</h3>
          <button
            onClick={onCancel}
            data-modal-hide="popup-modal"
            type="button"
            className="rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600  mr-2"
          >
            Cancelar
          </button>
          <button
            data-modal-hide="popup-modal"
            type="submit"
            onClick={onSubmit}
            className="bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModalContent;
