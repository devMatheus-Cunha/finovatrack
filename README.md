---

# 🧭 **Guia Definitivo: Arquitetura Feature-Sliced Design (FSD)**

> Um guia prático e completo para estruturar projetos frontend modernos com organização, escalabilidade e legibilidade.
>

---

## 🎯 **Por que usar o FSD?**

À medida que o projeto cresce, o frontend sofre com:

- Pastas “gigantes” e sem coesão;
- Componentes acoplados;
- Dificuldade em testar e evoluir funcionalidades.

O **Feature-Sliced Design (FSD)** resolve isso **separando o projeto por domínios funcionais e níveis de abstração**, permitindo que:

- Cada **parte tenha responsabilidade clara**;
- O projeto **escale sem virar caos**;
- O time **entenda facilmente onde cada coisa deve ficar**.

---

## 🧠 **Regra de Ouro**

➡ **Camadas superiores podem importar camadas inferiores, mas nunca o contrário.**

```
app → pages → widgets → features → entities → shared

```

Isso garante **isolamento, previsibilidade e reuso**.

Exemplo:

- ✅ `features` pode usar `entities`
- ❌ `entities` **não** pode usar `features`
- ✅ `pages` pode usar tudo que está abaixo

---

# 🧩 **Visão Geral das Camadas**

| Camada       | Papel Principal                     | Pode Importar de...                 |
| ------------ | ----------------------------------- | ----------------------------------- |
| **app**      | Configuração global e inicialização | —                                   |
| **pages**    | Orquestra widgets e features        | widgets, features, entities, shared |
| **widgets**  | Seções compostas da interface       | features, entities, shared          |
| **features** | Funcionalidades (ações do usuário)  | entities, shared                    |
| **entities** | Entidades de negócio (dados + UI)   | shared                              |
| **shared**   | Código genérico e reutilizável      | —                                   |

---

# 🧱 **Camadas em Detalhe**

## 1. 🟪 `shared` — **A Base (O Léxico do Projeto)**

### 💡 Conceito

Tudo o que é **genérico**, **reutilizável** e **agnóstico ao domínio**:

- **Não sabe** o que é “usuário”, “relatório”, “post”;
- **Simplesmente fornece** UI, helpers e libs reutilizáveis.

---

### 📂 Exemplos

```bash
shared/
  ui/
    Button.tsx
    Input.tsx
    Icon.tsx
  lib/
    formatDate.ts
    createQueryClient.ts
  api/
    axiosInstance.ts
  config/
    routes.ts
    env.ts
  utils/
    debounce.ts
    sleep.ts
  hooks/
    useDebounce.ts

```

> 📌 Use o shared como sua caixa de ferramentas universal.

---

### **2. 🟦 `entities` — A Representação dos Dados (O Cartão de Visitas)**

- **💡 Conceito:** Representa um objeto central do seu negócio. Seu foco é **apresentar informação** e fornecer os meios para buscá-la ou modificá-la na fonte.
- **📌 Analogia:** Pense na `entity` como um **"Cartão de Visitas"**. Ele mostra os dados essenciais de algo (a foto e nome de um contato), mas não realiza ações complexas. É a representação visual e lógica padrão daquela "coisa".
- **🧩 Exemplo Prático: `entities/expense`**

  ```jsx
  entities/expense/
    ui/
      ExpenseRow.tsx         # Componente que mostra uma linha de despesa numa tabela.
      ExpenseCard.tsx        # Representação visual de uma despesa.
    model/
      types.ts               # Define o que é uma `Expense` (interface/type).
      expenseSlice.ts        # Lógica de estado do cliente (Zustand, Redux).
    api/
      useFetchExpenses.ts    # Hook (useQuery) para BUSCAR despesas.
      useAddExpense.ts       # Hook (useMutation) para CRIAR uma despesa na API.
      useDeleteExpense.ts    # Hook (useMutation) para DELETAR uma despesa na API.
  ```

