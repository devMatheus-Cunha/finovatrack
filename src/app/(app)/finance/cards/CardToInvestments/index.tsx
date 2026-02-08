import { IInvestimentsData } from '@/app/actions/financeActions'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { CircleNotch, ArrowsCounterClockwise } from '@phosphor-icons/react'
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  ArrowUpRight,
  Calendar,
  Wallet
} from 'lucide-react'
import { useState } from 'react'

const InfoCard = ({
  icon,
  label,
  value,
  sub,
  highlight,
  percent
}: {
  icon: React.ReactNode
  label: string
  value: any
  sub?: string
  highlight?: boolean
  percent?: number
}) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  return (
    <div
      className={`p-3 rounded border ${
        highlight
          ? 'bg-blue-600/10 border-blue-500/30'
          : 'bg-gray-700 border-gray-800'
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className={highlight ? 'text-blue-400' : 'text-blue-500'}>
          {icon}
        </span>
        <span className="text-[9px] text-gray-400 font-black uppercase">
          {label}
        </span>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p
            className={`text-sm font-bold ${
              highlight ? 'text-blue-400' : 'text-white'
            }`}
          >
            {formatCurrencyMoney(value, 'EUR', isVisibilityData)}
          </p>
          {sub && (
            <p className="text-[8px] text-gray-400 font-bold uppercase">
              {sub}
            </p>
          )}
        </div>
        {percent !== undefined && (
          <span className="text-[9px] text-green-500 font-bold">
            {percent > 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`}
          </span>
        )}
      </div>
    </div>
  )
}

const CardToInvestments = ({
  investimentsData,
  isLoadingInvestimentsData,
  refetchInvestimentsData
}: {
  investimentsData: IInvestimentsData
  isLoadingInvestimentsData: boolean
  refetchInvestimentsData: () => void
}) => {
  const [activeTab, setActiveTab] = useState<string>('Rendimentos')
  const { isVisibilityData } = useIsVisibilityDatas()

  // MAPEAMENTO DA NOVA ESTRUTURA
  const rend = investimentsData?.performance
  const proj = investimentsData?.planejamento?.projecoes
  const metas = investimentsData?.planejamento?.metas

  const tabs = ['Rendimentos', 'Projeções', 'Metas']

  return (
    <div className="bg-gray-700 rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
      {/* HEADER DO PAINEL */}
      <div className="px-4 py-3 bg-gray-700/80 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
            Trading 212 - Painel Detalhado
          </h3>
          {isLoadingInvestimentsData ? (
            <CircleNotch size={18} className="text-blue-500 animate-spin" />
          ) : (
            <button
              type="button"
              onClick={refetchInvestimentsData}
              className="text-gray-400 hover:text-white transition-colors"
              title="Atualizar Dados"
            >
              <ArrowsCounterClockwise size={18} />
            </button>
          )}
        </div>

        {/* NAVEGAÇÃO ENTRE ABAS */}
        <div className="flex gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gray-800"></div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
              Visão Geral dos Investimentos
            </p>
            <div className="h-px flex-1 bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <InfoCard
              label="Total"
              value={investimentsData?.resumoConta?.totalGeral}
              icon={<Wallet size={14} />}
            />
            <InfoCard
              label="Disponível"
              value={investimentsData?.resumoConta?.corretora?.caixaLivre}
              icon={<DollarSign size={14} />}
            />
            <InfoCard
              label="Aplicado"
              value={investimentsData?.resumoConta?.corretora?.valorDeMercado}
              icon={<TrendingUp size={14} />}
              highlight
            />
            <InfoCard
              label="Juros"
              value={rend?.detalhes?.jurosCaixa?.recebidoTotal}
              icon={<Briefcase size={14} />}
            />
            <div className="col-span-2 md:col-span-1">
              <InfoCard
                label="Dividendos"
                value={rend?.detalhes?.dividendos?.recebidoTotal}
                icon={<ArrowUpRight size={14} />}
              />
            </div>
          </div>
        </section>

        {/* CONTEÚDO DINÂMICO (ABAS) */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-[10px] text-blue-500/70 font-black uppercase tracking-widest">
              Dados de {activeTab}
            </p>
            <div className="h-px flex-1 bg-gray-800/50"></div>
          </div>

          {activeTab === 'Rendimentos' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard
                label="Lucro Total"
                value={rend?.lucroTotalGeral}
                percent={rend?.porcentagemGeral}
                icon={<DollarSign size={14} />}
              />
              <InfoCard
                label="Valorização"
                value={rend?.detalhes?.valorizacao?.valor}
                percent={rend?.detalhes?.valorizacao?.porcentagem}
                icon={<TrendingUp size={14} />}
              />
              <InfoCard
                label="Dividendos"
                value={rend?.detalhes?.dividendos?.recebidoTotal}
                sub={`Yield: ${rend?.detalhes?.dividendos?.yieldAtual?.toFixed(2) || 0}%`}
                icon={<Briefcase size={14} />}
              />
              <InfoCard
                label="Juros Acum."
                value={rend?.detalhes?.jurosCaixa?.recebidoTotal}
                sub={`Taxa: ${rend?.detalhes?.jurosCaixa?.taxaAtual?.toFixed(2) || 0}%`}
                icon={<ArrowUpRight size={14} />}
              />
            </div>
          )}

          {activeTab === 'Projeções' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfoCard
                label="Juros Est. (Mês)"
                value={proj?.juros?.mensal}
                icon={<Calendar size={14} />}
              />
              <InfoCard
                label="Dividendos (Mês)"
                value={proj?.dividendos?.mensal}
                icon={<Briefcase size={14} />}
              />
              <InfoCard
                label="Total Passivo"
                value={
                  (proj?.juros?.mensal || 0) + (proj?.dividendos?.mensal || 0)
                }
                icon={<Wallet size={14} />}
                highlight
              />
            </div>
          )}

          {activeTab === 'Metas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* META DIVIDENDOS */}
              <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase font-black text-[9px] tracking-widest mb-1">
                    Alvo Dividendos
                  </span>
                  <span className="text-white font-bold text-sm">
                    {formatCurrencyMoney(
                      metas?.objetivos?.dividendosMensal,
                      'EUR',
                      isVisibilityData
                    )}
                    /mês
                  </span>
                  <span className="text-[10px] text-green-500 font-bold mt-1">
                    {metas?.progressoDividendos}% atingido
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 uppercase font-black text-[9px] block mb-1">
                    Status Atual (Média)
                  </span>
                  <span className="text-blue-400 font-black text-sm">
                    {formatCurrencyMoney(
                      (rend?.detalhes?.dividendos?.recebido12Meses || 0) / 12,
                      'EUR',
                      isVisibilityData
                    )}
                  </span>
                </div>
              </div>

              {/* META JUROS */}
              <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase font-black text-[9px] tracking-widest mb-1">
                    Alvo Juros
                  </span>
                  <span className="text-white font-bold text-sm">
                    {formatCurrencyMoney(
                      metas?.objetivos?.jurosMensal,
                      'EUR',
                      isVisibilityData
                    )}
                    /mês
                  </span>
                  <span className="text-[10px] text-green-500 font-bold mt-1">
                    {metas?.progressoJuros}% atingido
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 uppercase font-black text-[9px] block mb-1">
                    Projeção Atual
                  </span>
                  <span className="text-blue-400 font-black text-sm">
                    {formatCurrencyMoney(
                      proj?.juros?.mensal,
                      'EUR',
                      isVisibilityData
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default CardToInvestments
