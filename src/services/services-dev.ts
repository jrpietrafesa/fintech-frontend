// ⚠️ VERSÃO DESENVOLVIMENTO - Services com dados MOCK
// Substitua os arquivos em src/services/ por estes para testar SEM backend

import api from './api';
import { Conta, Transacao, Meta } from '@/types';

const DEV_MODE = true; // Mude para false quando o backend estiver pronto

// ========================================
// DADOS MOCK PARA DESENVOLVIMENTO
// ========================================

const MOCK_CONTAS: Conta[] = [
  {
    id: 1,
    usuarioId: 1,
    banco: "Banco do Brasil",
    agencia: "0001",
    numeroConta: "123456-7",
    tipoConta: "corrente",
    saldo: 5420.50,
    ativa: true,
    dataAbertura: "2024-01-15"
  },
  {
    id: 2,
    usuarioId: 1,
    banco: "Nubank",
    agencia: "0001",
    numeroConta: "789012-3",
    tipoConta: "poupanca",
    saldo: 12500.00,
    ativa: true,
    dataAbertura: "2024-02-10"
  },
  {
    id: 3,
    usuarioId: 1,
    banco: "Itaú",
    agencia: "4321",
    numeroConta: "654321-0",
    tipoConta: "investimento",
    saldo: 8750.30,
    ativa: true,
    dataAbertura: "2023-11-20"
  }
];

const MOCK_TRANSACOES: Transacao[] = [
  {
    id: 1,
    contaId: 1,
    tipo: "saida",
    categoria: "Alimentação",
    descricao: "Supermercado Extra",
    valor: 350.50,
    status: "concluida",
    metodoPagamento: "debito",
    dataTransacao: "2024-10-28"
  },
  {
    id: 2,
    contaId: 1,
    tipo: "entrada",
    categoria: "Salário",
    descricao: "Salário Mensal",
    valor: 5000.00,
    status: "concluida",
    metodoPagamento: "pix",
    dataTransacao: "2024-10-25"
  },
  {
    id: 3,
    contaId: 2,
    tipo: "saida",
    categoria: "Transporte",
    descricao: "Uber para trabalho",
    valor: 45.30,
    status: "concluida",
    metodoPagamento: "credito",
    dataTransacao: "2024-10-27"
  },
  {
    id: 4,
    contaId: 1,
    tipo: "saida",
    categoria: "Lazer",
    descricao: "Cinema",
    valor: 80.00,
    status: "pendente",
    metodoPagamento: "pix",
    dataTransacao: "2024-10-29"
  },
  {
    id: 5,
    contaId: 3,
    tipo: "entrada",
    categoria: "Investimento",
    descricao: "Rendimento da poupança",
    valor: 125.50,
    status: "concluida",
    metodoPagamento: "pix",
    dataTransacao: "2024-10-26"
  }
];

const MOCK_METAS: Meta[] = [
  {
    id: 1,
    usuarioId: 1,
    nome: "Viagem para Europa",
    descricao: "Economizar para viagem de férias em julho",
    valorObjetivo: 15000.00,
    valorAtual: 8500.00,
    porcentagemConcluida: 56.67,
    dataInicio: "2024-01-01",
    dataObjetivo: "2025-07-01",
    status: "em_andamento",
    prioridade: "alta"
  },
  {
    id: 2,
    usuarioId: 1,
    nome: "Fundo de Emergência",
    descricao: "Reserva financeira para emergências",
    valorObjetivo: 20000.00,
    valorAtual: 12500.00,
    porcentagemConcluida: 62.5,
    dataInicio: "2024-03-15",
    dataObjetivo: "2025-12-31",
    status: "em_andamento",
    prioridade: "alta"
  },
  {
    id: 3,
    usuarioId: 1,
    nome: "Notebook Novo",
    descricao: "Comprar notebook para trabalho",
    valorObjetivo: 5000.00,
    valorAtual: 3200.00,
    porcentagemConcluida: 64.0,
    dataInicio: "2024-06-01",
    dataObjetivo: "2024-12-15",
    status: "em_andamento",
    prioridade: "media"
  },
  {
    id: 4,
    usuarioId: 1,
    nome: "Curso de Inglês",
    descricao: "Investir em educação",
    valorObjetivo: 3000.00,
    valorAtual: 900.00,
    porcentagemConcluida: 30.0,
    dataInicio: "2024-08-01",
    dataObjetivo: "2025-02-28",
    status: "em_andamento",
    prioridade: "baixa"
  }
];

// ========================================
// SERVIÇOS COM MODO DESENVOLVIMENTO
// ========================================

