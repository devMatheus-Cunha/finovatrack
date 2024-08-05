'use client'

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Text
} from '@chakra-ui/react'
import { Funnel } from '@phosphor-icons/react'
import React from 'react'

interface Option {
  text: string
  value: string
  type: string
}

interface DropdownFilterProps {
  options: Option[]
  value: string
  onFilter: any
  label: string
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  onFilter,
  label
}) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<Funnel />}
        colorScheme="gray"
      />
      <MenuList>
        <MenuDivider display={{ base: 'block', lg: 'none' }} />
        <Text
          fontSize="xs"
          color="gray.400"
          display={{ base: 'block', lg: 'none' }}
        >
          {label}
        </Text>
        {options.map((item) => (
          <MenuItem key={item.value} onClick={() => onFilter(item)}>
            {item.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default DropdownFilter
