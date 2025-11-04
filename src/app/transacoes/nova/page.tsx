'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { transacaoService } from '@/services/transacaoService';
import { contaService } from '@/services/contaService';
import { Conta } from '@/types';

export default function NovaTransacaoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contas, setContas] = useState<Conta[]>([]);
  const [formData, setFormData] = useState({
    contaId: 0,
    tipo: 'saida',
    categoria: '',
    descricao: '',
    valor: 0,
    metodoPagamento: 'pix',
    status: 'pendente'
  });

  useEffect(() => {
    if (user) {
      loadContas();
    }
  }, [user]);

  const loadContas = async () => {
    if (!user) return;
    try {
      const data = await contaService.pesquisarPorUsuario(user.id);
      setContas(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, contaId: data[0].id }));
      }
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await transacaoService.cadastrar(formData);
      alert('Transação cadastrada com sucesso!');
      router.push('/transacoes');
    } catch (error) {
      console.error('Erro ao cadastrar transação:', error);
      alert('Erro ao cadastrar transação');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor' || name === 'contaId' ? parseFloat(value) || 0 : value
    }));
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333'
  };

  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
          Nova Transação
        </h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Conta *</label>
              <select
                name="contaId"
                value={formData.contaId}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="0">Selecione uma conta</option>
                {contas.map(conta => (
                  <option key={conta.id} value={conta.id}>
                    {conta.banco} - {conta.numeroConta}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Tipo *</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Categoria *</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Ex: Alimentação, Salário, etc."
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Descrição *</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                placeholder="Descreva a transação"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Valor *</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                style={inputStyle}
                placeholder="0.00"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Método de Pagamento *</label>
              <select
                name="metodoPagamento"
                value={formData.metodoPagamento}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="pix">PIX</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="pendente">Pendente</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit" disabled={loading} style={{ flex: 1 }}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/transacoes')}
                style={{ flex: 1 }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
