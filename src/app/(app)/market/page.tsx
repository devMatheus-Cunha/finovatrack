'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Circle,
  Loader2,
  Banknote,
  PiggyBank,
  Receipt,
  TrendingUp,
  Wallet,
  Save // Adicionado
} from 'lucide-react'
import {
  Button,
  Modal,
  Input,
  InfoCardMoney,
  InputTypeMoney
} from '@/components'
import ButtonGroup from '@/components/common/Buttons/ButtonGroup'
import Table, { TableColumn } from '@/components/common/Table'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useFetchExpensesData } from '@/hooks/expenses'
import { useFetchMarketItems } from '@/hooks/market/useFetchMarketItems'
import { useAddMarketItem } from '@/hooks/market/useAddMarketItem'
import { useUpdateMarketItem } from '@/hooks/market/useUpdateMarketItem'
import { useDeleteMarketItem } from '@/hooks/market/useDeleteMarketItem'
import {
  formatCurrencyMoney,
  formatToCustomFormat,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import useIsVisibilityDatas from '@/hooks/globalStates/useIsVisibilityDatas'
import { useSaveMarketHistory } from '@/hooks/market/useSaveMarketHistory'

const MARKET_CATEGORIES = [
  'Mercearia e Despensa',
  'Congelados',
  'Limpeza e Higiene',
  'Talho e Frescos',
  'Laticínios e Cozinha',
  'Hortofrutícolas',
  'Bebidas',
  'Padaria',
  'Frutaria e Legumes',
  'Suplementos e Saúde'
]

const PORTUGAL_STORES = [
  'Pingo Doce',
  'Continente',
  'Lidl',
  'Intermarché',
  'Mercadona',
  'Auchan',
  'Aldi',
  'Outro'
]

export interface ShoppingItemType {
  id: string
  name: string
  category: string
  measure?: string
  quantity: number
  lastPrice: string
  currentPrice: string
  store: string
  bought: boolean
  recurrence: 'monthly' | 'fortnightly' // Adicionado
  completedCycles: number // Adicionado
}

interface Totals {
  estimated: number
  boughtTotal: number
  remaining: number
}

export default function App() {
  const { marketItems, isLoading: isLoadingMarketItems } = useFetchMarketItems()
  const { addItem } = useAddMarketItem()
  const { updateItem: updateMarketItem } = useUpdateMarketItem()
  const { deleteItem: deleteMarketItem } = useDeleteMarketItem()
  const { isVisibilityData } = useIsVisibilityDatas()

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<ShoppingItemType | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('Todos')
  const [filterStore, setFilterStore] = useState<string>('Todos')
  const { saveHistory, isLoading: isSavingHistory } = useSaveMarketHistory()
  const { expensesData } = useFetchExpensesData()

  const marketBudget = useMemo(() => {
    const total = expensesData
      .filter(
        (expense) =>
          expense.category === 'Alimentação' &&
          expense.subcategory?.value === 'Supermercado'
      )
      .reduce(
        (acc, expense) => acc + Number(expense.value_primary_currency || 0),
        0
      )

    return total ? total : 320
  }, [expensesData])

  const [mutatingItemId, setMutatingItemId] = useState<string | undefined>(
    undefined
  )
  const [mutatingAction, setMutatingAction] = useState<
    'add' | 'update' | 'delete' | undefined
  >(undefined)

  const setMutationState = (
    id: string | undefined,
    action: 'add' | 'update' | 'delete' | undefined
  ) => {
    setMutatingItemId(id)
    setMutatingAction(action)
  }

  const sortedItems = useMemo(() => {
    let filtered = [...marketItems]
    if (filterCategory !== 'Todos') {
      filtered = filtered.filter((item) => item.category === filterCategory)
    }
    if (filterStore !== 'Todos') {
      filtered = filtered.filter((item) => item.store === filterStore)
    }
    return filtered.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )
  }, [marketItems, filterCategory, filterStore])

  const totals = useMemo<Totals>(() => {
    const estimated = sortedItems.reduce((acc, item) => {
      const mult = item.recurrence === 'fortnightly' ? 2 : 1
      return (
        acc + Number(item.currentPrice) * (Number(item.quantity) || 1) * mult
      )
    }, 0)

    const boughtTotal = sortedItems.reduce((acc, item) => {
      return (
        acc +
        Number(item.currentPrice) *
          (Number(item.quantity) || 1) *
          (item.completedCycles || 0)
      )
    }, 0)

    const remaining = marketBudget - estimated
    return { estimated, boughtTotal, remaining }
  }, [sortedItems, marketBudget])

  const toggleCycle = useCallback(
    async (id: string) => {
      const item = marketItems.find((i) => i.id === id)
      if (!item) return

      const maxCycles = item.recurrence === 'fortnightly' ? 2 : 1
      let nextCycles = (item.completedCycles || 0) + 1
      if (nextCycles > maxCycles) nextCycles = 0

      setMutationState(id, 'update')
      try {
        await updateMarketItem({
          ...item,
          completedCycles: nextCycles,
          bought: nextCycles === maxCycles && nextCycles > 0
        })
      } finally {
        setMutationState(undefined, undefined)
      }
    },
    [marketItems, updateMarketItem]
  )

  const deleteItem = useCallback(
    async (id: string) => {
      const item = marketItems.find((i) => i.id === id)
      if (!item) return

      setMutationState(id, 'delete')
      try {
        await deleteMarketItem(item)
      } finally {
        setMutationState(undefined, undefined)
      }
    },
    [marketItems, deleteMarketItem]
  )

  const saveItem = async (
    itemData: Omit<ShoppingItemType, 'id' | 'bought'>
  ) => {
    const isEdit = Boolean(editingItem)
    const currentPrice = Number(itemData.currentPrice)

    setMutationState(
      isEdit ? editingItem?.id : undefined,
      isEdit ? 'update' : 'add'
    )

    try {
      if (isEdit && editingItem) {
        await updateMarketItem({
          ...editingItem,
          ...itemData,
          lastPrice:
            Number(itemData.currentPrice) !== Number(editingItem.currentPrice)
              ? editingItem.currentPrice
              : editingItem.lastPrice,
          currentPrice: String(currentPrice),
          quantity: Number(itemData.quantity)
        })
        setEditingItem(null)
      } else {
        await addItem({
          ...itemData,
          bought: false,
          completedCycles: 0,
          lastPrice: String(currentPrice),
          currentPrice: String(currentPrice),
          quantity: Number(itemData.quantity)
        })
      }
    } finally {
      setMutationState(undefined, undefined)
      setIsAddModalOpen(false)
    }
  }

  const isSavingModal =
    mutatingAction === 'add' ||
    (mutatingAction === 'update' && Boolean(editingItem))

  const inputBase =
    'bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 outline-none text-gray-100 focus:ring-1 focus:ring-blue-500'

  const BULK_MUTATION_ID = 'bulk'

  const handleEdit = useCallback(
    (item: ShoppingItemType) => {
      setEditingItem(item)
      setIsAddModalOpen(true)
    },
    [setEditingItem, setIsAddModalOpen]
  )

  const handleSaveHistory = async () => {
    if (marketItems.length === 0) return

    await saveHistory({
      items: marketItems,
      totals: {
        budget: marketBudget,
        estimated: totals.estimated,
        boughtTotal: totals.boughtTotal,
        remaining: totals.remaining,
        status: totals.remaining < 0 ? 'OVER_BUDGET' : 'WITHIN_BUDGET'
      }
    })
  }

  const clearAllBought = useCallback(async () => {
    setMutationState(BULK_MUTATION_ID, 'update')
    try {
      const toClear = marketItems.filter((item) => item.completedCycles > 0)
      for (const item of toClear) {
        await updateMarketItem({ ...item, completedCycles: 0, bought: false })
      }
    } finally {
      setMutationState(undefined, undefined)
    }
  }, [marketItems, updateMarketItem])

  const tableColumns: TableColumn[] = useMemo(() => {
    return [
      {
        header: 'Item',
        field: 'name',
        modifier: (_value: string, item: ShoppingItemType) => {
          const isMutating = mutatingItemId === item.id
          const isPartiallyDone =
            item.completedCycles > 0 &&
            item.completedCycles < (item.recurrence === 'fortnightly' ? 2 : 1)
          return (
            <div className="flex items-center gap-3 text-left">
              <button
                onClick={() => toggleCycle(item.id)}
                className="text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isMutating}
              >
                {isMutating && mutatingAction === 'update' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : item.bought ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : isPartiallyDone ? (
                  <span className="w-5 h-5 rounded-full border-2 border-blue-500 text-[10px] flex items-center justify-center font-bold">
                    1
                  </span>
                ) : (
                  <Circle size={20} />
                )}
              </button>
              <div className="flex flex-col">
                <span
                  className={`font-medium ${item.bought ? 'line-through opacity-50' : ''}`}
                >
                  {item.name}
                </span>
                <span className="text-[9px] uppercase font-bold text-blue-400">
                  {item.recurrence === 'fortnightly' ? 'Quinzenal' : 'Mensal'}
                </span>
              </div>
            </div>
          )
        }
      },
      {
        header: 'Qtd',
        field: 'quantity',
        modifier: (value: number) => value || 1,
        styles: () => ({ textAlign: 'center' })
      },
      {
        header: 'Preço',
        field: 'currentPrice',
        modifier: (value: string) => (
          <span className="font-bold">
            {formatCurrencyMoney(Number(value), 'EUR')}
          </span>
        ),
        styles: () => ({ textAlign: 'right' })
      },
      {
        header: 'Total Mês',
        field: 'id',
        modifier: (_value: string, item: ShoppingItemType) => (
          <span className="font-bold text-blue-400">
            {formatCurrencyMoney(
              Number(item.currentPrice) *
                (Number(item.quantity) || 1) *
                (item.recurrence === 'fortnightly' ? 2 : 1),
              'EUR'
            )}
          </span>
        ),
        styles: () => ({ textAlign: 'right' })
      },
      {
        header: 'Mercado',
        field: 'store',
        modifier: (value: string) => value || '-'
      },
      { header: 'Categoria', field: 'category' },
      {
        header: 'Ação',
        field: 'id',
        modifier: (_value: string, item: ShoppingItemType) => {
          const isMutating = mutatingItemId === item.id
          return (
            <ButtonGroup
              buttonOptions={[
                {
                  onClick: isMutating ? undefined : () => handleEdit(item),
                  content:
                    isMutating && mutatingAction === 'update' ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Edit3 size={14} />
                    )
                },
                {
                  onClick: isMutating ? undefined : () => deleteItem(item.id),
                  content:
                    isMutating && mutatingAction === 'delete' ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )
                }
              ]}
            />
          )
        }
      }
    ]
  }, [mutatingItemId, mutatingAction, toggleCycle, deleteItem, handleEdit])

  return (
    <div className="p-4">
      <div className="mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCardMoney
            title="Orçamento"
            infoData={marketBudget}
            currency="EUR"
            icon={Wallet}
            iconColor="#6366f1"
            isVisibilityData={isVisibilityData}
          />
          <InfoCardMoney
            title="Estimado"
            infoData={totals.estimated}
            currency="EUR"
            icon={TrendingUp}
            iconColor="#a855f7"
            isVisibilityData={isVisibilityData}
          />
          <InfoCardMoney
            title="Comprado"
            infoData={totals.boughtTotal}
            currency="EUR"
            icon={Banknote}
            iconColor="#10b981"
            isVisibilityData={isVisibilityData}
          />
          <InfoCardMoney
            title="Saldo"
            infoData={totals.remaining}
            currency="EUR"
            icon={totals.remaining < 0 ? PiggyBank : Receipt}
            iconColor={totals.remaining < 0 ? '#f43f5e' : '#34d399'}
            isVisibilityData={isVisibilityData}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-col w-full md:w-fit md:flex-row gap-2">
            <Button
              variant="default"
              onClick={() => setIsAddModalOpen(true)}
              className="whitespace-nowrap"
            >
              <Plus size={18} className="mr-2" />
              <span>Adicionar Item</span>
            </Button>
            <Button
              variant="default"
              onClick={handleSaveHistory}
              isLoading={isSavingHistory}
              className="whitespace-nowrap bg-green-600 hover:bg-green-700"
            >
              <Save size={18} className="mr-2" />
              <span>Salvar Compra</span>
            </Button>
            <Button
              variant="default"
              onClick={clearAllBought}
              className="whitespace-nowrap"
              isLoading={
                mutatingItemId === BULK_MUTATION_ID &&
                mutatingAction === 'update'
              }
            >
              <CheckCircle2 size={18} className="mr-2" />
              <span>Desmarcar tudo</span>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white h-10 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todas as Categorias</option>
              {MARKET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={filterStore}
              onChange={(e) => setFilterStore(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white h-10 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos os Mercados</option>
              {PORTUGAL_STORES.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-700 h-[60vh] rounded-md overflow-hidden">
          {isLoadingMarketItems ? (
            <div className="flex items-center justify-center h-full gap-2 text-gray-100">
              <Loader2 className="animate-spin" />
              <span>Carregando itens...</span>
            </div>
          ) : (
            <div className="overflow-x-auto h-full">
              <Table
                columns={tableColumns}
                data={sortedItems}
                rowClassName={(row) => (row.bought ? 'opacity-40' : '')}
              />
            </div>
          )}
        </div>

        {isAddModalOpen && (
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false)
              setEditingItem(null)
            }}
            onSave={saveItem}
            editingItem={editingItem}
            inputClass={inputBase}
            isSaving={isSavingModal}
          />
        )}
      </div>
    </div>
  )
}

