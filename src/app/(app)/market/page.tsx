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
  Wallet
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

    return total
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

  const totals = useMemo<Totals>(() => {
    const estimated = marketItems.reduce(
      (acc, item) =>
        acc + Number(item.currentPrice) * (Number(item.quantity) || 1),
      0
    )
    const boughtTotal = marketItems
      .filter((i) => i.bought)
      .reduce(
        (acc, item) =>
          acc + Number(item.currentPrice) * (Number(item.quantity) || 1),
        0
      )
    const remaining = marketBudget - estimated
    return { estimated, boughtTotal, remaining }
  }, [marketItems, marketBudget])

  const sortedItems = useMemo(() => {
    let filtered = [...marketItems]
    if (filterCategory !== 'Todos') {
      filtered = filtered.filter((item) => item.category === filterCategory)
    }
    return filtered.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )
  }, [marketItems, filterCategory])

  const toggleBought = useCallback(
    async (id: string) => {
      const item = marketItems.find((i) => i.id === id)
      if (!item) return

      setMutationState(id, 'update')
      try {
        await updateMarketItem({ ...item, bought: !item.bought })
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
    const lastPriceOnSave = isEdit
      ? (editingItem?.currentPrice ?? currentPrice)
      : currentPrice

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
          lastPrice: String(lastPriceOnSave),
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

  const clearAllBought = useCallback(async () => {
    setMutationState(BULK_MUTATION_ID, 'update')
    try {
      const toClear = marketItems.filter((item) => item.bought)
      for (const item of toClear) {
        await updateMarketItem({ ...item, bought: false })
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
        modifier: (_value, item: ShoppingItemType) => {
          const isMutating = mutatingItemId === item.id
          return (
            <div className="flex items-center gap-3 text-left">
              <button
                onClick={() => toggleBought(item.id)}
                className="text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isMutating}
              >
                {isMutating && mutatingAction === 'update' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : item.bought ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <Circle size={20} />
                )}
              </button>
              <span
                className={`font-medium ${item.bought ? 'line-through opacity-50' : ''}`}
              >
                {item.name}
              </span>
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
        header: 'Medida',
        field: 'measure',
        modifier: (value: string) => value || '-'
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
        header: 'Último',
        field: 'lastPrice',
        modifier: (value: number) => (
          <span className="font-mono text-gray-400">
            {formatCurrencyMoney(value, 'EUR')}
          </span>
        ),
        styles: () => ({ textAlign: 'right' })
      },
      {
        header: 'Total',
        field: 'id',
        modifier: (_value, item: ShoppingItemType) => (
          <span className="font-bold text-blue-400">
            {formatCurrencyMoney(
              Number(item.currentPrice) * (Number(item.quantity) || 1),
              'EUR'
            )}
          </span>
        ),
        styles: () => ({ textAlign: 'right' })
      },
      {
        header: 'Loja',
        field: 'store',
        modifier: (value: string) => value || '-'
      },
      { header: 'Categoria', field: 'category' },
      {
        header: 'Ação',
        field: 'id',
        modifier: (_value, item: ShoppingItemType) => {
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
  }, [mutatingItemId, mutatingAction, toggleBought, deleteItem, handleEdit])

  return (
    <div className="p-4">
      <div className="mx-auto space-y-4">
        {/* Estrutura de Resumo Financeiro */}
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

        {/* Estrutura de Controles de Ação e Filtro */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-end">
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 md:flex-none"
            >
              <Plus size={18} className="md:mr-2" />
              <span className="hidden md:inline">Adicionar Item</span>
            </Button>
            <Button
              variant="default"
              onClick={clearAllBought}
              className="flex-1 md:flex-none"
              isLoading={
                mutatingItemId === BULK_MUTATION_ID &&
                mutatingAction === 'update'
              }
            >
              <CheckCircle2 size={18} className="md:mr-2" />
              <span className="hidden md:inline">Desmarcar tudo</span>
            </Button>
          </div>

          <div className="w-full md:w-64">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white h-10"
            >
              <option value="Todos">Todas as Categorias</option>
              {MARKET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
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
        store: ''
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
            store: ''
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
            errors={formState.errors.name?.message}
            className={inputClass}
          />

          <div className="flex flex-col gap-1">
            <label className="text-gray-300 font-medium">Categoria</label>
            <select
              {...register('category', { required: 'Selecione uma categoria' })}
              className={`${inputClass} w-full h-11 bg-transparent text-white`}
            >
              <option value="">Selecione uma categoria</option>
              {MARKET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formState.errors.category && (
              <span className="text-red-400 text-xs mt-1">
                {formState.errors.category.message}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <Input
              label="Medida"
              name="measure"
              register={register}
              className={inputClass}
              placeholder="Ex: 1kg, 500g"
            />
            <Input
              label="Quantidade"
              name="quantity"
              type="number"
              register={register}
              required
              errors={formState.errors.quantity?.message}
              className={inputClass}
            />
          </div>

          <div className="flex gap-3">
            <InputTypeMoney
              control={control}
              name="currentPrice"
              required
              label="Preço Atual"
              errors={formState.errors.currentPrice?.message}
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
          <Input
            label="Loja"
            name="store"
            register={register}
            className={inputClass}
          />
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
