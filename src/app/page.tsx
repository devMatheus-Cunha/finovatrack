import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import imageNot from '../public/home-not.png'

function LandingPage() {
  return (
    <div className="text-white h-screen flex flex-col">
      <Header />

      <main className="flex mt-2 md:mt-10 gap-12 flex-col p-[3%] md:p-8 flex-grow">
        <section className="flex items-center flex-col justify-center text-center gap-2">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Domine suas finanças em qualquer moeda
          </h2>
          <p className="text-md md:text-lg text-gray-200 md:max-w-[66%]">
            Domine suas finanças em várias moedas. Registre, edite e acompanhe
            suas informações financeiras de forma simples e eficiente, mantendo
            o controle total sobre seus gastos e entradas em diferentes moedas.
          </p>
          <div className="flex mt-4 gap-4">
            <Link
              href="/signup"
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md"
            >
              Abra sua conta!
            </Link>
            <Link
              href="/login"
              className="text-white py-2 px-4 rounded-md bg-transparent border border-cyan-600 hover:border-cyan-700"
            >
              Entrar
            </Link>
          </div>
        </section>
        <section className="flex justify-center flex-col md:justify-between md:flex-row md:p-8 rounded-lg">
          <div className="w-full md:w-[60%] mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Recursos em destaque:
            </h2>
            <ul className="grid gap-2">
              <li className="flex items-center text-gray-200">
                <svg
                  className="w-4 h-4 mr-2 text-cyan-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16l4-4-4-4M8 12h8" />
                </svg>
                Adicione e edite seus gastos facilmente
              </li>
              <li className="flex items-center text-gray-200">
                <svg
                  className="w-4 h-4 mr-2 text-cyan-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16l4-4-4-4M8 12h8" />
                </svg>
                Cálculo automático de entradas, gastos e saldo
              </li>
              <li className="flex items-center text-gray-200">
                <svg
                  className="w-4 h-4 mr-2 text-cyan-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16l4-4-4-4M8 12h8" />
                </svg>
                Registre suas entradas de valor
              </li>
              <li className="flex items-center text-gray-200">
                <svg
                  className="w-4 h-4 mr-2 text-cyan-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16l4-4-4-4M8 12h8" />
                </svg>
                Salve relatórios completos dos seus gastos
              </li>
              <li className="text-gray-200">
                <strong className="text-cyan-600">
                  Controle de múltiplas moedas:
                </strong>{' '}
                Defina a moeda principal da sua conta para a conversão
                automática de valores. Por exemplo, se sua moeda principal é o
                Real (BRL) e você fez uma entrada de 10.000 BRL e teve gastos de
                300 BRL e 1.000 EUR, nossa plataforma converterá automaticamente
                os valores de EUR para BRL com base na cotação atual. Você
                poderá visualizar o total de gastos em EUR convertido para BRL e
                o total de gastos somando BRL e EUR.
              </li>
            </ul>
          </div>
          <Image
            src={imageNot}
            alt="Exemplo do sistema em um laptop"
            style={{
              width: 500,
              height: 'auto'
            }}
          />
        </section>
        <section className="flex flex-col md:gap-4 md:p-8 rounded-lg mb-5 md:mb-0">
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 text-center italic">
            Melhorias Futuras
          </h2>
          <div className="flex ">
            <div className="bg-gray-800 p-4 rounded-lg flex-grow">
              <h2 className="text-2xl font-semibold text-cyan-500 mb-2">
                Estatísticas de Gastos
              </h2>
              <p className="text-gray-200 mb-4">
                Estamos constantemente aprimorando nossa plataforma para
                oferecer ainda mais recursos. Em breve, você poderá desfrutar de
                estatísticas detalhadas dos gastos e receber dicas
                personalizadas para economizar.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="p-4 bg-gray-800 text-gray-300 text-center">
        &copy; {new Date().getFullYear()} FinovaTrack. Todos os direitos
        reservados.
      </footer>
    </div>
  )
}

export default LandingPage
