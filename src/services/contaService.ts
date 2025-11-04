import api from './api';
import { Conta } from '@/types';

export const contaService = {
  // Listar todas as contas
  async listar(): Promise<Conta[]> {
    const response = await api.get('/contas');
    return response.data;
  },

  // Pesquisar conta por ID
  async pesquisar(id: number): Promise<Conta> {
    const response = await api.get(`/contas/${id}`);
    return response.data;
  },

  // Pesquisar contas por usuário
  async pesquisarPorUsuario(usuarioId: number): Promise<Conta[]> {
    const response = await api.get(`/contas/usuario/${usuarioId}`);
    return response.data;
  },

  // Cadastrar nova conta
  async cadastrar(conta: Omit<Conta, 'id'>): Promise<Conta> {
    const response = await api.post('/contas', conta);
    return response.data;
  },

  // Atualizar conta
  async atualizar(id: number, conta: Conta): Promise<Conta> {
    const response = await api.put(`/contas/${id}`, conta);
    return response.data;
  },

  // Remover conta
  async remover(id: number): Promise<void> {
    await api.delete(`/contas/${id}`);
  },
};