- **📘 Responsabilidade:**
  - Centralizar o que **define** uma entidade de negócio.
  - Fornecer os "serviços" de comunicação com a API para aquela entidade.
  - **Não possui lógica de interação complexa** (ex: não gerencia o estado de um formulário ou de um modal).

---

### **3. 🟩 `features` — As Ações do Usuário (Os Botões de Ação)**

- **💡 Conceito:** Representa uma ação isolada que o usuário pode tomar para entregar valor. Seu foco é **iniciar um processo** e gerenciar a experiência do usuário durante essa interação.
- **📌 Analogia:** Se a `entity` é o "Cartão de Visitas", a `feature` são os **"Botões de Ação"** ao lado dele: "Ligar", "Enviar Mensagem", "Bloquear". Cada botão inicia um processo.
- **🧩 Exemplo Prático: `features/expense/add-expense`**

  ```jsx
  features/expense/add-expense/
    ui/
      AddExpense.tsx         # Componente final que renderiza o botão e o modal.
      AddExpenseForm.tsx     # O formulário que o usuário preenche.
    model/
      useAddExpenseModal.ts  # O "cérebro" da feature:
                             #   - Gerencia se o modal está aberto/fechado (useDisclosure).
                             #   - Gerencia o estado do formulário (useForm).
                             #   - CHAMA o hook `useAddExpense` da `entity` ao submeter.
  ```

- **📘 Responsabilidade:**
  - Orquestrar a interação do usuário para uma ação específica.
  - Gerenciar o estado da UI (modais, formulários, etc.).
  - **Consumir** os serviços oferecidos pelas `entities` para efetivamente alterar os dados.

---

### **💎 `entities` vs. `features`: A Diferença Crucial**

Esta é a distinção mais importante para dominar o FSD.

- **Hook na `entity/api` (Ex: `useAddExpense.ts`):**
  - **Foco:** Comunicação com a API (Dados).
  - **Trabalho:** É a "ponte" com o backend. Sabe como criar, buscar ou deletar uma despesa. **Não sabe nada sobre modais ou formulários.**
  - **Pergunta que responde:** "Como eu salvo uma `Expense` no banco de dados?"
- **Hook na `feature/model` (Ex: `useAddExpenseModal.ts`):**
  - **Foco:** Estado da UI e Interação do Usuário.
  - **Trabalho:** É o "maestro" da experiência do usuário. Sabe se o modal está aberto, gerencia os campos do formulário e, quando o usuário clica em "Salvar", ele **chama o hook da `entity`** para fazer o trabalho sujo da API.
  - **Pergunta que responde:** "Como o modal de adicionar `Expense` se comporta na tela?"

Essa separação é o motivo da "Regra de Ouro": a `feature` (o maestro) depende e consome a `entity` (a ponte com a API).

---

### **4. 🟨 `widgets` — Composições (As Seções Montadas)**

- **💡 Conceito:** São componentes compostos cuja **única responsabilidade é a composição**. Eles unem `entities` e `features` para formar seções completas e coesas da UI.
- **📌 Analogia:** Se as `entities` são as peças de LEGO individuais e as `features` são as peças interativas (como uma porta que abre), o `widget` é uma **seção inteira e pronta da sua construção**, como a "asa completa de uma nave", já com todas as peças no lugar certo.
- **🧩 Exemplo Prático: `widgets/ExpensesTable`**TypeScript

  ```jsx
  widgets/ExpensesTable/
    ui/
      ExpensesTable.tsx
    model/
      useExpensesTable.ts # Hook que pode orquestrar dados para a tabela.
  ```

  Dentro do `ExpensesTable.tsx`:

  ```jsx
  import { useFetchExpenses } from '@entities/expense/api' // Busca os dados
  import { ExpenseRow } from '@entities/expense/ui' // Usa a entity para cada linha
  import { EditExpense } from '@features/expense/edit-expense' // Usa a feature para editar
  import { DeleteExpense } from '@features/expense/delete-expense' // Usa a feature para deletar

  export const ExpensesTable = () => {
    const { data: expenses } = useFetchExpenses()
    // ...
    return (
      <table>
        {/* ... cabeçalho ... */}
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseRow expense={expense} />
              <td>
                <EditExpense expense={expense} />
              </td>
              <td>
                <DeleteExpense expense={expense} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  ```

