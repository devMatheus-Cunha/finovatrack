'use client'
import React, { useState } from 'react'

// Type definitions for dynamic access
interface Model {
  name: string
  description: string
  plan: { step: string; detail: string }[]
  ai: { stage: string; detail: string }[]
  challenges: { title: string; detail: string }[]
  metrics: string[]
}
interface ComparisonMetric {
  label: string
  data: number[]
  note: string
}
interface ReportData {
  models: { [key: string]: Model }
  comparisonMetrics: { [key: string]: ComparisonMetric }
  meiCompatibility: { model: string; compatible: string; notes: string }[]
  tools: { category: string; items: string[] }[]
}

const reportData: ReportData = {
  models: {
    afiliados: {
      name: 'Marketing de Afiliados',
      description:
        'Gere renda promovendo produtos de terceiros. Você ganha comissões por vendas ou ações realizadas através de seus links, sem precisar criar um produto ou gerenciar estoque. O foco é na criação de conteúdo e na geração de tráfego.',
      plan: [
        {
          step: '1. Pesquisa de Nicho e Produto',
          detail:
            "Use Google Trends e explore plataformas como Hotmart e Shopee para encontrar nichos e produtos com alta demanda e boa comissão. **Exemplos de nichos com demanda:** produtos para pets (especialmente nichos como 'alimentação natural para cães'), sustentabilidade (ex: 'produtos de limpeza ecológicos'), tecnologia (ex: 'acessórios para casa inteligente'), ou hobbies específicos (ex: 'materiais para aquarismo marinho'). Analise a concorrência e as avaliações dos produtos."
        },
        {
          step: '2. Criação de Plataforma',
          detail:
            'Crie um blog (WordPress) ou perfis em redes sociais (TikTok, Instagram) focados no nicho. O conteúdo deve ser anônimo (reviews, tutoriais).'
        },
        {
          step: '3. Geração de Tráfego',
          detail:
            'Foque em SEO para tráfego orgânico. Com o orçamento de R$500, invista em Google Ads ou Facebook Ads para acelerar as primeiras vendas.'
        },
        {
          step: '4. Otimização',
          detail:
            'Analise quais links convertem mais e otimize seu conteúdo e campanhas para maximizar o ROI.'
        }
      ],
      ai: [
        {
          stage: 'Pesquisa de Mercado',
          detail:
            'Use ChatGPT/Bard para analisar tendências e identificar lacunas de mercado, otimizando seu tempo.'
        },
        {
          stage: 'Criação de Conteúdo',
          detail:
            'Gere roteiros, textos para posts e e-mails. Use Leonardo.AI para criar visuais sem precisar de habilidades de design.'
        },
        {
          stage: 'Otimização',
          detail:
            'Use ferramentas de SEO com IA (Ahrefs/Semrush) para análise de palavras-chave e integre chatbots para suporte básico.'
        }
      ],
      challenges: [
        {
          title: 'NÃO é MEI',
          detail:
            'A atividade (CNAE 7490-1/04) não é permitida no MEI. Você pode começar como Pessoa Física (PF) e atuar nessa modalidade até que seu faturamento se aproxime do limite de isenção do Imposto de Renda para PF (atualmente cerca de R$ 28.559,70 anuais). Após isso, ou ao atingir um volume que justifique, será necessário abrir uma Microempresa (ME).'
        },
        {
          title: 'Alta Concorrência',
          detail:
            'Diferencie-se focando em um sub-nicho específico e criando conteúdo de altíssima qualidade.'
        },
        {
          title: 'Complexidade Fiscal',
          detail:
            'Ao se tornar ME, a carga tributária e a burocracia aumentam. Contrate um contador especializado em negócios digitais.'
        }
      ],
      metrics: [
        'Retorno sobre Investimento (ROI)',
        'Taxa de Conversão de Cliques',
        'Custo por Aquisição (CAC)',
        'Tráfego do Site/Página'
      ]
    },
    infoprodutos: {
      name: 'Criação e Venda de Infoprodutos',
      description:
        'Transforme seu conhecimento em um ativo digital. Crie e venda eBooks, cursos online, templates ou planilhas. O modelo oferece alta margem de lucro e escalabilidade.',
      plan: [
        {
          step: '1. Validação da Ideia',
          detail:
            "Identifique um problema que seu conhecimento pode resolver. Use Google Forms ou SurveyMonkey para validar a demanda com seu público-alvo. **Exemplos de mercados com demanda:** 'Marketing Digital para Pequenas Empresas Locais', 'Finanças Pessoais para Jovens Adultos', 'Dominando o Excel para Iniciantes', 'Criação de Conteúdo para Redes Sociais', 'Receitas Veganas Rápidas e Saudáveis'."
        },
        {
          step: '2. Criação do Produto',
          detail:
            'Use Canva ou Adobe Express para criar eBooks e templates. Grave aulas com um bom roteiro (sem aparecer) e edite com CapCut ou DaVinci Resolve.'
        },
        {
          step: '3. Estrutura de Vendas',
          detail:
            'Use plataformas como Hotmart ou Kiwify (que cobram por venda) ou crie sua loja na Nuvemshop (plano gratuito).'
        },
        {
          step: '4. Lançamento',
          detail:
            'Divulgue nas redes sociais com conteúdo de valor, colete depoimentos e considere parcerias com microinfluenciadores.'
        }
      ],
      ai: [
        {
          stage: 'Validação de Ideia',
          detail:
            'Analise respostas de questionários com IA para identificar padrões e refinar a ideia do seu produto.'
        },
        {
          stage: 'Criação de Conteúdo',
          detail:
            'Estruture o conteúdo, gere rascunhos de texto e crie os visuais do seu infoproduto e marketing com IA generativa.'
        },
        {
          stage: 'Marketing',
          detail:
            'Otimize títulos e descrições para SEO nas plataformas e crie campanhas de e-mail marketing personalizadas.'
        }
      ],
      challenges: [
        {
          title: 'SIM, é MEI (com atenção)',
          detail:
            'Pode ser MEI (CNAE de Edição de Livros ou Treinamento), mas a meta de R$10.000/mês (R$120k/ano) ultrapassa o limite de R$81k/ano. Você pode começar como Pessoa Física (PF) e atuar nessa modalidade até que seu faturamento se aproxime do limite de isenção do Imposto de Renda para PF (atualmente cerca de R$ 28.559,70 anuais), ou então iniciar como MEI e planejar a transição para ME ao se aproximar do limite de R$ 81.000,00 anuais.'
        },
        {
          title: 'Qualidade do Conteúdo',
          detail:
            'O sucesso depende da qualidade e da transformação que seu produto gera. Invista tempo em pesquisa e estruturação.'
        },
        {
          title: 'Marketing e Vendas',
          detail:
            'Ter um bom produto não é suficiente. Estude marketing de conteúdo e estratégias de lançamento para alcançar seu público.'
        }
      ],
      metrics: [
        'Taxa de Conversão de Vendas',
        'Custo por Aquisição (CAC)',
        'Receita Mensal Recorrente (MRR)',
        'Taxa de Conclusão (Cursos)'
      ]
    },
    dropshipping: {
      name: 'Dropshipping',
      description:
        'Venda produtos físicos online sem ter estoque. Você cria a loja, atrai os clientes, e o fornecedor cuida do armazenamento e envio direto ao consumidor final.',
      plan: [
        {
          step: '1. Pesquisa de Nicho/Produto',
          detail:
            "Use Google Trends e ferramentas de IA para encontrar produtos em alta com boa margem de lucro. Analise a concorrência. **Exemplos de nichos com demanda:** 'Produtos Ecológicos para Casa', 'Acessórios para Organização de Escritório Home Office', 'Equipamentos de Fitness para Pequenos Espaços', 'Brinquedos Educativos para Crianças', 'Acessórios para Carros Elétricos'."
        },
        {
          step: '2. Criação da Loja Virtual',
          detail:
            'Crie sua loja na Nuvemshop (plano gratuito) ou Shopify (teste gratuito). Integre com aplicativos de dropshipping.'
        },
        {
          step: '3. Seleção de Fornecedores',
          detail:
            'Pesquise e valide fornecedores confiáveis (nacionais ou internacionais) que garantam qualidade e prazos de entrega razoáveis.'
        },
        {
          step: '4. Marketing e Vendas',
          detail:
            'Invista o orçamento inicial (até R$500) em tráfego pago (Facebook Ads, TikTok Ads) para direcionar clientes qualificados para a loja.'
        }
      ],
      ai: [
        {
          stage: 'Pesquisa de Produto',
          detail:
            'Use IA para identificar produtos vencedores, analisar tendências de mercado e otimizar a precificação em tempo real.'
        },
        {
          stage: 'Criação da Loja',
          detail:
            'Gere descrições de produtos otimizadas para SEO e crie imagens e vídeos de marketing atraentes.'
        },
        {
          stage: 'Atendimento ao Cliente',
          detail:
            'Implemente chatbots com IA para responder perguntas frequentes 24/7, melhorando a experiência do cliente.'
        }
      ],
      challenges: [
        {
          title: 'NÃO é MEI',
          detail:
            'A atividade de intermediação de negócios/comércio não é permitida no MEI. Você pode começar como Pessoa Física (PF) e atuar nessa modalidade até que seu faturamento se aproxime do limite de isenção do Imposto de Renda para PF (atualmente cerca de R$ 28.559,70 anuais). Após isso, ou ao atingir um volume que justifique, será necessário abrir uma Microempresa (ME).'
        },
        {
          title: 'Dependência de Fornecedores',
          detail:
            'A qualidade e o prazo de entrega estão fora do seu controle direto. Valide os fornecedores rigorosamente para proteger sua reputação.'
        },
        {
          title: 'Margens de Lucro',
          detail:
            'A concorrência é alta e as margens podem ser apertadas. O sucesso depende do volume de vendas e da otimização dos custos de marketing.'
        }
      ],
      metrics: [
        'Custo por Aquisição (CAC)',
        'Taxa de Conversão da Loja',
        'Lucro Líquido por Venda',
        'Taxa de Retenção de Clientes'
      ]
    },
    freelancer: {
      name: 'Serviços Digitais como Freelancer',
      description:
        'Ofereça suas habilidades (edição de vídeo, redação, gestão de redes sociais, assistência virtual) para empresas e empreendedores. O investimento é seu tempo e conhecimento.',
      plan: [
        {
          step: '1. Definição do Serviço e Nicho',
          detail:
            "Avalie suas habilidades e pesquise em plataformas como Workana e Fiverr quais serviços têm alta demanda e boa remuneração. **Exemplos de serviços e nichos com demanda:** 'Edição de Vídeos para YouTubers de Games', 'Gestão de Redes Sociais para Pequenos Restaurantes', 'Redação de Conteúdo SEO para Blogs de Tecnologia', 'Assistência Virtual para Coaches de Vida', 'Design de Apresentações para Startups'."
        },
        {
          step: '2. Criação de Portfólio',
          detail:
            'Crie projetos fictícios ou use trabalhos pessoais para montar um portfólio profissional no Canva ou Notion, mostrando o que você pode fazer.'
        },
        {
          step: '3. Captação de Clientes',
          detail:
            'Crie perfis otimizados nas plataformas de freelancers. Use suas próprias redes sociais para postar dicas e atrair clientes organicamente.'
        },
        {
          step: '4. Entrega e Fidelização',
          detail:
            'Entregue um trabalho de altíssima qualidade, cumpra os prazos e mantenha uma excelente comunicação para conseguir avaliações positivas e clientes recorrentes.'
        }
      ],
      ai: [
        {
          stage: 'Pesquisa de Mercado',
          detail:
            'Analise tendências de serviços em alta para direcionar seu foco e aprimorar as habilidades mais requisitadas.'
        },
        {
          stage: 'Marketing Pessoal',
          detail:
            'Gere ideias e textos para seu portfólio, descrições de serviços e posts para redes sociais, construindo uma marca profissional.'
        },
        {
          stage: 'Automação de Tarefas',
          detail:
            'Use IA para automatizar tarefas repetitivas (agendamento, pesquisa, rascunhos de e-mail), aumentando sua produtividade.'
        }
      ],
      challenges: [
        {
          title: 'MEI Depende do Serviço',
          detail:
            'Alguns serviços são MEI (Editor de Vídeo), outros não (Redator, Web Designer) e alguns são ambíguos (Assistente Virtual). Para atividades não permitidas no MEI, você pode começar como Pessoa Física (PF) e atuar nessa modalidade até que seu faturamento se aproxime do limite de isenção do Imposto de Renda para PF (atualmente cerca de R$ 28.559,70 anuais). Após isso, ou ao atingir um volume que justifique, será necessário abrir uma Microempresa (ME). Verifique o CNAE específico e consulte um contador para sua atividade exata.'
        },
        {
          title: 'Concorrência e Precificação',
          detail:
            'O mercado é competitivo. Especialize-se em um nicho para se destacar e justificar preços mais altos.'
        },
        {
          title: 'Inconstância de Renda',
          detail:
            'No início, o fluxo de clientes pode ser irregular. Construa um bom relacionamento com os clientes para garantir trabalhos recorrentes.'
        }
      ],
      metrics: [
        'Lucro Líquido Mensal',
        'Número de Clientes Ativos',
        'Valor/Hora Efetivo',
        'Taxa de Conversão de Propostas'
      ]
    },
    shortVideoMonetization: {
      name: 'Monetização de Vídeos Curtos (TikTok/YouTube Shorts)',
      description:
        'Crie e poste vídeos curtos em plataformas que pagam diretamente por visualizações ou engajamento, sem depender de parcerias ou vendas diretas. O foco é na produção de conteúdo viral e na construção de audiência.',
      plan: [
        {
          step: '1. Pesquisa de Tendências e Nicho',
          detail:
            "Identifique formatos e temas que viralizam nas plataformas (TikTok Creative Center, YouTube Trends). Use ferramentas de análise de tendências para encontrar lacunas. **Exemplos de nichos com demanda:** 'Receitas Culinárias Rápidas (sem mostrar o rosto)', 'Dicas de Organização Doméstica (visual apenas)', 'Fatos Históricos Curiosos (com animações)', 'Experimentos Científicos Simples (visual)', 'Tutoriais de DIY (Faça Você Mesmo) de Artesanato'."
        },
        {
          step: '2. Criação de Conteúdo (Sem Aparecer)',
          detail:
            'Produza vídeos curtos (tutoriais, curiosidades, animações, narrações, compilações) sem mostrar o rosto. Foque na qualidade do áudio e da edição.'
        },
        {
          step: '3. Publicação e Engajamento',
          detail:
            'Poste consistentemente, use hashtags e áudios em alta, e interaja com a comunidade nos comentários para aumentar o alcance e a retenção.'
        },
        {
          step: '4. Otimização e Escalabilidade',
          detail:
            'Analise o desempenho dos vídeos (visualizações, tempo de retenção, engajamento) e refine a estratégia para maximizar as visualizações e a monetização (ex: TikTok Creativity Program Beta, YouTube Shorts Fund).'
        }
      ],
      ai: [
        {
          stage: 'Pesquisa de Tendências',
          detail:
            'Use IA para analisar vídeos virais, identificar temas e formatos de sucesso, e gerar ideias de roteiros e ganchos para vídeos.'
        },
        {
          stage: 'Criação de Conteúdo',
          detail:
            'Gere roteiros, legendas, dublagens (com IA de voz), e edite vídeos com ferramentas de IA que automatizam cortes, adicionam efeitos e geram trilhas sonoras.'
        },
        {
          stage: 'Otimização e Engajamento',
          detail:
            'Use IA para otimizar horários de postagem, analisar métricas de engajamento, identificar padrões de audiência e sugerir interações com o público.'
        }
      ],
      challenges: [
        {
          title: 'NÃO é MEI',
          detail:
            'A monetização direta de conteúdo por plataformas (ex: receita de anúncios) geralmente se enquadra como intermediação de publicidade ou atividades não permitidas para MEI. Você pode começar como Pessoa Física (PF) e atuar nessa modalidade até que seu faturamento se aproxime do limite de isenção do Imposto de Renda para PF (atualmente cerca de R$ 28.559,70 anuais). Após isso, ou ao atingir um volume que justifique, será necessário abrir uma Microempresa (ME).'
        },
        {
          title: 'Algoritmo e Volatilidade',
          detail:
            'A dependência dos algoritmos das plataformas pode levar a oscilações significativas na renda. É crucial diversificar o conteúdo e, se possível, as plataformas.'
        },
        {
          title: 'Qualidade e Volume',
          detail:
            'Manter a qualidade e a frequência de postagens é desafiador, mas essencial para sustentar o crescimento e a monetização. A IA pode ajudar a otimizar este processo.'
        }
      ],
      metrics: [
        'Visualizações Totais',
        'Tempo Médio de Visualização',
        'Engajamento (curtidas, comentários, compartilhamentos)',
        'Receita por Mil Visualizações (RPM)',
        'Crescimento de Seguidores'
      ]
    }
  },
  comparisonMetrics: {
    potencialRenda: {
      label: 'Potencial de Renda',
      data: [4, 5, 4, 3, 4],
      note: 'Escala de 1 (Baixo) a 5 (Muito Alto). Potencial refere-se à escalabilidade do modelo.'
    },
    investimentoInicial: {
      label: 'Investimento Inicial (R$)',
      data: [1, 1, 2, 1, 1],
      note: 'Escala de 1 (Até R$100) a 5 (Acima de R$1000). Valores desconsideram custos de formalização.'
    },
    complexidadeBurocratica: {
      label: 'Complexidade Burocrática',
      data: [4, 2, 4, 3, 4],
      note: 'Escala de 1 (Muito Baixa - MEI simples) a 5 (Alta - Requer ME desde o início).'
    },
    necessidadeExposicao: {
      label: 'Necessidade de Exposição Pessoal',
      data: [1, 1, 1, 1, 1],
      note: 'Escala de 1 (Nenhuma) a 5 (Muito Alta). Todos os modelos foram selecionados por terem baixa necessidade.'
    }
  },
  meiCompatibility: [
    {
      model: 'Marketing de Afiliados',
      compatible: 'NÃO',
      notes:
        'CNAE 7490-1/04 (Intermediação) não permitido. Requer ME para escalar. Pode iniciar como PF.'
    },
    {
      model: 'Infoprodutor (Cursos/eBooks)',
      compatible: 'SIM',
      notes:
        'CNAEs de Edição de Livros/Treinamento são permitidos, mas o faturamento anual (R$81k) é uma limitação. Pode iniciar como PF ou MEI.'
    },
    {
      model: 'Dropshipping',
      compatible: 'NÃO',
      notes:
        'Atividade de intermediação/comércio sem estoque físico não se enquadra no MEI. Requer ME. Pode iniciar como PF.'
    },
    {
      model: 'Assistente Virtual',
      compatible: 'AMBÍGUO',
      notes:
        'CNAE 8211-3/00 é controverso. Depende da interpretação e da legislação local. Consulta contábil é essencial. Pode iniciar como PF.'
    },
    {
      model: 'Editor de Vídeo',
      compatible: 'SIM',
      notes:
        'CNAE 5912-0/99 (Pós-produção de vídeos) é permitido. Pode iniciar como PF ou MEI.'
    },
    {
      model: 'Redator / Web Designer',
      compatible: 'NÃO',
      notes:
        'Atividades consideradas intelectuais/criativas não são permitidas no MEI. Requerem ME. Pode iniciar como PF.'
    },
    {
      model: 'Monetização de Vídeos Curtos',
      compatible: 'NÃO',
      notes:
        'A monetização direta de conteúdo por plataformas (ex: receita de anúncios) geralmente se enquadra como intermediação de publicidade ou atividades não permitidas para MEI. Requer ME. Pode iniciar como PF.'
    }
  ],
  tools: [
    {
      category: 'Pesquisa e Validação',
      items: [
        'Google Trends',
        'SurveyMonkey',
        'ChatGPT/Bard (IA)',
        'Ahrefs/Semrush (IA)',
        'TikTok Creative Center',
        'YouTube Trends'
      ]
    },
    {
      category: 'Criação de Conteúdo/Produto',
      items: [
        'Canva',
        'Adobe Express',
        'CapCut',
        'Leonardo.AI (IA)',
        'Figma',
        'Ferramentas de IA para Voz/Dublagem'
      ]
    },
    {
      category: 'Marketing e Divulgação',
      items: [
        'Buffer/Metricool (IA)',
        'Google Ads',
        'Facebook Ads',
        'Adsterra (Rede de Ads)'
      ]
    },
    {
      category: 'Plataformas de Venda',
      items: ['Hotmart', 'Kiwify', 'Nuvemshop', 'Shopify', 'Workana', 'Fiverr']
    },
    {
      category: 'Otimização e Automação',
      items: ['Google Analytics', 'Chatbots com IA', 'Toolzz OS (IA)']
    },
    {
      category: 'Gestão e Burocracia',
      items: ['Portal do Empreendedor', 'Contadores Online']
    }
  ]
}

