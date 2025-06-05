// types.ts (Arquivo de Definições de Tipo)

export interface IPriceHistoryEntry {
 price: number
 date: string // Formato 'DD/MM/YYYY'
}

export interface ILink {
 text?: string
 url: string
 price?: number // Valor real associado a este link
 historicoPrecos?: IPriceHistoryEntry[] // Histórico de preços para este link
}

export interface IItemProperties {
 Nome: { title: [{ plain_text: string }] }
 Comodo: { select: { name: string } }
 Categoria: { select: { name: string } }
 Quantidade: { number: number }
 Preco: { number: number } // Valor estimado do item
 Comprado: { checkbox: boolean }
 links?: ILink[] // Links agora podem ter preço e histórico
 productInfo?: string
 priority?: string
}

export interface IItem {
 id: string
 properties: IItemProperties
}

export interface IFormData {
 name: string
 room: string
 category: string
 quantity: number
 price: number // Corresponde ao PrecoEstimado no formulário
 bought: boolean
 links: ILink[] // Links agora com preço
 productInfo: string
 priority: string
}
