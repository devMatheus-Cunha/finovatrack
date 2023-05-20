/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Button } from '@/components';
import React from 'react';

function DeleteModalContent({ onSubmit, onCancel }: any) {
  return (
    <div className="relative rounded-lg shadow bg-gray-800">
      <div className="p-6 text-center">
        <svg
          aria-hidden="true"
          className="mx-auto mb-4 text-gray-400 w-14 h-14 text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-400">Você tem certeza que deseja deletar?</h3>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onCancel}
            data-modal-hide="popup-modal"
            type="button"
            variant="cancel"
          >
            Cancelar
          </Button>
          <Button
            data-modal-hide="popup-modal"
            variant="delete"
            type="submit"
            onClick={onSubmit}
          >
            Deletar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModalContent;
