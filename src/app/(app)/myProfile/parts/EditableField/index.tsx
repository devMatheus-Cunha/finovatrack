import { Input } from '@/components'
import { InputProps } from '@/components/common/Forms/Input'
import { Button } from '@/components/common'
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
    <form className="flex items-end flex-col sm:flex-row gap-2">
      <Input disabled={!isEditing} {...rest} />
      <div className="flex gap-2">
        {isEditing && (
          <Button type="button" variant="cancel" onClick={handleCancel}>
            Cancelar
          </Button>
        )}
        <Button
          type="button"
          onClick={!isEditing ? () => setIsEditing(true) : () => handleSubmit()}
        >
          {!isEditing ? 'Alterar' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
