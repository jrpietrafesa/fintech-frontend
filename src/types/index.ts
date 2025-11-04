// Tipos baseados nas entidades Java do backend

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  rendaMensal: number;
  senha?: string;
  dataCadastro?: string;
}

export interface Conta {
  id: number;
  usuarioId: number;
  banco: string;
  agencia: string;
  numeroConta: string;
  tipoConta: string; // corrente, poupança, investimento
  saldo: number;
  ativa: boolean;
  dataAbertura?: string;
}

export interface Transacao {
  id: number;
  contaId: number;
  tipo: string; // entrada, saida
  categoria: string;
  descricao: string;
  valor: number;
  status: string; // pendente, concluída, cancelada
  metodoPagamento: string; // débito, crédito, pix, dinheiro
  dataTransacao?: string;
}

export interface Meta {
  id: number;
  usuarioId: number;
  nome: string;
  descricao: string;
  valorObjetivo: number;
  valorAtual: number;
  porcentagemConcluida: number;
  dataInicio?: string;
  dataObjetivo: string;
  status: string; // em_andamento, concluida, pausada, cancelada
  prioridade: string; // alta, media, baixa
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
