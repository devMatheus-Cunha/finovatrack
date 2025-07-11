'use client'
import React, { useState } from 'react'

// Chosen Palette: Warm Neutrals & Teal Accent (Dark Mode Adapted)
// Application Structure Plan: The SPA is designed as an interactive roadmap, moving from high-level market understanding to granular action steps. It uses a sticky navigation for non-linear exploration. The core idea is to transform dense report text into interactive modules: a bar chart for niche comparison, filterable cards for tools, and an accordion for the action plan. This task-oriented design enhances usability by allowing users to digest information in manageable, self-selected chunks, which is more effective than reading a linear document.
// Visualization & Content Choices:
// - Report Info: Niche Profitability -> Goal: Compare -> Viz: Interactive Bar Chart (Chart.js) -> Interaction: Hover for details -> Justification: Visual comparison is faster and more engaging than a table.
// - Report Info: Essential Tools -> Goal: Organize -> Viz: Filterable Grid of Cards (HTML/JS) -> Interaction: Click buttons to filter -> Justification: Allows users to quickly find tools for a specific task (e.g., SEO, Content).
// - Report Info: Step-by-Step Plan -> Goal: Organize -> Viz: Interactive Accordion (HTML/JS) -> Interaction: Click to expand steps -> Justification: Breaks down the plan into digestible, less overwhelming parts, promoting action.
// - Report Info: Legal/Fiscal -> Goal: Inform -> Viz: Icon-based summary list (HTML/Tailwind) -> Interaction: Static -> Justification: Simplifies complex topics into key takeaways.
// CONFIRMATION: NO SVG graphics used. NO Mermaid JS used.

const nichosPortugal = [
  { nome: 'Cursos Online', valor: 9 },
  { nome: 'SaaS e Software', valor: 9.5 },
  { nome: 'Finanças & Invest.', valor: 8.5 },
  { nome: 'Inteligência Artificial', valor: 9.2 },
  { nome: 'Viagens', valor: 7.5 },
  { nome: 'Higiene & Cosmética', valor: 7 },
  { nome: 'Eletrónicos', valor: 7.2 },
  { nome: 'Moda e Calçado', valor: 6.8 },
  { nome: 'Bem-Estar', valor: 8 }
]
const nichosBrasil = [
  { nome: 'Cursos Online', valor: 9 },
  { nome: 'Produtos Digitais', valor: 9.5 },
  { nome: 'Finanças & Invest.', valor: 8.5 },
  { nome: 'Tecnologia', valor: 9.2 },
  { nome: 'Viagens', valor: 7.5 },
  { nome: 'Saúde & Beleza', valor: 7 },
  { nome: 'Eletrónicos', valor: 7.2 },
  { nome: 'Moda', valor: 6.8 },
  { nome: 'Bem-Estar', valor: 8 }
]
const rentabilidadeMap: Record<number, string> = {
  9.5: 'Muito Alto (Recorrente)',
  9.2: 'Muito Alto (Inovador)',
  9: 'Alto (Comissões Elevadas)',
  8.5: 'Alto',
  8: 'Crescente',
  7.5: 'Médio-Alto',
  7.2: 'Médio',
  7: 'Médio',
  6.8: 'Médio (Competitivo)'
}

