import React from 'react'

const EmptyWithoutReport: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto rounded-lg h-auto md:h-[45vh] w-full max-w-2xl p-4 lg:p-0 bg-gray-700">
      <span className="mt-4 text-xl lg:text-[26px] font-bold text-white">
        Nenhum relatório gerado
      </span>
      <span className="mt-2 text-sm lg:text-md text-gray-300">
        Não há dados disponíveis para este período.
      </span>
    </div>
  )
}

export default EmptyWithoutReport