const modelKeys = Object.keys(reportData.models)

function getChallengeColor(title: string): string {
  if (title.includes('NÃO')) return 'red'
  if (title.includes('SIM')) return 'emerald'
  return 'amber'
}

const Page = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('potencialRenda')
  const [selectedModel, setSelectedModel] = useState<string>('afiliados')

  const metricData = reportData.comparisonMetrics[selectedMetric]
  const maxValue = Math.max(...metricData.data)
  const modelNames = modelKeys.map((k) => reportData.models[k].name)

  const model = reportData.models[selectedModel]

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      <header className="bg-slate-800 shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-400 mb-2 sm:mb-0">
            Navegador Digital
          </h1>
          <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4 md:space-x-8 text-xs sm:text-sm md:text-base">
            <li>
              <a
                href="#comparativo"
                className="font-medium hover:text-teal-400 transition-colors duration-300 text-slate-100"
              >
                Comparativo
              </a>
            </li>
            <li>
              <a
                href="#modelos"
                className="font-medium hover:text-teal-400 transition-colors duration-300 text-slate-100"
              >
                Modelos
              </a>
            </li>
            <li>
              <a
                href="#juridico"
                className="font-medium hover:text-teal-400 transition-colors duration-300 text-slate-100"
              >
                Jurídico
              </a>
            </li>
            <li>
              <a
                href="#ferramentas"
                className="font-medium hover:text-teal-400 transition-colors duration-300 text-slate-100"
              >
                Ferramentas
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-12">
        <section className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 mb-3 sm:mb-4">
            Explore seu Potencial no Empreendedorismo Digital
          </h2>
          <p className="max-w-full sm:max-w-3xl mx-auto text-base sm:text-lg text-slate-300 px-2">
            Esta ferramenta interativa traduz um guia completo em um painel
            prático. Compare modelos de negócio, entenda os aspectos legais e
            descubra as ferramentas para iniciar sua jornada no Brasil, com foco
            em baixo investimento e sem exposição pessoal.
          </p>
        </section>
        <section id="comparativo" className="mb-12 sm:mb-20 scroll-mt-20">
          <div className="bg-slate-800 p-3 sm:p-6 md:p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-center mb-1 sm:mb-2 text-slate-100">
              Comparativo Rápido de Modelos
            </h3>
            <p className="text-center text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Selecione uma métrica para comparar os modelos de negócio e
              identificar qual se alinha melhor ao seu perfil e objetivos.
            </p>
            <div className="flex justify-center mb-4 sm:mb-6">
              <select
                className="p-2 border border-slate-700 bg-slate-900 text-slate-100 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 w-full max-w-xs"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="potencialRenda">Potencial de Renda</option>
                <option value="investimentoInicial">
                  Investimento Inicial
                </option>
                <option value="complexidadeBurocratica">
                  Complexidade Burocrática
                </option>
                <option value="necessidadeExposicao">
                  Necessidade de Exposição
                </option>
              </select>
            </div>
            <div className="w-full max-w-full sm:max-w-2xl mx-auto">
              <div className="space-y-3 sm:space-y-4">
                {modelNames.map((name, idx) => {
                  const value = metricData.data[idx]
                  const percent = (value / maxValue) * 100
                  return (
                    <div
                      key={name}
                      className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
                    >
                      <div className="w-full sm:w-40 text-right pr-2 text-slate-300 text-xs sm:text-sm font-medium">
                        {name}
                      </div>
                      <div className="flex-1 w-full">
                        <div className="relative h-8 flex items-center">
                          <div
                            className="bg-teal-400 rounded-lg h-8 transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                          <span className="absolute right-2 text-xs font-bold text-teal-200">
                            {value}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-2 text-xs text-slate-400 text-center">
                {metricData.note}
              </div>
            </div>
          </div>
        </section>
        <section id="modelos" className="mb-12 sm:mb-20 scroll-mt-20">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-center mb-1 sm:mb-2 text-slate-100">
            Análise Detalhada dos Modelos de Negócio
          </h3>
          <p className="text-center text-slate-300 mb-4 sm:mb-8 text-sm sm:text-base">
            Clique em um modelo para ver o plano de ação, uso de IA, desafios e
            métricas chave.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {modelKeys.map((key) => (
              <div key={key} className="flex items-center">
                <button
                  className={`model-selector-btn text-base md:text-lg font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md ${selectedModel === key ? 'bg-teal-600 text-white' : 'bg-slate-900 text-teal-400 border border-teal-400'}`}
                  onClick={() => setSelectedModel(key)}
                >
                  {reportData.models[key].name}
                </button>
              </div>
            ))}
          </div>
          <div
            id="model-details-container"
            className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-lg min-h-[500px]"
          >
            <div className="content-fade-in">
              <h4 className="text-3xl font-bold text-center mb-2 text-teal-400">
                {model.name}
              </h4>
              <p className="text-center text-slate-300 mb-8 max-w-2xl mx-auto">
                {model.description}
              </p>
              {selectedModel === 'afiliados' && (
                <div className="flex justify-center mb-8">
                  <a
                    href="/sociedade/afiliado"
                    className="bg-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-teal-700 transition-colors duration-300 text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
                    aria-label="Ver mais sobre Marketing de Afiliados"
                  >
                    Ver mais sobre Marketing de Afiliados
                  </a>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h5 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-100 border-b-2 border-teal-400 pb-1 sm:pb-2">
                    Plano de Ação
                  </h5>
                  <div className="space-y-3 sm:space-y-4">
                    {model.plan.map((p, idx) => (
                      <div key={idx} className="relative pl-6 sm:pl-8">
                        <div className="absolute left-0 top-0 h-full w-0.5 bg-slate-700" />
                        <div className="absolute left-[-5px] top-2 h-3 w-3 rounded-full bg-teal-400" />
                        <p className="font-semibold text-slate-100 text-xs sm:text-base">
                          {p.step}
                        </p>
                        <p className="text-slate-300 text-xs sm:text-sm">
                          {p.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-100 border-b-2 border-teal-400 pb-1 sm:pb-2">
                    Desafios Principais
                  </h5>
                  <div className="space-y-2 sm:space-y-3">
                    {model.challenges.map((c, idx) => {
                      const color = getChallengeColor(c.title)
                      const bgColor =
                        color === 'red'
                          ? 'bg-red-900'
                          : color === 'emerald'
                            ? 'bg-emerald-900'
                            : 'bg-amber-900'
                      const borderColor =
                        color === 'red'
                          ? 'border-red-400'
                          : color === 'emerald'
                            ? 'border-emerald-400'
                            : 'border-amber-400'
                      const textColor =
                        color === 'red'
                          ? 'text-red-300'
                          : color === 'emerald'
                            ? 'text-emerald-300'
                            : 'text-amber-300'
                      const detailColor =
                        color === 'red'
                          ? 'text-red-400'
                          : color === 'emerald'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                      return (
                        <div
                          key={idx}
                          className={`${bgColor} border-l-4 ${borderColor} p-3 sm:p-4 mb-2 sm:mb-3 rounded-r-lg`}
                        >
                          <p
                            className={`font-bold ${textColor} text-xs sm:text-base`}
                          >
                            {c.title}
                          </p>
                          <p className={`text-xs sm:text-sm ${detailColor}`}>
                            {c.detail}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                  <h5 className="text-base sm:text-xl font-semibold mt-4 sm:mt-6 mb-3 sm:mb-4 text-slate-100 border-b-2 border-teal-400 pb-1 sm:pb-2">
                    Métricas para Acompanhar
                  </h5>
                  <ul className="space-y-1 sm:space-y-2 text-slate-300">
                    {model.metrics.map((m, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-xs sm:text-base"
                      >
                        <span className="text-teal-400 mr-2">✔</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <h5 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-100 border-b-2 border-teal-400 pb-1 sm:pb-2">
                  Como Usar Inteligência Artificial 🤖
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {model.ai.map((a, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 p-3 sm:p-4 rounded-lg"
                    >
                      <p className="font-semibold text-slate-100 text-xs sm:text-base">
                        {a.stage}
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        {a.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="juridico" className="mb-12 sm:mb-20 scroll-mt-20">
          <div className="bg-slate-800 p-3 sm:p-6 md:p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-center mb-1 sm:mb-2 text-slate-100">
              Guia de Formalização (MEI)
            </h3>
            <p className="text-center text-slate-300 mb-4 sm:mb-8 text-sm sm:text-base">
              A formalização como MEI é ideal para começar, mas nem todos os
              modelos são compatíveis. Veja um resumo da viabilidade de cada um
              para evitar surpresas e planejar o crescimento do seu negócio.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 bg-slate-900 font-bold uppercase text-xs sm:text-sm text-slate-300 border-b border-slate-700">
                      Modelo de Negócio
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 bg-slate-900 font-bold uppercase text-xs sm:text-sm text-slate-300 border-b border-slate-700 text-center">
                      Compatível com MEI?
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 bg-slate-900 font-bold uppercase text-xs sm:text-sm text-slate-300 border-b border-slate-700">
                      Observações / Limitações
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {reportData.meiCompatibility.map((item, idx) => {
                    let statusClass = ''
                    let statusText = ''
                    if (item.compatible === 'SIM') {
                      statusClass = 'bg-emerald-900 text-emerald-300'
                      statusText = 'Sim'
                    } else if (item.compatible === 'NÃO') {
                      statusClass = 'bg-red-900 text-red-300'
                      statusText = 'Não'
                    } else {
                      statusClass = 'bg-amber-900 text-amber-300'
                      statusText = 'Ambíguo'
                    }
                    return (
                      <tr key={idx} className="hover:bg-slate-900">
                        <td className="py-2 sm:py-3 px-2 sm:px-4 border-b border-slate-700">
                          {item.model}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 border-b border-slate-700 text-center">
                          <span
                            className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${statusClass}`}
                          >
                            {statusText}
                          </span>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 border-b border-slate-700 text-xs sm:text-sm">
                          {item.notes}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section id="ferramentas" className="scroll-mt-20">
          <div className="bg-slate-800 p-3 sm:p-6 md:p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-center mb-1 sm:mb-2 text-slate-100">
              Caixa de Ferramentas do Empreendedor
            </h3>
            <p className="text-center text-slate-300 mb-4 sm:mb-8 text-sm sm:text-base">
              Uma seleção de ferramentas essenciais (gratuitas ou de baixo
              custo) e como a Inteligência Artificial pode acelerar cada etapa
              do seu novo negócio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {reportData.tools.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 p-3 sm:p-4 rounded-lg border border-slate-700"
                >
                  <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-slate-100">
                    {cat.category}
                  </h4>
                  <ul className="space-y-1 text-xs sm:space-y-1.5 sm:text-sm text-slate-300">
                    {cat.items.map((item, iidx) => (
                      <li key={iidx} className="flex items-start">
                        <span className="text-teal-400 mr-2 mt-1">🔧</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-900 text-slate-400 mt-12 sm:mt-20">
        <div className="container mx-auto px-2 sm:px-6 py-6 sm:py-8 text-center text-xs sm:text-base">
          <p>Gerado para auxiliar empreendedores digitais no Brasil.</p>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Uma aplicação interativa baseada no &quot;Guia Estratégico para
            Empreendedorismo Digital&quot;.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Page
