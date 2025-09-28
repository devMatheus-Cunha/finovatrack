import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { IItem, IFormData } from '../types'
import { toast } from 'react-toastify'
import { addShoppingItem, editShoppingItem } from '@/services/shopping/item'
import { fetchShoppingItems } from '@/services/shopping/fetch'
import { deleteShoppingItem } from '@/services/shopping/delete'
import useUserId from '@/hooks/globalStates/useUserId'

export function useShoppingItems(filters?: any) {
  const queryClient = useQueryClient()
  const { userId } = useUserId()

  const fetchItems = async (): Promise<IItem[]> => {
    if (!userId) return []
    return await fetchShoppingItems(userId, filters)
  }

  const {
    data: items = [],
    isLoading,
    error
  } = useQuery<IItem[], Error>({
    queryKey: ['shoppingItems', filters, userId],
    queryFn: fetchItems,
    enabled: !!userId,
    placeholderData: (previous) => previous
  })

  const addItemMutation = useMutation<IItem, Error, IFormData>({
    mutationFn: async (newItemData: IFormData) => {
      if (!userId) throw new Error('Usuário não autenticado')
      return await addShoppingItem(userId, newItemData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] })
      toast.success('Item adicionado com sucesso!')
    },
    onError: (err) => {
      toast.error(`Erro ao adicionar item: ${err.message}`)
    }
  })

  const editItemMutation = useMutation<
    IItem,
    Error,
    { id: string; data: IFormData }
  >({
    mutationFn: async ({ id, data }) => {
      if (!userId) throw new Error('Usuário não autenticado')
      return await editShoppingItem(userId, id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] })
      toast.success('Item atualizado com sucesso!')
    },
    onError: (err) => {
      toast.error(`Erro ao atualizar item: ${err.message}`)
    }
  })

  const deleteItemMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      if (!userId) throw new Error('Usuário não autenticado')
      console.log('Deleting item with id:', id)
      await deleteShoppingItem(userId, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] })
      toast.success('Item deletado com sucesso!')
    },
    onError: (err) => {
      toast.error(`Erro ao deletar item: ${err.message}`)
    }
  })

  return {
    items,
    isLoading,
    error,
    addItem: addItemMutation.mutate,
    editItem: editItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    isAddingItem: addItemMutation.isPending,
    isEditingItem: editItemMutation.isPending,
    isDeletingItem: deleteItemMutation.isPending
  }
}