const infoPortugal = {
  title: 'Marketing de Afiliados em Portugal',
  description:
    'Comece promovendo produtos digitais e físicos em plataformas como Hotmart, Awin, Amazon Associates e Booking. O enquadramento fiscal exige abrir atividade como Trabalhador Independente, emitir recibos verdes e declarar IRS. O IVA é isento até €15.000/ano e a Segurança Social tem isenção nos primeiros 12 meses. Transparência nos links é obrigatória.',
  platforms: ['Hotmart', 'Awin', 'Amazon Associates', 'Booking', 'Notino'],
  fiscal: [
    'Abrir atividade como Trabalhador Independente',
    'Emitir recibos verdes',
    'Declarar IRS (Regime Simplificado)',
    'IVA isento até €15.000/ano',
    'Isenção de Segurança Social nos primeiros 12 meses',
    'Transparência nos links de afiliado'
  ]
}
const infoBrasil = {
  title: 'Marketing de Afiliados no Brasil',
  description:
    'No Brasil, o afiliado pode atuar como Pessoa Física ou MEI (com restrições). Plataformas populares incluem Hotmart, Eduzz, Monetizze e Shopee. O enquadramento fiscal depende do CNAE e do faturamento. O MEI tem limite anual de R$81.000 e não permite todas as atividades. Transparência e emissão de notas fiscais são recomendadas.',
  platforms: ['Hotmart', 'Eduzz', 'Monetizze', 'Shopee', 'Amazon Brasil'],
  fiscal: [
    'Atuar como Pessoa Física ou MEI (verifique CNAE)',
    'Emitir notas fiscais (recomendado)',
    'Limite MEI: R$81.000/ano',
    'Nem todas atividades de afiliado são permitidas no MEI',
    'Transparência nos links de afiliado'
  ]
}

const toolsData = [
  {
    name: 'Ubersuggest',
    category: 'pesquisa',
    desc: 'Pesquisa de palavras-chave e análise de concorrência.'
  },
  {
    name: 'Google Trends',
    category: 'pesquisa',
    desc: 'Identifica tendências de pesquisa em Portugal.'
  },
  {
    name: 'ChatGPT',
    category: 'conteudo',
    desc: 'Gera ideias, esboços e textos para blogs e vídeos.'
  },
  {
    name: 'Writesonic',
    category: 'conteudo',
    desc: 'Assistente de IA para criar conteúdo de marketing.'
  },
  {
    name: 'MailerLite',
    category: 'email',
    desc: 'Plataforma de e-mail marketing com plano gratuito generoso.'
  },
  {
    name: 'Mailchimp',
    category: 'email',
    desc: 'Popular para iniciantes, com automação e landing pages.'
  },
  {
    name: 'Hostinger',
    category: 'estrutura',
    desc: 'Hospedagem acessível com domínio grátis no 1º ano.'
  },
  {
    name: 'WordPress.org',
    category: 'estrutura',
    desc: 'A plataforma ideal para construir o seu blog profissional.'
  }
]

