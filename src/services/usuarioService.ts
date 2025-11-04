import api from './api';
import { Usuario } from '@/types';

export const usuarioService = {
  // Listar todos os usuários
  async listar(): Promise<Usuario[]> {
    const response = await api.get('/usuarios');
    return response.data;
  },

  // Pesquisar usuário por ID
  async pesquisar(id: number): Promise<Usuario> {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Pesquisar usuário por email
  async pesquisarPorEmail(email: string): Promise<Usuario> {
    const response = await api.get(`/usuarios/email/${email}`);
    return response.data;
  },

  // Pesquisar usuário por CPF
  async pesquisarPorCpf(cpf: string): Promise<Usuario> {
    const response = await api.get(`/usuarios/cpf/${cpf}`);
    return response.data;
  },

  // Cadastrar novo usuário
  async cadastrar(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    const response = await api.post('/usuarios', usuario);
    return response.data;
  },

  // Atualizar usuário
  async atualizar(id: number, usuario: Usuario): Promise<Usuario> {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  },

  // Remover usuário
  async remover(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}`);
  },
};
