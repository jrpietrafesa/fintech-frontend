import api from './api';
import { Transacao } from '@/types';

export const transacaoService = {
  // Listar todas as transações
  async listar(): Promise<Transacao[]> {
    const response = await api.get('/transacoes');
    return response.data;
  },

  // Pesquisar transação por ID
  async pesquisar(id: number): Promise<Transacao> {
    const response = await api.get(`/transacoes/${id}`);
    return response.data;
  },

  // Pesquisar transações por conta
  async pesquisarPorConta(contaId: number): Promise<Transacao[]> {
    const response = await api.get(`/transacoes/conta/${contaId}`);
    return response.data;
  },

  // Pesquisar transações por tipo
  async pesquisarPorTipo(tipo: string): Promise<Transacao[]> {
    const response = await api.get(`/transacoes/tipo/${tipo}`);
    return response.data;
  },

  // Pesquisar transações por categoria
  async pesquisarPorCategoria(categoria: string): Promise<Transacao[]> {
    const response = await api.get(`/transacoes/categoria/${categoria}`);
    return response.data;
  },

  // Pesquisar transações por status
  async pesquisarPorStatus(status: string): Promise<Transacao[]> {
    const response = await api.get(`/transacoes/status/${status}`);
    return response.data;
  },

  // Cadastrar nova transação
  async cadastrar(transacao: Omit<Transacao, 'id'>): Promise<Transacao> {
    const response = await api.post('/transacoes', transacao);
    return response.data;
  },

  // Atualizar transação
  async atualizar(id: number, transacao: Transacao): Promise<Transacao> {
    const response = await api.put(`/transacoes/${id}`, transacao);
    return response.data;
  },

  // Remover transação
  async remover(id: number): Promise<void> {
    await api.delete(`/transacoes/${id}`);
  },
};
