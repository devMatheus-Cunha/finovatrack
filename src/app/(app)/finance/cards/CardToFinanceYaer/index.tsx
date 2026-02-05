import { InputTypeMoney, NumberInput } from '@/components'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { IFinancialPlanningProps } from '@/utils/calculateFinancialProjection'
import {
  currentAndPreviousYearValidity,
  formatToCustomFormat,
  formatCurrencyMoney
} from '@/utils/formatNumber'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, ChevronUp, ChevronDown, X, Save } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

// Schema de validação baseado no seu "antigo"
const schemaContributions = z.object({
  investments: z.string({ required_error: 'Campo Obrigatório' }),
  reserve: z.string({ required_error: 'Campo Obrigatório' }),
  monthlyContributions: z.string({ required_error: 'Campo Obrigatório' }),
  receivables: z.string({ required_error: 'Campo Obrigatório' }),
  periodContributions: z.string({ required_error: 'Campo Obrigatório' }),
  downPayment: z.string().optional(),
  homePurchases: z.string().optional(),
  otherDeductions: z.string().optional()
})

function calcTotalsLaterYear(data?: IFinancialPlanningProps[]) {
  if (!data) return []
  const dataCopy = JSON.parse(JSON.stringify(data)) // Deep copy para evitar mutação
  for (let i = 0; i < dataCopy.length - 1; i++) {
    const dataAtual = dataCopy[i]
    const total =
      Number(dataAtual.investments) +
      Number(
        currentAndPreviousYearValidity(dataAtual.year)
          ? dataAtual.reserve
          : dataAtual.totoalReserveLastYear
      ) +
      Number(dataAtual.monthlyContributions) *
        Number(dataAtual.periodContributions) +
      Number(dataAtual.receivables) -
      ((Number(dataAtual.downPayment) || 0) +
        (Number(dataAtual.homePurchases) || 0) +
        (Number(dataAtual.otherDeductions) || 0))

    dataCopy[i + 1].totoalReserveLastYear = String(total)
  }
  return dataCopy
}

