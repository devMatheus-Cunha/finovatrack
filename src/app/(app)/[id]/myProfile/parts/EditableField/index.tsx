import { Button, Input } from '@/components'
import { InputProps } from '@/components/Forms/Input'
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
    <form className="flex gap-2 flex-col sm:flex-row">
      <Input disabled={!isEditing} {...rest} />
      <div className="flex gap-2 sm:self-end">
        {isEditing && (
          <Button
            type="button"
            onClick={handleCancel}
            className="w-[100%]"
            variant="cancel"
          >
            Cancelar
          </Button>
        )}
        <Button
          variant={!isEditing ? 'default700' : 'confirm'}
          type="button"
          className="w-[100%]"
          onClick={!isEditing ? () => setIsEditing(true) : () => handleSubmit()}
        >
          {!isEditing ? 'Alterar' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
