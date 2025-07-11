interface CategoryWithSubcategories {
  label: string
  value: string
  disabled?: boolean
  selected?: boolean
  subcategories?: Array<{ label: string; value: string; category: string }>
}

export const categoryOptions: CategoryWithSubcategories[] = [
  {
    label: 'Moradia',
    value: 'Moradia',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Moradia' },
      { label: 'Aluguel', value: 'Aluguel', category: 'Moradia' },
      {
        label: 'Financiamento Imobiliário',
        value: 'Financiamento Imobiliário',
        category: 'Moradia'
      },
      { label: 'Condomínio', value: 'Condomínio', category: 'Moradia' },
      { label: 'IPTU', value: 'IPTU', category: 'Moradia' },
      {
        label: 'Manutenção e Reparos',
        value: 'Manutenção e Reparos',
        category: 'Moradia'
      }
    ]
  },
  {
    label: 'Alimentação',
    value: 'Alimentação',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Alimentação' },
      { label: 'Supermercado', value: 'Supermercado', category: 'Alimentação' },
      {
        label: 'Restaurantes e Bares',
        value: 'Restaurantes e Bares',
        category: 'Alimentação'
      },
      {
        label: 'Delivery / Apps',
        value: 'Delivery / Apps',
        category: 'Alimentação'
      },
      {
        label: 'Padaria e Lanches',
        value: 'Padaria e Lanches',
        category: 'Alimentação'
      }
    ]
  },
  {
    label: 'Contas de Consumo',
    value: 'Contas de Consumo',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Contas de Consumo' },
      { label: 'Água', value: 'Água', category: 'Contas de Consumo' },
      {
        label: 'Energia Elétrica',
        value: 'Energia Elétrica',
        category: 'Contas de Consumo'
      },
      {
        label: 'Contas Gerais',
        value: 'Contas Gerais',
        category: 'Contas de Consumo'
      },
      { label: 'Gás', value: 'Gás', category: 'Contas de Consumo' },
      { label: 'Internet', value: 'Internet', category: 'Contas de Consumo' },
      {
        label: 'Plano de Celular / Telefone',
        value: 'Plano de Celular / Telefone',
        category: 'Contas de Consumo'
      },
      {
        label: 'Serviços de Streaming',
        value: 'Serviços de Streaming',
        category: 'Contas de Consumo'
      }
    ]
  },
  {
    label: 'Transporte',
    value: 'Transporte',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Transporte' },
      { label: 'Combustível', value: 'Combustível', category: 'Transporte' },
      {
        label: 'Manutenção e Revisão',
        value: 'Manutenção e Revisão',
        category: 'Transporte'
      },
      {
        label: 'Seguro de Veículo',
        value: 'Seguro de Veículo',
        category: 'Transporte'
      },
      {
        label: 'IPVA e Licenciamento',
        value: 'IPVA e Licenciamento',
        category: 'Transporte'
      },
      {
        label: 'Financiamento de Veículo',
        value: 'Financiamento de Veículo',
        category: 'Transporte'
      },
      {
        label: 'Transporte Público',
        value: 'Transporte Público',
        category: 'Transporte'
      },
      {
        label: 'Apps de Transporte (Uber, 99)',
        value: 'Apps de Transporte',
        category: 'Transporte'
      },
      {
        label: 'Estacionamento e Pedágio',
        value: 'Estacionamento e Pedágio',
        category: 'Transporte'
      }
    ]
  },
  {
    label: 'Saúde',
    value: 'Saúde',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Saúde' },
      { label: 'Plano de Saúde', value: 'Plano de Saúde', category: 'Saúde' },
      {
        label: 'Farmácia e Medicamentos',
        value: 'Farmácia e Medicamentos',
        category: 'Saúde'
      },
      {
        label: 'Consultas e Exames',
        value: 'Consultas e Exames',
        category: 'Saúde'
      },
      {
        label: 'Terapia / Psicólogo',
        value: 'Terapia / Psicólogo',
        category: 'Saúde'
      },
      { label: 'Dentista', value: 'Dentista', category: 'Saúde' },
      { label: 'Academia', value: 'Academia', category: 'Saúde' }
    ]
  },
  {
    label: 'Lazer e Hobbies',
    value: 'Lazer e Hobbies',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Lazer e Hobbies' },
      // --- SUBCATEGORIA ADICIONADA PARA O GASTO LIVRE ---
      {
        label: 'Gastos Livres / Diversos',
        value: 'Gastos Livres / Diversos',
        category: 'Lazer e Hobbies'
      },
      {
        label: 'Saídas e Eventos',
        value: 'Saídas e Eventos',
        category: 'Lazer e Hobbies'
      },
      { label: 'Hobbies', value: 'Hobbies', category: 'Lazer e Hobbies' },
      {
        label: 'Livros, Filmes e Música',
        value: 'Livros, Filmes e Música',
        category: 'Lazer e Hobbies'
      },
      {
        label: 'Viagens e Férias',
        value: 'Viagens e Férias',
        category: 'Lazer e Hobbies'
      }
    ]
  },
  {
    label: 'Cuidados Pessoais',
    value: 'Cuidados Pessoais',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Cuidados Pessoais' },
      {
        label: 'Roupas e Calçados',
        value: 'Roupas e Calçados',
        category: 'Cuidados Pessoais'
      },
      {
        label: 'Salão e Barbearia',
        value: 'Salão e Barbearia',
        category: 'Cuidados Pessoais'
      },
      {
        label: 'Cosméticos e Perfumaria',
        value: 'Cosméticos e Perfumaria',
        category: 'Cuidados Pessoais'
      },
      {
        label: 'Acessórios (Bolsas, óculos)',
        value: 'Acessórios',
        category: 'Cuidados Pessoais'
      }
    ]
  },
  {
    label: 'Educação',
    value: 'Educação',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Educação' },
      {
        label: 'Cursos (Idiomas, Profissionalizantes)',
        value: 'Cursos',
        category: 'Educação'
      }
    ]
  },
  {
    label: 'Pets',
    value: 'Pets',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Pets' },
      { label: 'Alimentação', value: 'Alimentação', category: 'Pets' },
      {
        label: 'Saúde e Veterinário',
        value: 'Saúde e Veterinário',
        category: 'Pets'
      },
      { label: 'Higiene (Banho e Tosa)', value: 'Higiene', category: 'Pets' },
      {
        label: 'Brinquedos e Acessórios',
        value: 'Brinquedos e Acessórios',
        category: 'Pets'
      }
    ]
  },
  {
    label: 'Metas e Objetivos',
    value: 'Metas e Objetivos',
    subcategories: [
      { label: 'Nenhuma', value: 'Nenhuma', category: 'Metas e Objetivos' },
      {
        label: 'Eletrônicos (PS5, TV, etc.)',
        value: 'Eletrônicos (PS5, TV, etc.)',
        category: 'Metas e Objetivos'
      },
      { label: 'Viagem', value: 'Viagem', category: 'Metas e Objetivos' },
      {
        label: 'Móveis e Decoração',
        value: 'Móveis e Decoração',
        category: 'Metas e Objetivos'
      },
      {
        label: 'Reserva de Emergência',
        value: 'Reserva de Emergência',
        category: 'Metas e Objetivos'
      },
      {
        label: 'Outra Meta',
        value: 'Outra Meta',
        category: 'Metas e Objetivos'
      }
    ]
  },
  {
    label: 'Investimentos e Finanças',
    value: 'Investimentos e Finanças',
    subcategories: [
      {
        label: 'Nenhuma',
        value: 'Nenhuma',
        category: 'Investimentos e Finanças'
      },
      {
        label: 'Aporte Regular',
        value: 'Aporte Regular',
        category: 'Investimentos e Finanças'
      },
      {
        label: 'Aporte Extra (sobras do mês)',
        value: 'Aporte Extra (sobras do mês)',
        category: 'Investimentos e Finanças'
      },
      {
        label: 'Juros e Rendimentos',
        value: 'Juros e Rendimentos',
        category: 'Investimentos e Finanças'
      }
    ]
  }
]

export const paymentsOptions = [
  {
    label: `Ex: A Pagar`,
    value: '',
    disabled: true,
    selected: true
  },
  { label: 'A Pagar', value: 'A Pagar' },
  { label: 'Pago', value: 'Pago' }
]
