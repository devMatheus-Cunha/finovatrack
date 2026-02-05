'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { InputTypeMoney } from '@/components'
import MonthYearPicker from '@/components/common/Forms/MonthYearPicker'
import {
  formatToCustomFormat,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import { DeviceMobile, FloppyDiskBack, X } from '@phosphor-icons/react'

const schema = z.object({
  meta_value_to_year: z.string().optional(),
  meta_renda_fixa: z.string().optional(),
  meta_investimentos: z.string().optional(),
  meta_reserva: z.string().optional()
})

interface GoalsModalProps {
  onClose: () => void
  onSubmit: (data: any) => void
  initialValues: any
  currency: string
  mode: 'mudanca' | 'estrategia'
}

const GoalsModal = ({
  onClose,
  onSubmit,
  initialValues,
  mode
}: GoalsModalProps) => {
  const [date, setDate] = useState(
    `${String((initialValues?.meta_year?.month || 0) + 1).padStart(2, '0')}/${initialValues?.meta_year?.year || 2024}`
  )

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      meta_value_to_year: formatToCustomFormat(
        initialValues?.meta_value_to_year || 0
      ),
      meta_renda_fixa: formatToCustomFormat(
        initialValues?.meta_renda_fixa || 0
      ),
      meta_investimentos: formatToCustomFormat(
        initialValues?.meta_investimentos || 0
      ),
      meta_reserva: formatToCustomFormat(initialValues?.meta_reserva || 0)
    }
  })

  const handleFormSubmit = (data: any) => {
    const finalData = { ...initialValues }

    if (mode === 'mudanca') {
      const [month, year] = date.split('/')
      finalData.meta_value_to_year = formatToJavaScriptNumber(
        data.meta_value_to_year
      )
      finalData.meta_year = { month: parseInt(month) - 1, year: parseInt(year) }
    }

    if (mode === 'estrategia') {
      finalData.meta_renda_fixa = formatToJavaScriptNumber(data.meta_renda_fixa)
      finalData.meta_investimentos = formatToJavaScriptNumber(
        data.meta_investimentos
      )
      finalData.meta_reserva = formatToJavaScriptNumber(data.meta_reserva)
    }

    onSubmit(finalData)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col h-full"
    >
      {/* CORPO DO FORMULÁRIO COM SCROLL SE NECESSÁRIO */}
      <div className="flex-1 space-y-6 py-4">
        {mode === 'mudanca' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] flex items-center gap-2">
                  <DeviceMobile size={14} className="text-blue-500" />
                  Prazo Estimado
                </label>
                <MonthYearPicker value={date} onChange={setDate} />
              </div>

              <div className="pt-2 border-t border-gray-700/50">
                <InputTypeMoney
                  control={control}
                  name="meta_value_to_year"
                  label="Patrimônio Alvo Final"
                  placeholder="Ex: 100.000,00"
                />
              </div>
            </div>
            <p className="text-[10px] text-gray-400 italic px-2">
              * Este valor será usado para calcular o progresso da barra
              principal e projeções de juros.
            </p>
          </div>
        )}

        {mode === 'estrategia' && (
          <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-500">
            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700/50 space-y-5">
              <InputTypeMoney
                control={control}
                name="meta_renda_fixa"
                label="Alvo Renda Fixa"
              />
              <InputTypeMoney
                control={control}
                name="meta_investimentos"
                label="Alvo Ações / ETFs"
              />
              <InputTypeMoney
                control={control}
                name="meta_reserva"
                label="Alvo Reserva de Emergência"
              />
            </div>
          </div>
        )}
      </div>

      {/* FOOTER FIXO COM BOTÕES MELHORADOS */}
      <div className="flex items-center justify-end gap-3 pt-6 mt-4 border-t border-gray-800">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-gray-800 transition-all border border-transparent hover:border-gray-700"
        >
          <X size={16} /> Cancelar
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all transform active:scale-95"
        >
          <FloppyDiskBack size={18} weight="bold" />
          Salvar Dados
        </button>
      </div>
    </form>
  )
}

export default GoalsModal