const YearRow = ({
  item,
  currentYear,
  isExpanded,
  isEditing,
  setExpandedYear,
  startEditing,
  cancelEditing,
  handleSave
}: any) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      investments: formatToCustomFormat(Number(item.investments)),
      reserve: currentAndPreviousYearValidity(item.year)
        ? formatToCustomFormat(Number(item.reserve))
        : formatToCustomFormat(Number(item.totoalReserveLastYear)),
      monthlyContributions: formatToCustomFormat(
        Number(item.monthlyContributions)
      ),
      periodContributions: String(item.periodContributions),
      receivables: formatToCustomFormat(Number(item.receivables)),
      downPayment: formatToCustomFormat(Number(item.downPayment || 0)),
      homePurchases: formatToCustomFormat(Number(item.homePurchases || 0)),
      otherDeductions: formatToCustomFormat(Number(item.otherDeductions || 0))
    },
    resolver: zodResolver(schemaContributions)
  })

  const yearContributions =
    Number(item.periodContributions) * Number(item.monthlyContributions)
  const reserveAmount = currentAndPreviousYearValidity(item.year)
    ? item.reserve
    : item.totoalReserveLastYear
  const totalAnnualAmount =
    Number(item.investments) +
    Number(reserveAmount) +
    yearContributions +
    Number(item.receivables) -
    (Number(item.downPayment) || 0) -
    (Number(item.homePurchases) || 0) -
    (Number(item.otherDeductions) || 0)

  return (
    <div className="border-b border-gray-800 last:border-0">
      <div
        className={`px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-800/20 ${isExpanded ? 'bg-gray-700' : ''}`}
        onClick={() =>
          !isEditing && setExpandedYear(isExpanded ? null : parseInt(item.year))
        }
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-lg font-black ${parseInt(item.year) === currentYear ? 'text-white' : 'text-gray-400'}`}
          >
            {item.year}
          </span>
          <div className="flex gap-3 text-[10px] font-bold text-gray-400 uppercase">
            <span>
              Aporte:{' '}
              {formatCurrencyMoney(
                Number(item.monthlyContributions),
                'EUR',
                isVisibilityData
              )}
            </span>
            <span className="text-green-500/70">
              Total Anual:{' '}
              {formatCurrencyMoney(
                Number(totalAnnualAmount),
                'EUR',
                isVisibilityData
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                startEditing(item.id)
              }}
              className="p-1.5 hover:bg-blue-500/20 rounded text-blue-400"
            >
              <Edit2 size={14} />
            </button>
          )}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-gray-700">
          {isEditing ? (
            <form
              onSubmit={handleSubmit((values) => handleSave(item.id, values))}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/30 p-4 rounded border border-blue-500/30"
            >
              <InputTypeMoney
                control={control}
                name="investments"
                label="Investimentos"
                errors={errors.investments?.message}
              />
              <InputTypeMoney
                control={control}
                name="reserve"
                label="Reserva"
                errors={errors.reserve?.message}
              />
              <InputTypeMoney
                control={control}
                name="monthlyContributions"
                label="Aporte Mensal"
                errors={errors.monthlyContributions?.message}
              />
              <NumberInput
                register={register}
                name="periodContributions"
                label="Meses"
                type="number"
                errors={errors.periodContributions?.message}
              />
              <InputTypeMoney
                control={control}
                name="receivables"
                label="Aporte Extra"
                errors={errors.receivables?.message}
              />
              <InputTypeMoney
                control={control}
                name="downPayment"
                label="Entrada Imóvel"
                errors={errors.downPayment?.message}
              />
              <InputTypeMoney
                control={control}
                name="homePurchases"
                label="Compras Casa"
                errors={errors.homePurchases?.message}
              />
              <InputTypeMoney
                control={control}
                name="otherDeductions"
                label="Deduções"
                errors={errors.otherDeductions?.message}
              />

              <div className="col-span-2 md:col-span-4 flex justify-end gap-2 mt-2 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="flex items-center gap-1 px-3 py-1 text-[10px] font-black uppercase bg-gray-800 rounded"
                >
                  <X size={12} /> Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-3 py-1 text-[10px] font-black uppercase bg-blue-600 rounded"
                >
                  <Save size={12} /> Salvar
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-2">
              {[
                { label: 'Investimentos', val: item.investments },
                { label: 'Reserva', val: reserveAmount },
                {
                  label: 'Contrib Mensal',
                  val: item.monthlyContributions,
                  color: 'text-orange-400'
                },
                {
                  label: 'Período',
                  val: `${item.periodContributions} Meses`,
                  raw: true
                },
                { label: 'Recebíveis', val: item.receivables },
                {
                  label: 'Deduções Totais',
                  val:
                    (Number(item.downPayment) || 0) +
                    (Number(item.homePurchases) || 0) +
                    (Number(item.otherDeductions) || 0),
                  color: 'text-red-400'
                },
                {
                  label: 'Total Anual',
                  val: totalAnnualAmount,
                  color: 'text-green-400'
                }
              ].map((obj, idx) => (
                <div key={idx} className="border-l border-gray-800 pl-3">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5">
                    {obj.label}
                  </p>
                  <p
                    className={`text-xs font-bold ${obj.color || 'text-gray-200'}`}
                  >
                    {obj.raw
                      ? obj.val
                      : formatCurrencyMoney(
                          Number(obj.val),
                          'EUR',
                          isVisibilityData
                        )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const CardToFinanceYaer = ({
  data,
  currentYear,
  showFullHistory,
  setShowFullHistory,
  expandedYear,
  setExpandedYear,
  editingId,
  startEditing,
  cancelEditing,
  handleSave
}: any) => {
  const processedData = useMemo(() => calcTotalsLaterYear(data), [data])

  return (
    <div className="bg-gray-700 rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-700 flex justify-between items-center">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
          Planeamento Financeiro
        </h3>
        <button
          onClick={() => setShowFullHistory(!showFullHistory)}
          className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300"
        >
          {showFullHistory ? 'Recolher Histórico' : 'Ver todos (2024-2030)'}
        </button>
      </div>

      {processedData
        .filter(
          (item: any) => showFullHistory || parseInt(item.year) === currentYear
        )
        .map((item: any) => (
          <YearRow
            key={item.id}
            item={item}
            currentYear={currentYear}
            isExpanded={expandedYear === parseInt(item.year)}
            isEditing={editingId === item.id}
            setExpandedYear={setExpandedYear}
            startEditing={startEditing}
            cancelEditing={cancelEditing}
            handleSave={handleSave}
          />
        ))}
    </div>
  )
}
export default CardToFinanceYaer
