# 💰 FinTech - Sistema de Gestão Financeira

Sistema completo de gestão financeira pessoal desenvolvido com Next.js 14 e TypeScript, integrado com backend Java.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos Técnicos Atendidos](#requisitos-técnicos-atendidos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Funcionalidades](#funcionalidades)
- [Páginas Disponíveis](#páginas-disponíveis)
- [Componentes Reutilizáveis](#componentes-reutilizáveis)
- [Integração com Backend](#integração-com-backend)

## 🎯 Sobre o Projeto

O FinTech é uma aplicação web moderna para gerenciamento financeiro pessoal que permite aos usuários:
- Controlar contas bancárias
- Registrar e categorizar transações
- Definir e acompanhar metas financeiras
- Visualizar dashboard com estatísticas

## 🎯 Instruções de inicialização do projeto 
(Backend).
Acesse e clique em RUN no arquivo Application.java
\src\main\java\br\com\fiap
O Backend ficará ativo

(Frontend)
1.	No VSCODE (Front End)
Digite no terminal: npm run dev
3. Acesse: http://localhost:3000
4. Faça login de teste:
📧 Email: joao.silva@email.com
🔑 Senha: senha123


## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **React 18** - Biblioteca UI com Hooks
- **Axios** - Cliente HTTP para consumo de APIs
- **Context API** - Gerenciamento de estado global
- **CSS-in-JS** - Estilização inline com React

## ✅ Requisitos Técnicos Atendidos

### 1. ✅ Estrutura com Componentização
- Componentes reutilizáveis: `Layout`, `Card`, `Button`, `Table`, `Loading`
- Separação clara de responsabilidades
- Código modular e manutenível

### 2. ✅ Rotas de Navegação (SPA)
- Sistema de rotas do Next.js App Router
- Navegação client-side sem reload
- Rotas dinâmicas para detalhes e edição

### 3. ✅ Props e Estado (Hooks)
- `useState` para estado local
- `useEffect` para efeitos colaterais
- `useContext` para estado global (autenticação)
- `useRouter` para navegação programática
- `useParams` para parâmetros de rota

### 4. ✅ Página de Autenticação
- `/login` - Página de login completa
- Validação de credenciais
- Redirecionamento após autenticação

### 5. ✅ Página Inicial e Página de Erro
- `/` - Página inicial com redirecionamento inteligente
- `/dashboard` - Dashboard principal
- `/not-found` - Página 404 personalizada

### 6. ✅ Páginas CRUD para 4 Entidades

#### Usuários (`/usuarios`)
- Listagem
- Visualização de detalhes
- Criação
- Edição
- Remoção

#### Contas (`/contas`)
- Listagem com todas as contas
- Visualização detalhada
- Cadastro de nova conta
- Edição de conta existente
- Remoção de conta

#### Transações (`/transacoes`)
- Listagem com filtros (tipo e status)
- Visualização de detalhes
- Registro de nova transação
- Edição de transação
- Remoção de transação

#### Metas (`/metas`)
- Listagem em cards
- Visualização com progresso
- Criação de meta
- Edição de meta
- Remoção de meta

### 7. ✅ Conexão com Backend via REST API
- Serviços dedicados para cada entidade
- Interceptors para autenticação e tratamento de erros
- Tipagem completa das requisições e respostas

## 📁 Estrutura do Projeto

```
fintech-nextjs/
├── src/
│   ├── app/                      # Páginas (App Router)
│   │   ├── contas/              # CRUD de Contas
│   │   │   ├── [id]/            # Rotas dinâmicas
│   │   │   │   ├── page.tsx     # Visualizar conta
│   │   │   │   └── editar/
│   │   │   │       └── page.tsx # Editar conta
│   │   │   ├── nova/
│   │   │   │   └── page.tsx     # Nova conta
│   │   │   └── page.tsx         # Listar contas
│   │   ├── transacoes/          # CRUD de Transações
│   │   │   ├── [id]/
│   │   │   ├── nova/
│   │   │   └── page.tsx
│   │   ├── metas/               # CRUD de Metas
│   │   │   ├── [id]/
│   │   │   ├── nova/
│   │   │   └── page.tsx
│   │   ├── usuarios/            # CRUD de Usuários
│   │   │   ├── [id]/
│   │   │   ├── novo/
│   │   │   └── page.tsx
│   │   ├── dashboard/           # Dashboard principal
│   │   │   └── page.tsx
│   │   ├── login/               # Autenticação
│   │   │   └── page.tsx
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # Página inicial
│   │   ├── not-found.tsx        # Página 404
│   │   └── globals.css          # Estilos globais
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Layout.tsx
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Table.tsx
│   │   └── Loading.tsx
│   │
│   ├── contexts/                # Context API
│   │   └── AuthContext.tsx     # Autenticação global
│   │
│   ├── services/                # Serviços de API
│   │   ├── api.ts              # Config Axios
│   │   ├── authService.ts
│   │   ├── usuarioService.ts
│   │   ├── contaService.ts
│   │   ├── transacaoService.ts
│   │   └── metaService.ts
│   │
│   └── types/                   # TypeScript types
│       └── index.ts             # Tipos das entidades
│
├── package.json
├── tsconfig.json
├── next.config.js
├── .env.example
├── .env.local
├── .gitignore
└── README.md
```


## 🎨 Funcionalidades

### Dashboard
- **Visão geral financeira**
  - Saldo total de todas as contas
  - Número de contas ativas
  - Transações recentes
  - Metas em andamento
- **Cards estatísticos** com ícones
- **Gráficos de progresso** para metas

### Gestão de Contas
- Listar todas as contas bancárias
- Visualizar detalhes completos
- Cadastrar nova conta (banco, agência, número, tipo, saldo)
- Editar informações da conta
- Ativar/desativar conta
- Remover conta

### Gestão de Transações
- Listar transações com filtros
  - Filtro por tipo (entrada/saída)
  - Filtro por status (pendente/concluída/cancelada)
- Categorização de transações
- Registro de método de pagamento
- Visualização detalhada
- Edição de transações
- Remoção de transações

### Gestão de Metas
- Listar metas em formato de cards
- Visualizar progresso com barra de percentual
- Criar meta com:
  - Nome e descrição
  - Valor objetivo
  - Data limite
  - Prioridade (alta/média/baixa)
- Acompanhar evolução
- Editar metas existentes
- Remover metas

### Gestão de Usuários
- Listar usuários cadastrados
- Visualizar perfil completo
- Cadastrar novo usuário
- Atualizar dados cadastrais
- Remover usuário

## 🧩 Componentes Reutilizáveis

### Layout
Componente de layout principal com:
- Header com navegação
- Menu de usuário
- Footer
- Proteção de rotas

### Card
Container estilizado para conteúdo:
- Título opcional
- Estilos customizáveis
- Sombra e bordas arredondadas

### Button
Botão customizável com variantes:
- `primary` - Azul (ação principal)
- `secondary` - Cinza (ação secundária)
- `danger` - Vermelho (ações destrutivas)
- `success` - Verde (confirmações)

### Table
Tabela genérica com tipagem TypeScript:
- Colunas configuráveis
- Renderização customizada de células
- Eventos de clique em linhas
- Mensagem para lista vazia

### Loading
Componente de carregamento:
- Spinner animado
- Mensagem customizável
- Centralização automática

## 🔌 Integração com Backend

### Configuração de API

O projeto usa Axios com interceptors para:
- Adicionar headers de autenticação
- Tratar erros globalmente
- Redirecionar em caso de não autorização

### Endpoints Esperados

O backend Java deve expor os seguintes endpoints:

#### Autenticação
- `POST /api/usuarios/login` - Login

#### Usuários
- `GET /api/usuarios` - Listar
- `GET /api/usuarios/:id` - Buscar por ID
- `GET /api/usuarios/email/:email` - Buscar por email
- `GET /api/usuarios/cpf/:cpf` - Buscar por CPF
- `POST /api/usuarios` - Criar
- `PUT /api/usuarios/:id` - Atualizar
- `DELETE /api/usuarios/:id` - Remover

#### Contas
- `GET /api/contas` - Listar
- `GET /api/contas/:id` - Buscar por ID
- `GET /api/contas/usuario/:usuarioId` - Buscar por usuário
- `POST /api/contas` - Criar
- `PUT /api/contas/:id` - Atualizar
- `DELETE /api/contas/:id` - Remover

#### Transações
- `GET /api/transacoes` - Listar
- `GET /api/transacoes/:id` - Buscar por ID
- `GET /api/transacoes/conta/:contaId` - Buscar por conta
- `GET /api/transacoes/tipo/:tipo` - Buscar por tipo
- `GET /api/transacoes/categoria/:categoria` - Buscar por categoria
- `GET /api/transacoes/status/:status` - Buscar por status
- `POST /api/transacoes` - Criar
- `PUT /api/transacoes/:id` - Atualizar
- `DELETE /api/transacoes/:id` - Remover

#### Metas
- `GET /api/metas` - Listar
- `GET /api/metas/:id` - Buscar por ID
- `GET /api/metas/usuario/:usuarioId` - Buscar por usuário
- `GET /api/metas/status/:status` - Buscar por status
- `GET /api/metas/prioridade/:prioridade` - Buscar por prioridade
- `POST /api/metas` - Criar
- `PUT /api/metas/:id` - Atualizar
- `DELETE /api/metas/:id` - Remover

### CORS

O backend Java deve permitir requisições do frontend:



## 🎓 Exemplos de Uso

### Fazer Login
1. Acesse `http://localhost:3000/login`
2. Digite email e senha
3. Clique em "Entrar"
http://localhost:3000
Faça login de teste
📧 Email: joao.silva@email.com
🔑 Senha: senha123
4. Será redirecionado para o dashboard

### Cadastrar uma Conta
1. Acesse "Contas" no menu
2. Clique em "+ Nova Conta"
3. Preencha os dados (banco, agência, número, tipo, saldo)
4. Clique em "Cadastrar"

### Registrar uma Transação
1. Acesse "Transações" no menu
2. Clique em "+ Nova Transação"
3. Selecione a conta
4. Escolha tipo (entrada/saída)
5. Preencha categoria, descrição, valor
6. Selecione método de pagamento
7. Clique em "Cadastrar"

### Criar uma Meta
1. Acesse "Metas" no menu
2. Clique em "+ Nova Meta"
3. Defina nome, descrição
4. Estabeleça valor objetivo
5. Defina data limite
6. Escolha prioridade
7. Clique em "Cadastrar"


## 🤝 Contribuindo

Desenvolvido para o curso de Análise e Desenvolvimento de Sistemas - FIAP

---

**⚡ FinTech Planejare** - Gestão Financeira Inteligente
