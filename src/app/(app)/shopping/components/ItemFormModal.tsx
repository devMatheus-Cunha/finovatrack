// components/ItemFormModal.tsx (Modal de Formulário de Item)

import React, { useEffect } from 'react'
import {
  XCircle,
  Edit,
  PlusCircle,
  Eye,
  Info,
  Home,
  Tag,
  Flag,
  Package,
  DollarSign,
  CheckCircle,
  CircleDashed,
  LinkIcon,
  Search,
  Trash2,
  Loader2
} from 'lucide-react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { IItem, IFormData, ILink } from '../types'
import { PRIORITY_OPTIONS, ROOM_OPTIONS, CATEGORY_OPTIONS } from '../constants'
import { getDomainName, getPriorityTextColorClass } from '../utils/helpers'
import { CustomCheckbox } from './CustomCheckbox'
import { useUserData, useIsVisibilityDatas } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { toast } from 'react-toastify'
import { Button } from '@/components'

interface ItemFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: IFormData) => void
  initialData: IItem | null
  mode: 'view' | 'edit'
  onEditClick: () => void
  onViewPriceHistory: (link: ILink, itemName: string) => void
  onDelete?: () => void
  isDeleting?: boolean
}

export const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  onEditClick,
  onViewPriceHistory,
  onDelete,
  isDeleting
}) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
      room: '',
      category: '',
      quantity: 1,
      price: 0,
      bought: false,
      earlyPurchase: false,
      links: [],
      productInfo: '',
      priority: ''
    }
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.properties.Nome.title[0]?.plain_text || '',
        room: initialData.properties.Comodo.select.name || '',
        category: initialData.properties.Categoria.select.name || '',
        quantity: initialData.properties.Quantidade?.number || 1,
        price: initialData.properties.Preco?.number || 0,
        bought: initialData.properties.Comprado?.checkbox || false,
        // earlyPurchase pode estar presente diretamente em properties (normalizado) ou no documento plano
        earlyPurchase: (initialData.properties as any).earlyPurchase ?? false,
        links: initialData.properties.links || [],
        productInfo: initialData.properties.productInfo || '',
        priority: initialData.properties.priority || ''
      })
    } else {
      reset({
        name: '',
        room: '',
        category: '',
        quantity: 1,
        price: 0,
        bought: false,
        links: [],
        productInfo: '',
        priority: ''
      })
    }
  }, [initialData, isOpen, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links'
  })

  const [loadingIndex, setLoadingIndex] = React.useState<number | null>(null)

  const onSubmitForm = (data: IFormData) => {
    onSubmit(data)
    onClose()
  }

  // Valor total estimado do item (PrecoEstimado * Quantidade)
  const totalItemEstimatedPriceDisplay =
    watch('price') * (watch('quantity') || 1)

  // Função para simular a busca de preço
  const handleFetchPriceFromLink = async (index: number) => {
    const url = getValues(`links.${index}.url`)
    if (!url || typeof url !== 'string' || url.trim() === '') {
      toast.error('Por favor, insira uma URL válida para buscar o preço.')
      return
    }
    setLoadingIndex(index)
    const API_ROUTE_ENDPOINT = '/api/scrape-price'
    try {
      const response = await fetch(
        `${API_ROUTE_ENDPOINT}?url=${encodeURIComponent(url)}`
      )
      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(
          data.message || 'Erro desconhecido ao buscar preço da API.'
        )
      }
      const fetchedPrice = data.price
      const fetchedStoreName = data.storeName

      await new Promise((resolve) => setTimeout(resolve, 800))

      setValue(`links.${index}.price`, fetchedPrice)
      if (fetchedStoreName && fetchedStoreName.length > 0) {
        setValue(`links.${index}.text`, fetchedStoreName)
      }

      toast.success('Dados do link buscados com sucesso!')
    } catch (error: any) {
      toast.error(
        'Erro ao buscar dados do link. Verifique a URL e tente novamente.'
      )
      setValue(`links.${index}.price`, 0)
    } finally {
      setLoadingIndex(null)
    }
  }

  const watchedLinks = watch('links')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800/50 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-md relative text-gray-100 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <XCircle className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center">
          {mode === 'edit' ? (
            initialData ? (
              <Edit className="w-5 h-5 text-blue-400 mr-2" />
            ) : (
              <PlusCircle className="w-5 h-5 text-blue-400 mr-2" />
            )
          ) : (
            <Eye className="w-5 h-5 text-blue-400 mr-2" />
          )}
          {mode === 'edit'
            ? initialData
              ? 'Editar Item'
              : 'Adicionar Novo Item'
            : 'Detalhes do Item'}
        </h2>

        {mode === 'view' ? (
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-50">
              {initialData?.properties.Nome.title[0]?.plain_text}
            </p>
            {initialData?.properties.productInfo && (
              <p className="text-sm text-gray-300 flex items-start">
                <Info className="inline-block w-4 h-4 mr-1 text-gray-400 flex-shrink-0 mt-1" />
                Informação:{' '}
                <span className="font-medium ml-1">
                  {initialData.properties.productInfo}
                </span>
              </p>
            )}
            <p className="text-sm text-gray-300">
              <Home className="inline-block w-4 h-4 mr-1 text-gray-400" />
              Cômodo:{' '}
              <span className="font-medium">
                {initialData?.properties.Comodo.select.name}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              <Tag className="inline-block w-4 h-4 mr-1 text-gray-400" />
              Categoria:{' '}
              <span className="font-medium">
                {initialData?.properties.Categoria.select.name}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              <Flag className="inline-block w-4 h-4 mr-1 text-gray-400" />
              Prioridade:{' '}
              <span
                className={`font-medium ${getPriorityTextColorClass(initialData?.properties.priority)}`}
              >
                {initialData?.properties.priority}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              <Package className="inline-block w-4 h-4 mr-1 text-gray-400" />
              Quantidade:{' '}
              <span className="font-medium">
                {initialData?.properties.Quantidade?.number || 1}
              </span>
            </p>{' '}
            <p className="text-sm text-gray-300">
              <DollarSign className="inline-block w-4 h-4 mr-1 text-gray-400" />
              Valor:{' '}
              <span className="font-medium">
                {formatCurrencyMoney(
                  initialData?.properties.Preco?.number || 0,
                  userData?.primary_currency,
                  isVisibilityData
                )}
              </span>
            </p>
            {(initialData?.properties?.Quantidade?.number ?? 0) > 1 && (
              <p className="text-sm text-gray-300">
                <DollarSign className="inline-block w-4 h-4 mr-1 text-gray-400" />
                Valor Total (Qtde):{' '}
                <span className="font-medium">
                  {formatCurrencyMoney(
                    totalItemEstimatedPriceDisplay,
                    userData?.primary_currency,
                    isVisibilityData
                  )}
                </span>
              </p>
            )}
            <p className="text-sm text-gray-300 flex items-center">
              {initialData?.properties.Comprado.checkbox ? (
                <>
                  <CheckCircle className="inline-block w-4 h-4 mr-1 text-green-400" />
                  <span className="text-green-500 font-medium">Comprado</span>
                </>
              ) : initialData?.properties.earlyPurchase ? (
                <>
                  <Flag className="inline-block w-4 h-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">
                    Compra Antecipada
                  </span>
                </>
              ) : (
                <>
                  <CircleDashed className="inline-block w-4 h-4 mr-1 text-yellow-400" />
                  <span className="text-yellow-500 font-medium">
                    Não Comprado
                  </span>
                </>
              )}
            </p>
            <div className="pt-4 border-t border-gray-600">
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2 m-0 p-0">
                  <LinkIcon className="w-5 h-5" />
                  Links de Compra
                </h3>
              </div>
              {initialData?.properties.links &&
              initialData.properties.links.length > 0 ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1"
                  style={{ minHeight: '0' }}
                >
                  {initialData.properties.links.map((link, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 p-2 rounded-md flex flex-col relative"
                    >
                      {/* Eye icon for price history */}
                      {link.historicoPrecos &&
                        link.historicoPrecos.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              onViewPriceHistory(
                                link,
                                initialData.properties.Nome.title[0]
                                  ?.plain_text || 'Item'
                              )
                            }
                            className="absolute top-2 right-2 text-blue-400 hover:text-blue-300"
                            title="Visualizar histórico de preços"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline text-base font-medium break-words mt-2"
                        title={link.url}
                      >
                        {link.text ||
                          getDomainName(link.url) ||
                          `Link ${index + 1}`}
                      </a>
                      {link.price !== undefined && (
                        <p className="text-xs text-gray-400 flex items-center mt-2">
                          Valor:{' '}
                          {formatCurrencyMoney(
                            link.price,
                            userData?.primary_currency,
                            isVisibilityData
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  Nenhum link de compra disponível.
                </p>
              )}
            </div>
            <button
              onClick={onEditClick}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out flex items-center justify-center mt-6"
            >
              <Edit className="w-5 h-5 mr-2" />
              Editar Item
            </button>
          </div>
        ) : (
          // Modo de Edição/Adição
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Nome do Item
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="mt-1 block w-full border-gray-600 bg-gray-800/50 text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                required
              />
              {errors.name && (
                <span className="text-red-400 text-xs mt-1">
                  Nome é obrigatório
                </span>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="productInfo"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Informações do Produto
              </label>
              <textarea
                id="productInfo"
                {...register('productInfo')}
                rows={3}
                className="mt-1 block w-full border-gray-600 bg-gray-800/50 text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Ex: Cor, modelo, especificações..."
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="room"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Cômodo
              </label>
              <select
                id="room"
                {...register('room', { required: true })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                required
              >
                <option value="">Selecione um cômodo</option>
                {ROOM_OPTIONS.map((room) => (
                  <option key={room.value} value={room.value}>
                    {room.label}
                  </option>
                ))}
              </select>
              {errors.room && (
                <span className="text-red-400 text-xs mt-1">
                  Cômodo é obrigatório
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Categoria
              </label>
              <select
                id="category"
                {...register('category', { required: true })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                required
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-400 text-xs mt-1">
                  Categoria é obrigatória
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Prioridade
              </label>
              <select
                id="priority"
                {...register('priority', { required: true })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                required
              >
                <option value="">Selecione a prioridade</option>
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <span className="text-red-400 text-xs mt-1">
                  Prioridade é obrigatória
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Quantidade
              </label>
              <input
                type="number"
                id="quantity"
                {...register('quantity', {
                  required: true,
                  min: 1,
                  valueAsNumber: true
                })}
                className="mt-1 block w-full border-gray-600 bg-gray-800/50 text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                min="1"
                required
              />
              {errors.quantity && (
                <span className="text-red-400 text-xs mt-1">
                  Quantidade é obrigatória e deve ser no mínimo 1
                </span>
              )}
            </div>
            <div>
              {' '}
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Valor
              </label>
              <input
                type="number"
                id="price"
                {...register('price', {
                  required: true,
                  min: 0,
                  valueAsNumber: true
                })}
                className="mt-1 block w-full border-gray-600 bg-gray-800/50 text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                step="0.01"
              />
              {errors.price && (
                <span className="text-red-400 text-xs mt-1">
                  Valor estimado é obrigatório e deve ser no mínimo 0
                </span>
              )}
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <Controller
                name="bought"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    id="bought"
                    checked={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(e.target.checked)
                    }
                    label="Item Comprado"
                  />
                )}
              />
              <Controller
                name="earlyPurchase"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    id="earlyPurchase"
                    checked={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(e.target.checked)
                    }
                    label="Compra Antecipada"
                  />
                )}
              />
            </div>

            <div className="sm:col-span-2 pt-4 border-t border-gray-600">
              <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
                <LinkIcon className="w-5 h-5 mr-2" />
                Links de Compra
              </h3>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row gap-2 mb-3 p-2 bg-gray-800/50 rounded-md border border-gray-600"
                >
                  <div className="flex-1">
                    <label
                      htmlFor={`links.${index}.url`}
                      className="block text-xs font-medium text-gray-300"
                    >
                      URL do Link
                    </label>
                    <input
                      type="url"
                      id={`links.${index}.url`}
                      {...register(`links.${index}.url`, { required: true })}
                      className="mt-1 block w-full border-gray-600 bg-gray-800/50 text-gray-100 rounded-md shadow-sm sm:text-sm p-1"
                      placeholder="Ex: https://www.exemplo.com"
                    />
                    {errors?.links?.[index]?.url && (
                      <span className="text-red-400 text-xs mt-1">
                        URL é obrigatória
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor={`links.${index}.text`}
                      className="block text-xs font-medium text-gray-300"
                    >
                      Texto do Link
                    </label>
                    <input
                      type="text"
                      id={`links.${index}.text`}
                      {...register(`links.${index}.text`)}
                      className="mt-1 block w-full border-gray-600 bg-gray-800/50 text-gray-100 rounded-md shadow-sm sm:text-sm p-1"
                      placeholder="Ex: Link Loja X"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor={`links.${index}.price`}
                      className="block text-xs font-medium text-gray-300"
                    >
                      Valor Real
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        id={`links.${index}.price`}
                        {...register(`links.${index}.price`, {
                          valueAsNumber: true,
                          min: 0
                        })}
                        className="mt-1 block w-full border-gray-600 bg-gray-800/50 text-gray-100 rounded-md shadow-sm sm:text-sm p-1"
                        placeholder="Valor deste link"
                        step="0.01"
                      />
                      <button
                        type="button"
                        onClick={() => handleFetchPriceFromLink(index)}
                        className={`mt-1 p-1 rounded-md transition duration-150 ease-in-out flex items-center justify-center
    ${
      loadingIndex === index
        ? 'bg-blue-700 text-blue-200' // loading: visual normal
        : !watchedLinks?.[index]?.url
          ? 'bg-blue-300 text-blue-100 cursor-not-allowed opacity-60' // disabled visual
          : 'bg-blue-700 text-blue-200 hover:bg-blue-600'
    }`}
                        title="Buscar Valor Automático"
                        disabled={
                          loadingIndex === index || !watchedLinks?.[index]?.url
                        }
                      >
                        {loadingIndex === index ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors?.links?.[index]?.price && (
                      <span className="text-red-400 text-xs mt-1">
                        Valor real é obrigatório
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-auto p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out flex items-center justify-center sm:w-auto w-full"
                    title="Remover Link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  append({ text: '', url: '', price: 0, historicoPrecos: [] })
                }
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out flex items-center justify-center mt-2"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Adicionar Link
              </button>
            </div>
            <div className="flex sm:col-span-2 gap-2 w-full justify-center mt-2 pt-4 border-t border-gray-600">
              {initialData && onDelete && (
                <Button
                  type="button"
                  variant="delete"
                  onClick={onDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deletando...' : 'Deletar Item'}
                </Button>
              )}
              <Button type="submit" variant="confirm">
                Salvar Alterações
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