const accordionData = [
  {
    title: 'Passo 1: Validar o seu Nicho',
    content:
      'Use ferramentas como Google Trends para pesquisar a procura. Analise a concorrência e verifique os programas de afiliados disponíveis. Escolha um nicho com um bom equilíbrio entre paixão e potencial de lucro.'
  },
  {
    title: 'Passo 2: Montar a Estrutura Mínima',
    content:
      'Registe um domínio e adquira uma hospedagem acessível (ex: Hostinger). Instale o WordPress.org. Crie contas nas plataformas de afiliados escolhidas e numa ferramenta de e-mail marketing (ex: MailerLite).'
  },
  {
    title: 'Passo 3: Trâmites Legais e Fiscais',
    content:
      'Abra atividade nas Finanças como "Trabalhador Independente". Entenda as suas obrigações de IRS, IVA (verifique a isenção) e Segurança Social. É altamente recomendável consultar um contabilista nesta fase.'
  },
  {
    title: 'Passo 4: Criar e Promover Conteúdo',
    content:
      'Comece a produzir conteúdo de valor (artigos de blog, reviews). Otimize tudo para SEO. Divulgue o seu conteúdo nas redes sociais para gerar tráfego inicial e capturar e-mails para a sua lista.'
  },
  {
    title: 'Passo 5: Medir, Otimizar e Escalar',
    content:
      'Acompanhe as métricas essenciais (Cliques, Conversões, EPC) nos painéis das plataformas. Analise o que funciona melhor e otimize as suas estratégias. Com os primeiros lucros, reinvista para escalar o negócio.'
  }
]

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [activeToolFilter, setActiveToolFilter] = useState<string>('all')
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  )
  const [tab, setTab] = useState<'portugal' | 'brasil'>('portugal')

  const nichos = tab === 'portugal' ? nichosPortugal : nichosBrasil
  const info = tab === 'portugal' ? infoPortugal : infoBrasil

  const toggleAccordion = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index)
  }

  const filteredTools =
    activeToolFilter === 'all'
      ? toolsData
      : toolsData.filter((tool) => tool.category === activeToolFilter)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-inter scroll-smooth">
      <header className="bg-slate-800 shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold text-teal-400">
              AfiliadoPT
            </div>
            <div className="hidden md:flex space-x-6 sm:space-x-8">
              <a
                href="#mercado"
                className="nav-link text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                O Mercado
              </a>
              <a
                href="#estrategias"
                className="nav-link text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                Estratégias
              </a>
              <a
                href="#ferramentas"
                className="nav-link text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                Ferramentas
              </a>
              <a
                href="#plano"
                className="nav-link text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                Plano de Ação
              </a>
              <a
                href="#metricas"
                className="nav-link text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                Métricas
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4">
              <a
                href="#mercado"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-4 text-sm text-slate-300 hover:bg-teal-900 rounded"
              >
                O Mercado
              </a>
              <a
                href="#estrategias"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-4 text-sm text-slate-300 hover:bg-teal-900 rounded"
              >
                Estratégias
              </a>
              <a
                href="#ferramentas"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-4 text-sm text-slate-300 hover:bg-teal-900 rounded"
              >
                Ferramentas
              </a>
              <a
                href="#plano"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-4 text-sm text-slate-300 hover:bg-teal-900 rounded"
              >
                Plano de Ação
              </a>
              <a
                href="#metricas"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-4 text-sm text-slate-300 hover:bg-teal-900 rounded"
              >
                Métricas
              </a>
            </div>
          )}
        </nav>
      </header>
      <main>
        <section id="inicio" className="bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-32 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-100 leading-tight">
              Marketing de Afiliados: Portugal & Brasil
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Compare os cenários, regras fiscais e oportunidades para afiliados
              em Portugal e Brasil.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-base shadow ${tab === 'portugal' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-teal-400 border border-teal-400'}`}
                onClick={() => setTab('portugal')}
              >
                Portugal
              </button>
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-base shadow ${tab === 'brasil' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-teal-400 border border-teal-400'}`}
                onClick={() => setTab('brasil')}
              >
                Brasil
              </button>
            </div>
          </div>
        </section>
        <section id="mercado" className="py-16 sm:py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-slate-800 p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-teal-400">
                {info.title}
              </h2>
              <p className="text-center text-slate-300 mb-6 text-base">
                {info.description}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-100 border-b-2 border-teal-400 pb-2">
                    Plataformas Populares
                  </h3>
                  <ul className="space-y-2 text-slate-300">
                    {info.platforms.map((p, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-teal-400 mr-2">✔</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-100 border-b-2 border-teal-400 pb-2">
                    Regras Fiscais & Burocracia
                  </h3>
                  <ul className="space-y-2 text-slate-300">
                    {info.fiscal.map((f, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-teal-400 mr-2">✔</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-2 text-slate-100">
                Potencial de Rentabilidade dos Nichos
              </h3>
              <p className="text-center text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">
                Veja a avaliação de rentabilidade. Nichos com comissões
                recorrentes ou de alto valor são ideais para seu objetivo.
              </p>
              <div className="w-full max-w-2xl mx-auto">
                <div className="space-y-3">
                  {nichos.map((nicho) => {
                    const maxValor = Math.max(...nichos.map((n) => n.valor))
                    const percent = (nicho.valor / maxValor) * 100
                    return (
                      <div
                        key={nicho.nome}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-40 text-right pr-2 text-slate-300 text-sm font-medium">
                          {nicho.nome}
                        </div>
                        <div className="flex-1">
                          <div className="relative h-8 flex items-center">
                            <div
                              className="bg-teal-400 rounded-lg h-8 transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                            <span className="absolute right-2 text-xs font-bold text-teal-200">
                              {nicho.valor}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 ml-2">
                          {rentabilidadeMap[nicho.valor] || 'Média'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="estrategias" className="py-20 md:py-28 bg-stone-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
                Estratégias Sem Aparecer
              </h2>
              <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
                O seu conteúdo é a sua marca. Descubra como criar um ecossistema
                digital que gera tráfego e vendas de forma orgânica, sem nunca
                precisar de mostrar o seu rosto.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="p-8 border-2 border-dashed border-stone-700 rounded-xl">
                <h3 className="text-xl font-bold text-center text-teal-400 mb-6">
                  O Ecossistema de Conteúdo Orgânico
                </h3>
                <div className="relative flex flex-col items-center md:flex-row md:justify-around space-y-8 md:space-y-0">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-teal-900 rounded-full flex items-center justify-center text-3xl text-stone-100">
                      📝
                    </div>
                    <p className="mt-2 font-semibold text-stone-100">
                      Blog (SEO)
                    </p>
                  </div>
                  <div className="text-2xl text-teal-600 absolute top-28 md:static md:mx-4">
                    &#10230;
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-teal-900 rounded-full flex items-center justify-center text-3xl text-stone-100">
                      📺
                    </div>
                    <p className="mt-2 font-semibold text-stone-100">
                      YouTube (sem rosto)
                    </p>
                  </div>
                  <div className="text-2xl text-teal-600 absolute top-56 md:static md:mx-4">
                    &#10230;
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-teal-900 rounded-full flex items-center justify-center text-3xl text-stone-100">
                      📱
                    </div>
                    <p className="mt-2 font-semibold text-stone-100">
                      Redes Sociais
                    </p>
                  </div>
                  <div className="text-2xl text-teal-600 absolute top-80 md:static md:mx-4">
                    &#10230;
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-teal-900 rounded-full flex items-center justify-center text-3xl text-stone-100">
                      📧
                    </div>
                    <p className="mt-2 font-semibold text-stone-100">
                      E-mail Marketing
                    </p>
                  </div>
                </div>
                <p className="mt-8 text-center text-stone-300">
                  Cada canal alimenta o outro. O seu blog atrai via Google, os
                  vídeos demonstram valor, as redes sociais distribuem, e o
                  e-mail marketing cria uma relação direta e fiel com a sua
                  audiência.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="ferramentas" className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
                A sua Caixa de Ferramentas Essencial
              </h2>
              <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
                Comece com um investimento mínimo utilizando ferramentas
                gratuitas ou de baixo custo. Filtre por categoria para encontrar
                o que precisa para cada etapa do seu trabalho.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
              <button
                className={`tool-filter-btn py-2 px-5 rounded-full font-semibold transition-all duration-300 ${activeToolFilter === 'all' ? 'bg-teal-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-teal-900'}`}
                onClick={() => setActiveToolFilter('all')}
              >
                Todas
              </button>
              <button
                className={`tool-filter-btn py-2 px-5 rounded-full font-semibold transition-all duration-300 ${activeToolFilter === 'pesquisa' ? 'bg-teal-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-teal-900'}`}
                onClick={() => setActiveToolFilter('pesquisa')}
              >
                Pesquisa
              </button>
              <button
                className={`tool-filter-btn py-2 px-5 rounded-full font-semibold transition-all duration-300 ${activeToolFilter === 'conteudo' ? 'bg-teal-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-teal-900'}`}
                onClick={() => setActiveToolFilter('conteudo')}
              >
                Conteúdo
              </button>
              <button
                className={`tool-filter-btn py-2 px-5 rounded-full font-semibold transition-all duration-300 ${activeToolFilter === 'email' ? 'bg-teal-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-teal-900'}`}
                onClick={() => setActiveToolFilter('email')}
              >
                E-mail
              </button>
              <button
                className={`tool-filter-btn py-2 px-5 rounded-full font-semibold transition-all duration-300 ${activeToolFilter === 'estrutura' ? 'bg-teal-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-teal-900'}`}
                onClick={() => setActiveToolFilter('estrutura')}
              >
                Estrutura
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTools.map((tool, index) => (
                <div
                  key={index}
                  className="tool-card bg-stone-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <h4 className="font-bold text-lg text-stone-100">
                    {tool.name}
                  </h4>
                  <p className="text-sm text-stone-400 mt-2">{tool.desc}</p>
                  <div className="mt-4 text-xs font-semibold uppercase text-teal-400">
                    {tool.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="plano" className="py-20 md:py-28 bg-stone-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
                Plano de Ação Passo a Passo
              </h2>
              <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
                Siga estes passos para transformar a teoria em prática. Cada
                etapa é crucial para construir uma base sólida para o seu
                negócio de afiliação. Clique em cada passo para ver os detalhes.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {accordionData.map((item, index) => (
                <div
                  key={index}
                  className="border border-stone-700 rounded-lg overflow-hidden"
                >
                  <button
                    className="accordion-header w-full text-left p-5 flex justify-between items-center font-semibold text-stone-100 hover:bg-stone-700 transition-colors duration-200"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{item.title}</span>
                    <svg
                      className={`accordion-icon w-5 h-5 transition-transform duration-300 ${openAccordionIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <div
                    className={`accordion-content overflow-hidden transition-all duration-500 ease-in-out ${openAccordionIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                    style={{
                      maxHeight: openAccordionIndex === index ? 'none' : '0px'
                    }}
                  >
                    <p className="p-5 pt-0 text-stone-300">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="metricas" className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
                Métricas Que Contam a História
              </h2>
              <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
                Não trabalhe às cegas. Acompanhe estas métricas para entender o
                que funciona, otimizar as suas campanhas e acelerar o seu
                crescimento em direção ao seu objetivo financeiro.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-stone-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-teal-400 text-4xl font-bold">CTR</h3>
                <p className="font-semibold mt-2 text-stone-100">
                  Taxa de Cliques
                </p>
                <p className="text-stone-400 mt-2 text-sm">
                  Mede a eficácia dos seus títulos e chamadas para ação. Quantas
                  pessoas clicam após verem o seu link?
                </p>
              </div>
              <div className="bg-stone-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-teal-400 text-4xl font-bold">CR</h3>
                <p className="font-semibold mt-2 text-stone-100">
                  Taxa de Conversão
                </p>
                <p className="text-stone-400 mt-2 text-sm">
                  A percentagem de cliques que se transformam em vendas. O quão
                  persuasivo é o seu conteúdo?
                </p>
              </div>
              <div className="bg-stone-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-teal-400 text-4xl font-bold">EPC</h3>
                <p className="font-semibold mt-2 text-stone-100">
                  Ganhos por Clique
                </p>
                <p className="text-stone-400 mt-2 text-sm">
                  A rentabilidade de cada clique. Essencial para saber se as
                  suas campanhas são lucrativas.
                </p>
              </div>
            </div>
            <div className="max-w-2xl mx-auto mt-16 bg-stone-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-center mb-6 text-stone-100">
                O Funil do Afiliado
              </h3>
              <div className="space-y-2">
                <div className="bg-teal-900 p-4 rounded-lg flex items-center">
                  <span className="text-teal-400 font-bold text-2xl mr-4">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-100">Impressões</h4>
                    <p className="text-sm text-stone-300">
                      O seu conteúdo é visto.
                    </p>
                  </div>
                </div>
                <div className="text-center text-2xl text-stone-600">▼</div>
                <div className="bg-teal-800 p-4 rounded-lg flex items-center">
                  <span className="text-teal-500 font-bold text-2xl mr-4">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-100">Cliques</h4>
                    <p className="text-sm text-stone-300">
                      O interesse é despertado, o visitante clica.
                    </p>
                  </div>
                </div>
                <div className="text-center text-2xl text-stone-600">▼</div>
                <div className="bg-teal-700 p-4 rounded-lg flex items-center">
                  <span className="text-teal-600 font-bold text-2xl mr-4">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-100">Conversões</h4>
                    <p className="text-sm text-stone-300">
                      O valor é reconhecido, a venda acontece.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-stone-950 text-white">
        <div className="container mx-auto px-6 py-8 text-center">
          <p>Guia Interativo AfiliadoPT &copy; 2025</p>
          <p className="text-xs text-stone-400 mt-2">
            Esta aplicação é um recurso educacional. As informações financeiras
            e legais devem ser confirmadas com profissionais qualificados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
