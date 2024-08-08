import { Input } from '@/components'
import { InputProps } from '@/components/Forms/Input'
import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FieldValues } from 'react-hook-form'

interface EditableFieldProps extends InputProps<FieldValues> {
  onCancel: () => void
  onSubmit: any
}

export default function EditableField({
  onCancel,
  onSubmit,
  ...rest
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleCancel = () => {
    setIsEditing(false)
    onCancel()
  }

  const handleSubmit = () => {
    onSubmit()
    setIsEditing(false)
  }

  return (
    <Box
      as="form"
      display="flex"
      alignItems="end"
      flexDir={{ base: 'column', sm: 'row' }}
      gap={2}
    >
      <Input disabled={!isEditing} {...rest} />
      <Box display="flex" gap={2}>
        {isEditing && (
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>
        )}
        <Button
          type="button"
          onClick={!isEditing ? () => setIsEditing(true) : () => handleSubmit()}
          colorScheme={!isEditing ? 'gray' : 'green'}
        >
          {!isEditing ? 'Alterar' : 'Salvar'}
        </Button>
      </Box>
    </Box>
  )
}
