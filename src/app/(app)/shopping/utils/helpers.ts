// utils/helpers.ts (Funções Auxiliares)

export const getDomainName = (url: string): string => {
 try {
  const hostname = new URL(url).hostname
  let domain = hostname.startsWith('www.') ? hostname.substring(4) : hostname
  domain = domain.split('.')[0]
  return domain.charAt(0).toUpperCase() + domain.slice(1)
 } catch (e) {
  return url
 }
}

export const getPriorityTextColorClass = (priority: string | undefined): string => {
 switch (priority) {
  case 'Alto':
   return 'text-red-500'
  case 'Médio':
   return 'text-orange-400'
  case 'Baixo':
   return 'text-blue-400'
  default:
   return 'text-gray-400'
 }
}

// Função para obter a data atual formatada como DD/MM/YYYY
export const getFormattedTodayDate = (): string => {
 const today = new Date()
 const day = String(today.getDate()).padStart(2, '0')
 const month = String(today.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
 const year = today.getFullYear()
 return `${day}/${month}/${year}`
}
