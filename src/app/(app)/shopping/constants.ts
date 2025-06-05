// constants.ts (Arquivo de Constantes)

import { IItem } from './types'

export const PRIORITY_OPTIONS = ['Alto', 'Médio', 'Baixo']

export const DUMMY_NOTION_ITEMS: IItem[] = [
 {
  id: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
  properties: {
   Nome: { title: [{ plain_text: 'Smart TV 55"' }] },
   Comodo: { select: { name: 'Sala' } },
   Categoria: { select: { name: 'Eletrônicos' } },
   Quantidade: { number: 1 },
   Preco: { number: 2500 },
   Comprado: { checkbox: false },
   links: [
    {
     text: 'Link Loja A',
     url: 'https://www.worten.pt/produtos/consola-ps5-pro-digital-2-tb-branco-8155679',
     price: 2200,
     historicoPrecos: [
      { price: 2300, date: '10/01/2024' },
      { price: 2450, date: '01/12/2023' }
     ]
    },
    {
     text: '',
     url: 'https://www.worten.pt/produtos/frigorifico-combinado-st-kunft-kc9113-sl-estatico-180-cm-262-l-prata-8021445',
     price: 2300,
     historicoPrecos: [{ price: 2400, date: '01/03/2024' }]
    }
   ],
   productInfo: 'Modelo 2023, 4K HDR, Smart TV',
   priority: 'Alto'
  }
 },
 {
  id: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6a1',
  properties: {
   Nome: { title: [{ plain_text: 'Sofá 3 lugares' }] },
   Comodo: { select: { name: 'Sala' } },
   Categoria: { select: { name: 'Móveis' } },
   Quantidade: { number: 1 },
   Preco: { number: 1200 },
   Comprado: { checkbox: false },
   links: [
    {
     price: 1200,
     url: 'https://www.loja-moveis.com/sofa',
     historicoPrecos: []
    }
   ],
   productInfo: 'Cor cinza, tecido suede',
   priority: 'Médio'
  }
 },
 {
  id: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6a1b2',
  properties: {
   Nome: { title: [{ plain_text: 'Geladeira Inox' }] },
   Comodo: { select: { name: 'Cozinha' } },
   Categoria: { select: { name: 'Eletrodomésticos' } },
   Quantidade: { number: 1 },
   Preco: { number: 3000 },
   Comprado: { checkbox: true },
   links: [
    {
     text: '',
     url: 'https://www.magazine.com.br/geladeira-inox-modelo-abc',
     price: 2800,
     historicoPrecos: [{ price: 3100, date: '15/02/2024' }]
    }
   ],
   productInfo: 'Frost Free, 450L',
   priority: 'Alto'
  }
 },
 {
  id: 'd4e5f6g7h8i9j0k1l2m3n4o5p6a1b2c3',
  properties: {
   Nome: { title: [{ plain_text: 'Micro-ondas' }] },
   Comodo: { select: { name: 'Cozinha' } },
   Categoria: { select: { name: 'Eletrodomésticos' } },
   Quantidade: { number: 2 },
   Preco: { number: 500 },
   Comprado: { checkbox: false },
   links: [
    {
     price: 450,
     url: 'https://exemplo.com/microondas',
     historicoPrecos: [{ price: 520, date: '20/11/2023' }]
    }
   ],
   productInfo: '20L, função grill',
   priority: 'Baixo'
  }
 },
 {
  id: 'e5f6g7h8i9j0k1l2m3n4o5p6a1b2c3d4',
  properties: {
   Nome: { title: [{ plain_text: 'Cama Queen Size' }] },
   Comodo: { select: { name: 'Quarto' } },
   Categoria: { select: { name: 'Móveis' } },
   Quantidade: { number: 1 },
   Preco: { number: 1800 },
   Comprado: { checkbox: false },
   links: [
    { price: 1800, url: 'https://exemplo.com/cama', historicoPrecos: [] }
   ],
   productInfo: 'Madeira maciça',
   priority: 'Alto'
  }
 },
 {
  id: 'f6g7h8i9j0k1l2m3n4o5p6a1b2c3d4e5',
  properties: {
   Nome: { title: [{ plain_text: 'Guarda-roupa' }] },
   Comodo: { select: { name: 'Quarto' } },
   Categoria: { select: { name: 'Móveis' } },
   Quantidade: { number: 1 },
   Preco: { number: 1500 },
   Comprado: { checkbox: false },
   links: [
    {
     price: 1450,
     url: 'https://exemplo.com/guarda-roupa',
     historicoPrecos: [{ price: 1550, date: '01/03/2024' }]
    }
   ],
   productInfo: '6 portas, com espelho',
   priority: 'Médio'
  }
 },
 {
  id: 'g7h8i9j0k1l2m3n4o5p6a1b2c3d4e5f6',
  properties: {
   Nome: { title: [{ plain_text: 'Aspirador de Pó' }] },
   Comodo: { select: { name: 'Sala' } },
   Categoria: { select: { name: 'Limpeza' } },
   Quantidade: { number: 1 },
   Preco: { number: 300 },
   Comprado: { checkbox: true },
   links: [
    {
     price: 290,
     url: 'https://exemplo.com/aspirador',
     historicoPrecos: [{ price: 320, date: '05/10/2023' }]
    }
   ],
   productInfo: 'Portátil, sem fio',
   priority: 'Baixo'
  }
 },
 {
  id: 'h8i9j0k1l2m3n4o5p6a1b2c3d4e5f6g7',
  properties: {
   Nome: { title: [{ plain_text: 'Faqueiro 24 peças' }] },
   Comodo: { select: { name: 'Cozinha' } },
   Categoria: { select: { name: 'Utensílios' } },
   Quantidade: { number: 3 },
   Preco: { number: 150 },
   Comprado: { checkbox: false },
   links: [
    {
     price: 140,
     url: 'https://exemplo.com/faqueiro',
     historicoPrecos: [{ price: 160, date: '25/01/2024' }]
    }
   ],
   productInfo: 'Aço inox, para 6 pessoas',
   priority: 'Médio'
  }
 },
 {
  id: 'i9j0k1l2m3n4o5p6a1b2c3d4e5f6g7h8',
  properties: {
   Nome: { title: [{ plain_text: 'Pintura Abstrata' }] },
   Comodo: { select: { name: 'Sala' } },
   Categoria: { select: { name: 'Decoração' } },
   Quantidade: { number: 1 },
   Preco: { number: 400 },
   Comprado: { checkbox: false },
   links: [
    { price: 400, url: 'https://exemplo.com/pintura', historicoPrecos: [] }
   ],
   productInfo: 'Quadro grande, 100x70cm',
   priority: 'Baixo'
  }
 },
 {
  id: 'j0k1l2m3n4o5p6a1b2c3d4e5f6g7h8i9',
  properties: {
   Nome: { title: [{ plain_text: 'Máquina de Lavar' }] },
   Comodo: { select: { name: 'Lavanderia' } },
   Categoria: { select: { name: 'Eletrodomésticos' } },
   Quantidade: { number: 1 },
   Preco: { number: 2000 },
   Comprado: { checkbox: false },
   links: [
    {
     price: 1950,
     url: 'https://www.loja-ex.com/maquina',
     historicoPrecos: [{ price: 2050, date: '10/03/2024' }]
    }
   ],
   productInfo: '12kg, abertura superior',
   priority: 'Alto'
  }
 },
 {
  id: 'k1l2m3n4o5p6a1b2c3d4e5f6g7h8i9j0',
  properties: {
   Nome: { title: [{ plain_text: 'Secadora de Roupas' }] },
   Comodo: { select: { name: 'Lavanderia' } },
   Categoria: { select: { name: 'Eletrodomésticos' } },
   Quantidade: { number: 1 },
   Preco: { number: 1800 },
   Comprado: { checkbox: true },
   links: [
    {
     price: 1750,
     url: 'https://www.outraloja.com/secadora',
     historicoPrecos: [{ price: 1820, date: '01/11/2023' }]
    }
   ],
   productInfo: '10kg, a gás',
   priority: 'Médio'
  }
 },
 {
  id: 'l2m3n4o5p6a1b2c3d4e5f6g7h8i9j0k1',
  properties: {
   Nome: { title: [{ plain_text: 'Escrivaninha' }] },
   Comodo: { select: { name: 'Escritório' } },
   Categoria: { select: { name: 'Móveis' } },
   Quantidade: { number: 1 },
   Preco: { number: 700 },
   Comprado: { checkbox: false },
   links: [
    {
     price: 680,
     url: 'https://www.site-moveis.com/escrivaninha',
     historicoPrecos: [{ price: 720, date: '05/01/2024' }]
    }
   ],
   productInfo: 'Com gavetas, cor carvalho',
   priority: 'Alto'
  }
 }
]

export const ROOM_OPTIONS = [
 { value: 'Sala', label: 'Sala' },
 { value: 'Quarto', label: 'Quarto' },
 { value: 'Cozinha', label: 'Cozinha' },
 { value: 'Banheiro', label: 'Banheiro' },
 { value: 'Lavanderia', label: 'Lavanderia' },
 { value: 'Escritório', label: 'Escritório' },
 { value: 'Copa', label: 'Copa' },
]

export const CATEGORY_OPTIONS = [
 { value: 'Eletrônicos', label: 'Eletrônicos' },
 { value: 'Eletrodomésticos', label: 'Eletrodomésticos' },
 { value: 'Móveis', label: 'Móveis' },
 { value: 'Limpeza', label: 'Limpeza' },
 { value: 'Utensílios', label: 'Utensílios' },
 { value: 'Decoração', label: 'Decoração' },
 { value: 'Organização', label: 'Organização' },
]