interface ModalProps {
  onClose: () => void
  onSave: (data: Omit<ShoppingItemType, 'id' | 'bought'>) => void
  editingItem: ShoppingItemType | null
  inputClass?: string
  isSaving?: boolean
}

function AddItemModal({
  isOpen,
  onClose,
  onSave,
  editingItem,
  inputClass,
  isSaving = false
}: ModalProps & { isOpen: boolean }) {
  type AddItemForm = Omit<ShoppingItemType, 'id' | 'bought'>
  const { register, handleSubmit, reset, formState, control } =
    useForm<AddItemForm>({
      defaultValues: editingItem || {
        name: '',
        category: '',
        measure: '',
        quantity: 1,
        lastPrice: '',
        currentPrice: '',
        store: '',
        recurrence: 'monthly'
      }
    })

  useEffect(() => {
    reset(
      editingItem
        ? {
            ...editingItem,
            lastPrice: formatToCustomFormat(Number(editingItem.lastPrice)),
            currentPrice: formatToCustomFormat(Number(editingItem.currentPrice))
          }
        : {
            name: '',
            category: '',
            measure: '',
            quantity: 1,
            lastPrice: '',
            currentPrice: '',
            store: '',
            recurrence: 'monthly'
          }
    )
  }, [editingItem, isOpen, reset])

  const onSubmit: SubmitHandler<AddItemForm> = (data) => {
    onSave({
      ...data,
      quantity: Number(data.quantity),
      lastPrice: String(formatToJavaScriptNumber(String(data.lastPrice))),
      currentPrice: String(formatToJavaScriptNumber(String(data.currentPrice)))
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingItem ? 'Editar Item' : 'Novo Item'}
      size="md"
      isCentered
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 text-sm">
          <Input
            label="Nome"
            name="name"
            placeholder="Nome do produto"
            register={register}
            required
            errors={formState.errors.name?.message as string}
            className={inputClass}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-300 font-medium text-xs">
                Frequência
              </label>
              <select
                {...register('recurrence', { required: true })}
                className={`${inputClass} w-full h-11 bg-transparent text-white`}
              >
                <option value="monthly">Mensal</option>
                <option value="fortnightly">Quinzenal</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-300 font-medium text-xs">
                Categoria
              </label>
              <select
                {...register('category', {
                  required: 'Selecione uma categoria'
                })}
                className={`${inputClass} w-full h-11 bg-transparent text-white`}
              >
                <option value="">Selecione...</option>
                {MARKET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Input
              label="Medida"
              name="measure"
              register={register}
              className={inputClass}
              placeholder="Ex: 1kg"
            />
            <Input
              label="Quantidade"
              name="quantity"
              type="number"
              register={register}
              required
              errors={formState.errors.quantity?.message as string}
              className={inputClass}
            />
          </div>

          <div className="flex gap-3">
            <InputTypeMoney
              control={control}
              name="currentPrice"
              required
              label="Preço Atual"
              errors={formState.errors.currentPrice?.message as string}
              className={inputClass}
            />
            <InputTypeMoney
              control={control}
              name="lastPrice"
              label="Último Preço"
              className={`${inputClass} opacity-60`}
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-300 font-medium">Mercado</label>
            <select
              {...register('store')}
              className={`${inputClass} w-full h-11 bg-transparent text-white`}
            >
              <option value="">Selecione uma mercado</option>
              {PORTUGAL_STORES.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="px-0 py-6 flex justify-end gap-3">
          <Button variant="cancel" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button type="submit" variant="confirm" isLoading={isSaving}>
            {editingItem ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
