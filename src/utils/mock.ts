import { ShoppingItemType } from '@/app/(app)/market/page'

export const DEFAULT_SHOPPING_LIST: Omit<ShoppingItemType, 'id' | 'bought'>[] =
  [
    // Mercearia e Despensa
    {
      name: 'Café em Grão (Mercadona)',
      category: 'Mercearia e Despensa',
      measure: '2 kg (2x1kg)',
      store: 'Mercadona',
      currentPrice: 9.25,
      lastPrice: 0
    },
    {
      name: 'Arroz Agulha',
      category: 'Mercearia e Despensa',
      measure: '2 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Massa Esparguete',
      category: 'Mercearia e Despensa',
      measure: '1 kg (2x500g)',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Massa Penne',
      category: 'Mercearia e Despensa',
      measure: '500 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Feijão Grão Seco',
      category: 'Mercearia e Despensa',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Farinha de Trigo',
      category: 'Mercearia e Despensa',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Açúcar Branco',
      category: 'Mercearia e Despensa',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Sal Grosso',
      category: 'Mercearia e Despensa',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Sal Fino',
      category: 'Mercearia e Despensa',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Pimenta Preta',
      category: 'Mercearia e Despensa',
      measure: '1 frasco',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Páprica',
      category: 'Mercearia e Despensa',
      measure: '1 frasco',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Oregãos',
      category: 'Mercearia e Despensa',
      measure: '1 frasco',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Óleo Vegetal',
      category: 'Mercearia e Despensa',
      measure: '1 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Azeite',
      category: 'Mercearia e Despensa',
      measure: '750 ml',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Ketchup',
      category: 'Mercearia e Despensa',
      measure: '500 ml',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Batata Palha',
      category: 'Mercearia e Despensa',
      measure: '400 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Farofa Pronta',
      category: 'Mercearia e Despensa',
      measure: '500 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Saco de Batata Frita',
      category: 'Mercearia e Despensa',
      measure: '1 unidade',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },

    // Laticínios e Cozinha
    {
      name: 'Leite Meio Gordo',
      category: 'Laticínios e Cozinha',
      measure: '12 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Iogurte Natural',
      category: 'Laticínios e Cozinha',
      measure: 'pack 8',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Creme de Leite (Natas)',
      category: 'Laticínios e Cozinha',
      measure: '2x 200 ml',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Leite Condensado',
      category: 'Laticínios e Cozinha',
      measure: '370 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Molho de Tomate',
      category: 'Laticínios e Cozinha',
      measure: '2x 200 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },

    // Congelados
    {
      name: 'Morangos Congelados',
      category: 'Congelados',
      measure: '1 embalagem',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },

    // Limpeza e Higiene
    {
      name: 'Detergente de Roupa Líquido',
      category: 'Limpeza e Higiene',
      measure: '3 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Amaciador de Roupa',
      category: 'Limpeza e Higiene',
      measure: '2 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Detergente de Loiça Manual',
      category: 'Limpeza e Higiene',
      measure: '1 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Spray de Limpeza Multi-usos',
      category: 'Limpeza e Higiene',
      measure: '750 ml',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Limpador de Chão',
      category: 'Limpeza e Higiene',
      measure: '1 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Papel Higiénico',
      category: 'Limpeza e Higiene',
      measure: 'pack 12 rolos',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Gel de Banho',
      category: 'Limpeza e Higiene',
      measure: '1 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Champô',
      category: 'Limpeza e Higiene',
      measure: '400 ml',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Pasta de Dentes',
      category: 'Limpeza e Higiene',
      measure: '2x 75 ml',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Desodorizante',
      category: 'Limpeza e Higiene',
      measure: '1 unidade',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Sacos do Lixo',
      category: 'Limpeza e Higiene',
      measure: 'rolo 30 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Esponjas de Cozinha',
      category: 'Limpeza e Higiene',
      measure: 'pack 3',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },

    // Talho e Frescos
    {
      name: 'Peito de Frango',
      category: 'Talho e Frescos',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Carne Picada de Vaca',
      category: 'Talho e Frescos',
      measure: '500 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Fiambre de Peru Fatiado',
      category: 'Talho e Frescos',
      measure: '200 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Queijo Flamengo Fatiado',
      category: 'Talho e Frescos',
      measure: '200 g',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Ovos Classe L',
      category: 'Talho e Frescos',
      measure: '2x 10 unidades',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },

    // Hortofrutícolas
    {
      name: 'Batata para Cozer',
      category: 'Hortofrutícolas',
      measure: '2 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Cenouras',
      category: 'Hortofrutícolas',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Cebolas',
      category: 'Hortofrutícolas',
      measure: '1 kg',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },
    {
      name: 'Alhos',
      category: 'Hortofrutícolas',
      measure: '3 unidades',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    },

    // Bebidas
    {
      name: 'Água Mineral',
      category: 'Bebidas',
      measure: '6x 6 L',
      store: '',
      currentPrice: 0,
      lastPrice: 0
    }
  ]
