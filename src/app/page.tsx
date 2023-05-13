// Importe as dependências necessárias
import Link from 'next/link';
import React from 'react';

// Componente da landing page
function LandingPage() {
  return (
    <div className="text-white h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 bg-text-cyan-500 text-white">
        <h1 className="text-2xl font-bold">FinovaTrack</h1>
        <div className="gap-4 flex">
          <Link href="/login">
            Login
          </Link>
          <Link href="/signup">
            Criar Conta
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Gerencie suas finanças com facilidade</h2>
          <p className="text-gray-300">
            Nossa plataforma de Controle de Gestão Pessoal permite que você tenha o controle total
            dos seus gastos e receitas. Registre, edite e acompanhe suas informações financeiras de
            forma simples e eficiente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Recursos em destaque:</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Adicione e edite seus gastos facilmente</li>
            <li>Cálculo automático de entradas, gastos e saldo</li>
            <li>Registre suas entradas de valor</li>
            <li>Salve relatórios completos dos seus gastos</li>
            <li>
              <strong>Controle de múltiplas moedas:</strong>
              {' '}
              Defina a moeda principal da sua conta
              para a conversão automática de valores. Por exemplo, se sua moeda principal é o Real
              (BRL) e você fez uma entrada de 10.000 BRL e teve gastos de 300 BRL e 1.000 EUR, nossa
              plataforma converterá automaticamente os valores de EUR para BRL com base na cotação
              atual. Você poderá visualizar o total de gastos em EUR convertido para BRL e o total
              de gastos somando BRL e EUR.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Funcionalidades futuras:</h2>
          <p className="text-gray-300">
            Estamos constantemente aprimorando nossa plataforma para oferecer ainda mais recursos.
            Em breve, você poderá desfrutar de estatísticas detalhadas dos gastos e receber dicas
            personalizadas para economizar.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Comece agora mesmo!</h2>
          <p className="text-gray-300">
            Crie sua conta ou faça login para começar a gerenciar suas finanças de forma eficiente
            e organizada.
          </p>
          <div className="flex mt-4 gap-4">
            <Link href="/login">
              Login
            </Link>
            <Link href="/signup">
              Criar Conta
            </Link>
          </div>
        </section>
      </main>

      <footer className="p-4 bg-gray-800 text-gray-300 text-center">
        &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        FinovaTrack. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default LandingPage;