- **📘 Responsabilidade:**
  - **NÃO** possui lógica de negócio própria.
  - Apenas importa e organiza `features` e `entities` em um layout específico.

---

## 5. 🟥 `pages` — **Orquestração Final (Rotas)**

### 💡 Conceito

Camada responsável por **montar a página** usando **widgets, features e entities**.

- Não tem lógica complexa;
- Não faz fetch direto (usa hooks das camadas inferiores);
- Apenas **organiza layout e composição.**

---

### 🧩 Exemplo: `pages/ReportsPage`

```tsx
import { FullReport } from '@/widgets/FullReport'

export function ReportsPage() {
  return (
    <div className="page-grid">
      <FullReport />
    </div>
  )
}
```

📌 **Pense como "roteador visual"**: junta blocos prontos para exibir a página.

---

## 6. 🏁 `app` — **Setup Global**

### 💡 Conceito

Camada **raiz do projeto**.

Contém **configurações globais**, **providers** e **entry point**.

---

### 📂 Exemplo

```bash
app/
  providers/
    with-router.tsx
    with-query.tsx
    with-store.tsx
  store/
    rootStore.ts
  config/
    env.ts
  styles/
    global.css
  index.tsx

```

📌 Tudo que **não pertence ao domínio** e **precisa estar ativo desde o início** vai aqui.

---

# 🧭 **Fluxo de Dependência**

> Toda dependência flui de cima para baixo.

**Exemplo:**

```
pages/ReportsPage
  → widgets/FullReport
      → features/filter-reports-by-date
          → entities/report
              → shared/lib/formatDate

```

✅ Permitido

❌ Nunca o inverso (`shared` não pode usar `entities`).

---

# 🧠 **Exemplo Completo: Dashboard de Relatórios**

| Camada                              | Responsabilidade     | Exemplos                                    |
| ----------------------------------- | -------------------- | ------------------------------------------- |
| **shared**                          | UI genérica, helpers | `Button`, `DatePicker`, `chart-config`      |
| **entities/report**                 | Dados + UI base      | `ReportChart`, `ReportTable`, `reportSlice` |
| **features/filter-reports-by-date** | Filtro               | `DateRangePicker`, `useFilterByDate`        |
| **features/export-report-as-csv**   | Exportação           | `ExportButton`, `useExportCsv`              |
| **widgets/FullReport**              | Seção completa       | Combina chart + filtro + export             |
| **pages/ReportsPage**               | Tela final           | Monta layout com `FullReport`               |
| **app**                             | Setup global         | Roteamento, Store, QueryProvider            |

---

# 🧩 **Estrutura Final de Pastas**

```bash
/src
  /app
  /pages
  /widgets
  /features
  /entities
  /shared

```

Cada domínio interno segue a **mesma convenção:**

```bash
/domain/
  ui/
  model/
  api/
  lib/
  utils/
  hooks/
  config/
  consts/
  types/
  index.ts

```

---

# 📘 **Função de Cada Subpasta**

