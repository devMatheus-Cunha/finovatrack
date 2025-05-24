import React from 'react'

const Filter = ({
  currentPage,
  onChange
}: {
  currentPage: number
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}) => {
  return (
    <select
      value={currentPage}
      onChange={onChange}
      className="w-full bg-transparent border-0 border-b border-gray-500 text-white focus:ring-0 focus:border-blue-500 mb-6 mt-2 text-base outline-none"
    >
      <option value={10}>10 itens por página</option>
      <option value={20}>20 itens por página</option>
      <option value={50}>50 itens por página</option>
    </select>
  )
}

export default Filter
