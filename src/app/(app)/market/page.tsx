'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Circle,
  Sparkles,
  Loader2,
  Banknote,
  PiggyBank,
  Receipt,
  TrendingUp,
  Wallet
} from 'lucide-react'
import { Button, Card, Modal, Input, InfoCardMoney } from '@/components'
import ButtonGroup from '@/components/common/Buttons/ButtonGroup'
import Table, { TableColumn } from '@/components/common/Table'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useFetchExpensesData } from '@/hooks/expenses'
import { useFetchMarketItems } from '@/hooks/market/useFetchMarketItems'
import { useAddMarketItem } from '@/hooks/market/useAddMarketItem'
import { useUpdateMarketItem } from '@/hooks/market/useUpdateMarketItem'
import { useDeleteMarketItem } from '@/hooks/market/useDeleteMarketItem'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import useIsVisibilityDatas from '@/hooks/globalStates/useIsVisibilityDatas'
// import { DEFAULT_SHOPPING_LIST } from '@/utils/mock'

const MARKET_CATEGORIES = [
  'Mercearia e Despensa',
  'Congelados',
  'Limpeza e Higiene',
  'Talho e Frescos',
  'Laticínios e Cozinha',
  'Hortofrutícolas',
  'Bebidas',
  'Padaria',
  'Frutaria e Legumes'
]

export interface ShoppingItemType {
  id: string
  name: string
  category: string
  measure?: string
  lastPrice: number
  currentPrice: number
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

