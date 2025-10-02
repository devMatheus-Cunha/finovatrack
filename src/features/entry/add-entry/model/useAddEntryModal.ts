// src/features/entry/add-entry/model/useAddEntryModal.ts
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useCustomDisclosure from '@/shared/hooks/useCustomDisclosure'
import useAddEntrys from '@/entities/entry/api/useAddEntrys'
import { formatToJavaScriptNumber } from '@/utils/formatNumber'

const schema = z.object({
  value: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
})

type FormData = z.infer<typeof schema>

export const useAddEntryModal = () => {
  const { isOpen, onOpen, onClose } = useCustomDisclosure()
  const { addEntry, isLoadingAddEntrys } = useAddEntrys()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { value: '' }
  })

  const handleSubmit = async (data: FormData) => {
    await addEntry({ value: formatToJavaScriptNumber(data.value) })
    form.reset()
    onClose()
  }

  return {
    isModalOpen: isOpen,
    openModal: onOpen,
    closeModal: onClose,
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isLoading: isLoadingAddEntrys
  }
}
