import api from './api';
import { Meta } from '@/types';

export const metaService = {
  // Listar todas as metas
  async listar(): Promise<Meta[]> {
    const response = await api.get('/metas');
    return response.data;
  },

  // Pesquisar meta por ID
  async pesquisar(id: number): Promise<Meta> {
    const response = await api.get(`/metas/${id}`);
    return response.data;
  },

  // Pesquisar metas por usuário
  async pesquisarPorUsuario(usuarioId: number): Promise<Meta[]> {
    const response = await api.get(`/metas/usuario/${usuarioId}`);
    return response.data;
  },

  // Pesquisar metas por status
  async pesquisarPorStatus(status: string): Promise<Meta[]> {
    const response = await api.get(`/metas/status/${status}`);
    return response.data;
  },

  // Pesquisar metas por prioridade
  async pesquisarPorPrioridade(prioridade: string): Promise<Meta[]> {
    const response = await api.get(`/metas/prioridade/${prioridade}`);
    return response.data;
  },

  // Cadastrar nova meta
  async cadastrar(meta: Omit<Meta, 'id'>): Promise<Meta> {
    const response = await api.post('/metas', meta);
    return response.data;
  },

  // Atualizar meta
  async atualizar(id: number, meta: Meta): Promise<Meta> {
    const response = await api.put(`/metas/${id}`, meta);
    return response.data;
  },

  // Remover meta
  async remover(id: number): Promise<void> {
    await api.delete(`/metas/${id}`);
  },
};
