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
    <form className="flex gap-2">
      <Input disabled={!isEditing} {...rest} />
      <div className="flex gap-2 self-end">
        {isEditing && (
          <Button type="button" onClick={handleCancel} variant="cancel">
            Cancelar
          </Button>
        )}
        <Button
          variant={!isEditing ? 'default700' : 'confirm'}
          type="button"
          onClick={!isEditing ? () => setIsEditing(true) : () => handleSubmit()}
        >
          {!isEditing ? 'Alterar' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
