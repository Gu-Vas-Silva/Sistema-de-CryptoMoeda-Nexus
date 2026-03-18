🚀 Sistema de CryptoMoeda - Nexus

Projeto desenvolvido em React + TypeScript + Tailwind simulando uma plataforma de gestão de ativos e transações (depósitos, saques e conversões), com dados mockados e integração com API de preços.

▶️ Como rodar o projeto
1. Clone o repositório
git clone https://github.com/Gu-Vas-Silva/Sistema-de-CryptoMoeda-Nexus
cd Sistema-de-CryptoMoeda-Nexus
2. Instale as dependências
npm install
3. Rode o projeto
npm run dev
4. Acesse no navegador
http://localhost:5173
🧠 Estrutura do projeto

A estrutura foi pensada para separar responsabilidades e facilitar manutenção:

src/
 ├── components/      # Componentes reutilizáveis (Sidebar, Topbar, Cards, etc)
 ├── pages/           # Telas principais (Dashboard, Users, Convert, etc)
 ├── utils/           # Regras de negócio (cálculos, services, lógica)
 ├── mocks/           # Dados simulados (users, transactions, assets)
 ├── types/           # Tipagens TypeScript (Transaction, User, etc)
 ├── App.tsx          # Definição de rotas
 └── main.tsx         # Entrada da aplicação
⚙️ Padrões utilizados

🔹 Componentização → UI separada em partes reutilizáveis

🔹 Utils/Services → lógica de negócio isolada

🔹 LocalStorage → simulação de persistência de dados

🔹 TypeScript → tipagem forte para evitar erros

🔹 React Router → navegação entre páginas

💰 Funcionalidades

Login de usuário (mockado)

Depósitos e saques

Conversão de ativos (via API CoinGecko)

Dashboard com métricas

Saldo por ativo

Histórico de transações

📌 Observações

Os dados são mockados (não há backend real)

As transações são armazenadas no localStorage

Os preços dos ativos são obtidos em tempo real via API

🚀 Melhorias futuras

Integração com backend real

Autenticação com JWT

Gráficos de análise

Atualização em tempo real