export const contaService = {
  async listar(): Promise<Conta[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...MOCK_CONTAS];
    }
    const response = await api.get('/contas');
    return response.data;
  },

  async pesquisar(id: number): Promise<Conta> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const conta = MOCK_CONTAS.find(c => c.id === id);
      if (!conta) throw new Error('Conta não encontrada');
      return conta;
    }
    const response = await api.get(`/contas/${id}`);
    return response.data;
  },

  async pesquisarPorUsuario(usuarioId: number): Promise<Conta[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_CONTAS.filter(c => c.usuarioId === usuarioId);
    }
    const response = await api.get(`/contas/usuario/${usuarioId}`);
    return response.data;
  },

  async cadastrar(conta: Omit<Conta, 'id'>): Promise<Conta> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novaConta = { ...conta, id: MOCK_CONTAS.length + 1 };
      MOCK_CONTAS.push(novaConta as Conta);
      return novaConta as Conta;
    }
    const response = await api.post('/contas', conta);
    return response.data;
  },

  async atualizar(id: number, conta: Conta): Promise<Conta> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = MOCK_CONTAS.findIndex(c => c.id === id);
      if (index !== -1) {
        MOCK_CONTAS[index] = conta;
      }
      return conta;
    }
    const response = await api.put(`/contas/${id}`, conta);
    return response.data;
  },

  async remover(id: number): Promise<void> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = MOCK_CONTAS.findIndex(c => c.id === id);
      if (index !== -1) {
        MOCK_CONTAS.splice(index, 1);
      }
      return;
    }
    await api.delete(`/contas/${id}`);
  },
};

export const transacaoService = {
  async listar(): Promise<Transacao[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...MOCK_TRANSACOES];
    }
    const response = await api.get('/transacoes');
    return response.data;
  },

  async pesquisar(id: number): Promise<Transacao> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const transacao = MOCK_TRANSACOES.find(t => t.id === id);
      if (!transacao) throw new Error('Transação não encontrada');
      return transacao;
    }
    const response = await api.get(`/transacoes/${id}`);
    return response.data;
  },

  async pesquisarPorConta(contaId: number): Promise<Transacao[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_TRANSACOES.filter(t => t.contaId === contaId);
    }
    const response = await api.get(`/transacoes/conta/${contaId}`);
    return response.data;
  },

  async pesquisarPorTipo(tipo: string): Promise<Transacao[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_TRANSACOES.filter(t => t.tipo === tipo);
    }
    const response = await api.get(`/transacoes/tipo/${tipo}`);
    return response.data;
  },

  async pesquisarPorCategoria(categoria: string): Promise<Transacao[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_TRANSACOES.filter(t => t.categoria === categoria);
    }
    const response = await api.get(`/transacoes/categoria/${categoria}`);
    return response.data;
  },

  async pesquisarPorStatus(status: string): Promise<Transacao[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_TRANSACOES.filter(t => t.status === status);
    }
    const response = await api.get(`/transacoes/status/${status}`);
    return response.data;
  },

  async cadastrar(transacao: Omit<Transacao, 'id'>): Promise<Transacao> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novaTransacao = { ...transacao, id: MOCK_TRANSACOES.length + 1 };
      MOCK_TRANSACOES.push(novaTransacao as Transacao);
      return novaTransacao as Transacao;
    }
    const response = await api.post('/transacoes', transacao);
    return response.data;
  },

  async atualizar(id: number, transacao: Transacao): Promise<Transacao> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = MOCK_TRANSACOES.findIndex(t => t.id === id);
      if (index !== -1) {
        MOCK_TRANSACOES[index] = transacao;
      }
      return transacao;
    }
    const response = await api.put(`/transacoes/${id}`, transacao);
    return response.data;
  },

  async remover(id: number): Promise<void> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = MOCK_TRANSACOES.findIndex(t => t.id === id);
      if (index !== -1) {
        MOCK_TRANSACOES.splice(index, 1);
      }
      return;
    }
    await api.delete(`/transacoes/${id}`);
  },
};

export const metaService = {
  async listar(): Promise<Meta[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...MOCK_METAS];
    }
    const response = await api.get('/metas');
    return response.data;
  },

  async pesquisar(id: number): Promise<Meta> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const meta = MOCK_METAS.find(m => m.id === id);
      if (!meta) throw new Error('Meta não encontrada');
      return meta;
    }
    const response = await api.get(`/metas/${id}`);
    return response.data;
  },

  async pesquisarPorUsuario(usuarioId: number): Promise<Meta[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_METAS.filter(m => m.usuarioId === usuarioId);
    }
    const response = await api.get(`/metas/usuario/${usuarioId}`);
    return response.data;
  },

  async pesquisarPorStatus(status: string): Promise<Meta[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_METAS.filter(m => m.status === status);
    }
    const response = await api.get(`/metas/status/${status}`);
    return response.data;
  },

  async pesquisarPorPrioridade(prioridade: string): Promise<Meta[]> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_METAS.filter(m => m.prioridade === prioridade);
    }
    const response = await api.get(`/metas/prioridade/${prioridade}`);
    return response.data;
  },

  async cadastrar(meta: Omit<Meta, 'id'>): Promise<Meta> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novaMeta = { ...meta, id: MOCK_METAS.length + 1 };
      MOCK_METAS.push(novaMeta as Meta);
      return novaMeta as Meta;
    }
    const response = await api.post('/metas', meta);
    return response.data;
  },

  async atualizar(id: number, meta: Meta): Promise<Meta> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = MOCK_METAS.findIndex(m => m.id === id);
      if (index !== -1) {
        MOCK_METAS[index] = meta;
      }
      return meta;
    }
    const response = await api.put(`/metas/${id}`, meta);
    return response.data;
  },

  async remover(id: number): Promise<void> {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = MOCK_METAS.findIndex(m => m.id === id);
      if (index !== -1) {
        MOCK_METAS.splice(index, 1);
      }
      return;
    }
    await api.delete(`/metas/${id}`);
  },
};