  // const fillDefaultList = useCallback(async () => {
  //   const existingNames = new Set(marketItems.map((i) => i.name.toLowerCase()))
  //   const toAdd = DEFAULT_SHOPPING_LIST.filter(
  //     (item) => !existingNames.has(item.name.toLowerCase())
  //   )
  //   if (toAdd.length === 0) return
  //   for (const item of toAdd) {
  //     await addItem({
  //       ...item,
  //       bought: false
  //     })
  //   }
  // }, [marketItems, addItem])

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

  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)

  const totals = useMemo<Totals>(() => {
    const estimated = marketItems.reduce(
      (acc, item) => acc + item.currentPrice,
      0
    )
    const boughtTotal = marketItems
      .filter((i) => i.bought)
      .reduce((acc, item) => acc + item.currentPrice, 0)
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
            currentPrice !== editingItem.currentPrice
              ? editingItem.currentPrice
              : editingItem.lastPrice,
          currentPrice
        })
        setEditingItem(null)
      } else {
        await addItem({
          ...itemData,
          bought: false,
          lastPrice: lastPriceOnSave,
          currentPrice
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
            <div className="flex items-center gap-3">
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
              <div className="flex flex-col">
                <span
                  className={`font-medium ${item.bought ? 'line-through opacity-50' : ''}`}
                >
                  {item.name}
                </span>
              </div>
            </div>
          )
        }
      },
      {
        header: 'Categoria',
        field: 'category'
      },
      {
        header: 'Medida',
        field: 'measure',
        modifier: (value: string) => value || '-'
      },
      {
        header: 'Preço',
        field: 'currentPrice',
        modifier: (_value, item: ShoppingItemType) => (
          <span className="font-bold">
            {formatCurrencyMoney(item.currentPrice, 'EUR')}
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
        header: 'Loja',
        field: 'store'
      },
      {
        header: 'Ação',
        field: 'id',
        modifier: (_value, item: ShoppingItemType) => {
          const isMutating = mutatingItemId === item.id
          const disabled = isMutating
          return (
            <ButtonGroup
              buttonOptions={[
                {
                  onClick: disabled ? undefined : () => handleEdit(item),
                  content:
                    isMutating && mutatingAction === 'update' ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Edit3 size={14} />
                    )
                },
                {
                  onClick: disabled ? undefined : () => deleteItem(item.id),
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

        <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-end">
          {/* Container de Botões de Ação */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Button
              variant="default"
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 md:flex-none justify-center"
            >
              <Plus size={18} className="md:mr-2" />
              <span className="hidden md:inline">Adicionar Item</span>
            </Button>
            <Button
              variant="default"
              onClick={clearAllBought}
              className="flex-1 md:flex-none justify-center"
              isLoading={
                mutatingItemId === BULK_MUTATION_ID &&
                mutatingAction === 'update'
              }
            >
              <CheckCircle2 size={18} className="md:mr-2" />
              <span className="hidden md:inline">Desmarcar tudo</span>
            </Button>

            {/* <Button
              variant="default"
              onClick={fillDefaultList}
              className="flex-1 md:flex-none justify-center"
            >
              <ListPlus size={18} className="md:mr-2" />
              <span className="hidden md:inline">Gerar Lista</span>
            </Button> */}
          </div>

          {/* Filtro de Categorias */}
          <div className="w-full md:w-64">
            <label className="block md:hidden text-[10px] uppercase text-gray-400 mb-1 ml-1 font-bold">
              Filtrar Categoria
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none h-10"
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

        {aiSuggestion && (
          <div className="bg-indigo-600/20 border border-indigo-500/30 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="text-indigo-400 shrink-0" />
              <p className="text-sm">
                Sugestão Gemini:{' '}
                <span className="font-semibold text-indigo-200">
                  {aiSuggestion}
                </span>
              </p>
            </div>
            <button
              onClick={() => setAiSuggestion(null)}
              className="text-indigo-400 hover:text-white font-bold px-2"
            >
              ✕
            </button>
          </div>
        )}

        <div className="lg:col-span-2 space-y-4">
          {isLoadingMarketItems ? (
            <Card className="flex items-center justify-center p-10">
              <div className="flex items-center gap-2 text-gray-100">
                <Loader2 className="animate-spin" />
                <span>Carregando itens...</span>
              </div>
            </Card>
          ) : (
            <div className="bg-gray-700 h-[60vh] rounded-md overflow-hidden w-full">
              <div className="overflow-x-auto h-full">
                <Table
                  columns={tableColumns}
                  data={sortedItems}
                  rowClassName={(row) => (row.bought ? 'opacity-40' : '')}
                />
              </div>
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

  const { register, handleSubmit, reset, formState } = useForm<AddItemForm>({
    defaultValues: editingItem
      ? {
          name: editingItem.name,
          category: editingItem.category || '',
          measure: editingItem.measure ?? '',
          lastPrice: editingItem.lastPrice,
          currentPrice: editingItem.currentPrice,
          store: editingItem.store
        }
      : {
          name: '',
          category: '',
          measure: '',
          lastPrice: 0,
          currentPrice: 0,
          store: ''
        }
  })

  useEffect(() => {
    reset(
      editingItem
        ? {
            name: editingItem.name,
            category: editingItem.category || '',
            measure: editingItem.measure ?? '',
            lastPrice: editingItem.lastPrice,
            currentPrice: editingItem.currentPrice,
            store: editingItem.store
          }
        : {
            name: '',
            category: '',
            measure: '',
            lastPrice: 0,
            currentPrice: 0,
            store: ''
          }
    )
  }, [editingItem, isOpen, reset])

  const onSubmit: SubmitHandler<AddItemForm> = (data) => {
    onSave({
      ...data,
      lastPrice: Number(data.lastPrice),
      currentPrice: Number(data.currentPrice)
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

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Medida"
              name="measure"
              register={register}
              required={false}
              errors={formState.errors.measure?.message}
              className={inputClass}
              placeholder="Ex: 1kg, 500g"
            />
            <Input
              label="Loja"
              name="store"
              register={register}
              required={false}
              errors={formState.errors.store?.message}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Preço Atual"
              name="currentPrice"
              type="number"
              register={register}
              required={false}
              errors={formState.errors.currentPrice?.message}
              className={inputClass}
            />
            <Input
              label="Último preço"
              name="lastPrice"
              type="number"
              register={register}
              disabled
              errors={formState.errors.lastPrice?.message}
              className={inputClass}
              placeholder="Automático"
            />
          </div>
        </div>
        <div className="px-0 py-6 flex justify-end gap-3">
          <Button variant="cancel" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="confirm"
            isLoading={isSaving}
            loadingText={editingItem ? 'Atualizando...' : 'Salvando...'}
          >
            {editingItem ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
