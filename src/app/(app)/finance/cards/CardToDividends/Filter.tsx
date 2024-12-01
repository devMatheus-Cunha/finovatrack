import { Select } from '@chakra-ui/react'
import React from 'react'

const Filter = ({
  currentPage,
  onChange
}: {
  currentPage: number
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}) => {
  return (
    <Select
      value={currentPage}
      onChange={onChange}
      variant="flushed"
      mb={6}
      mt={2}
      color="white"
    >
      <option value={10}>10 itens por página</option>
      <option value={20}>20 itens por página</option>
      <option value={50}>50 itens por página</option>
    </Select>
  )
}

export default Filter