| Pasta        | Função                       | Conteúdo                                 |
| ------------ | ---------------------------- | ---------------------------------------- |
| **ui/**      | Interface visual             | Components visuais (Card, Table, Modal)  |
| **model/**   | Lógica e estado              | Hooks (`useX`), stores (Zustand, Redux)  |
| **api/**     | Comunicação externa          | `fetchData`, `useQuery`, `axiosInstance` |
| **lib/**     | Lógica específica do domínio | `parseReportData`, `mapChartData`        |
| **utils/**   | Helpers genéricos            | `debounce`, `sleep`, `formatDate`        |
| **hooks/**   | Custom hooks reutilizáveis   | `useOnClickOutside`, `useDebounce`       |
| **config/**  | Configurações locais         | Consts, defaults, env                    |
| **consts/**  | Constantes de domínio        | `REPORT_STATUS`, `DEFAULT_PAGE_SIZE`     |
| **types/**   | Tipagens TS                  | `type Report = {...}`                    |
| **index.ts** | Ponto de exportação          | Exports controlados                      |

📌 **Boas práticas:**

- `lib` = lógica **específica** do domínio
- `utils` = lógica **genérica**, sem contexto
- `model` = **estado reativo** e **lógica funcional**
- `ui` = **camada pura**, sem dependências complexas

---

# 🧭 **Resumo Visual (Fluxo)**

```
app
 └─ pages
     └─ widgets
         └─ features
             └─ entities
                 └─ shared

```

➡ **Fluxo de dados e dependências sempre descendente.**

---

# 🧠 **Resumo Geral**

| Camada       | Função                 | Impacto se Alterar                 |
| ------------ | ---------------------- | ---------------------------------- |
| **shared**   | Base genérica          | muda em todo o app                 |
| **entities** | Representação de dados | muda onde entidade é usada         |
| **features** | Ações do usuário       | muda em todos os contextos da ação |
| **widgets**  | Blocos de interface    | muda seções completas              |
| **pages**    | Orquestração           | muda apenas a rota                 |
| **app**      | Setup global           | muda boot e configs do app         |

---

# 🧭 PLANO DE AÇÃO – MIGRAÇÃO GRADUAL PARA FEATURE-SLICED DESIGN

---

## ⚙️ **1. Diagnóstico Inicial**

Antes de migrar qualquer linha de código, é essencial entender **como o projeto está hoje**:

✅ **Mapeia a estrutura atual**

- Cria um documento simples com:
  - Páginas principais (`/src/pages`)
  - Componentes comuns (`/src/components`)
  - Hooks, utils e services existentes
  - Onde está a lógica de domínio (separada ou misturada na UI)
  - Onde estão as chamadas de API

✅ **Identifica módulos do domínio**

Exemplo:

- `user` (autenticação, perfil)
- `product` (listagem, detalhes, carrinho)
- `order` (checkout, histórico)

👉 Esses módulos se tornarão **entities** e **features** mais tarde.

---

## 🧩 **2. Cria a Estrutura Base (sem mover nada ainda)**

Cria as pastas principais **vazias**, preparando o terreno:

```
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/

```

E dentro de `shared/`, cria a base mínima:

```
shared/
  api/
  ui/
  config/
  lib/
  utils/

```

> 🔹 Ainda não moverás nada — apenas estrutura.
>
> Isso vai permitir migrar **por partes**, sem quebrar importações.

---

## 🧱 **3. Migra o "Shared" Primeiro (é o mais seguro)**

Começa pelo que **não tem dependência de domínio**:

### 🧭 shared/lib

- Funções puras e libs customizadas (e.g. formatDate, debounce, parseCurrency)

### 🧭 shared/utils

- Helpers genéricos (`getEnv`, `mergeClasses`, `sleep`, `retryRequest`)

### 🧭 shared/config

- Configurações globais (`routes`, `env`, `axiosInstance`, `queryClient`)

### 🧭 shared/api

- Instâncias HTTP, interceptors, handlers de erro

### 🧭 shared/ui

- Componentes genéricos **sem regra de negócio**
  - `Button`, `Input`, `Card`, `Modal`, `Spinner`

💡 **Dica**: comece migrando 1 ou 2 componentes de UI de cada vez e ajusta os imports.

---

## 🧭 **4. Cria o Primeiro Módulo Real – Uma Entity**

Escolhe a **entidade mais estável** do domínio (ex: `User`, `Product`)

e cria a pasta base:

```
entities/
  user/
    model/
      types.ts
      selectors.ts
      index.ts
    lib/
      formatUserName.ts
    ui/
      Avatar.tsx
      UserName.tsx

```

Migra para cá:

- O **modelo (tipagem, interfaces)**
- Qualquer **regra pura** de domínio
- **Componentes visuais** pequenos relacionados ao domínio (`Avatar`, `Tag`, `Badge`)

> ⚠️ Nada de lógica de API aqui.
>
> Só o que é “imutável” e conceitual sobre a entidade.

---

## ⚡ **5. Cria a Primeira Feature (ação concreta)**

Escolhe uma ação simples do domínio, tipo:

- `auth/login`
- `cart/add`
- `user/update-profile`

Estrutura:

```
features/
  auth/
    login/
      model/
        useLogin.ts
      ui/
        LoginForm.tsx

```

Dentro dela:

- O **hook de lógica** (`useLogin`)
- O **componente da feature** (`LoginForm`)
- **Imports apenas de entities e shared**

💡 **Dica prática:**

Migra 1 feature por vez e deixa a versão antiga funcional (temporariamente).

Quando a nova estiver pronta, substitui as importações antigas.

---

## 🧱 **6. Cria o Primeiro Widget (composição visual)**

Exemplo:

```
widgets/
  header/
    ui/
      Header.tsx

```

O **widget** une várias **features** e **entities**:

```tsx
// widgets/header/ui/Header.tsx
import { LoginForm } from '@/features/auth/login'
import { Avatar } from '@/entities/user'

export const Header = () => (
  <header>
    <Avatar />
    <LoginForm />
  </header>
)
```

💡 Ideal migrar **depois que as features básicas estiverem prontas**.

---

## 📄 **7. Migra as Páginas**

Agora, cria cada página com as novas camadas:

```
pages/
  home/
    ui/
      HomePage.tsx
  profile/
    ui/
      ProfilePage.tsx

```

Cada página deve importar **apenas**:

- widgets
- features
- entities

```tsx
// pages/profile/ui/ProfilePage.tsx
import { ProfileInfo } from '@/widgets/profile-info'

export const ProfilePage = () => <ProfileInfo />
```

---

## 🧭 **8. Adapta o Routing**

Cria ou migra o roteamento principal em `app/`:

```
app/
  router/
    index.tsx
  providers/
    index.ts
  styles/
    index.css

```

> Usa pages como destino das rotas.
>
> Exemplo: `Route path="/profile" element={<ProfilePage />}`

---

## 🔄 **9. Refatora Gradualmente**

Agora que a estrutura está montada:

- **Semana 1:** cria shared completo
- **Semana 2:** migra 1 entity + 1 feature
- **Semana 3:** migra widgets principais
- **Semana 4:** migra páginas prioritárias

💡 Cada vez que fores mexer numa parte antiga, **já aproveita para migrar** para o novo formato.

---

## 🧰 **10. Ferramentas e Boas Práticas**

✅ Usa **alias por camada** no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@app/*": ["app/*"],
      "@pages/*": ["pages/*"],
      "@widgets/*": ["widgets/*"],
      "@features/*": ["features/*"],
      "@entities/*": ["entities/*"],
      "@shared/*": ["shared/*"]
    }
  }
}
```

✅ Usa **ESLint customizado** para impor dependências:

- Exemplo: `widgets` **não** pode importar `pages`
- `features` **não** pode importar `widgets`

✅ Documenta no README a **arquitetura e convenções**

---

## 📋 Checklist Prático

| Etapa                                     | Tarefa                            | Status |
| ----------------------------------------- | --------------------------------- | ------ |
| 🧭 Diagnóstico do projeto atual           | Mapeado módulos e dependências    | ☐      |
| 🧩 Estrutura base criada                  | `/app`, `/shared`, `/entities`... | ☐      |
| 🧰 Configurado aliases e ESLint           | ✅ paths + regras                 | ☐      |
| 🧱 Migrar Shared (ui, lib, utils, api)    | Componentes e helpers genéricos   | ☐      |
| 🧩 Migrar primeira Entity (`user`)        | types, selectors, UI atômica      | ☐      |
| ⚡ Migrar primeira Feature (`auth/login`) | lógica, hook, form                | ☐      |
| 🧱 Criar primeiro Widget (`header`)       | compõe features/entities          | ☐      |
| 📄 Migrar páginas (`pages/profile`)       | importa apenas widgets/features   | ☐      |
| 🔄 Refatoração contínua                   | migrar conforme alterado          | ☐      |
