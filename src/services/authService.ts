import api from './api';
import { Usuario, LoginRequest } from '@/types';

export const authService = {
  // Login do usuário
  async login(credentials: LoginRequest): Promise<Usuario> {
    try {
      const response = await api.post('/usuarios/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  // Obter usuário atual do localStorage
  getCurrentUser(): Usuario | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // Salvar usuário no localStorage
  setCurrentUser(user: Usuario) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
};