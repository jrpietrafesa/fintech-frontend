'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { contaService } from '@/services/contaService';

export default function NovaContaPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    banco: '',
    agencia: '',
    numeroConta: '',
    tipoConta: 'corrente',
    saldo: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await contaService.cadastrar({
        ...formData,
        usuarioId: user.id,
        ativa: true,
      });
      alert('Conta cadastrada com sucesso!');
      router.push('/contas');
    } catch (error) {
      console.error('Erro ao cadastrar conta:', error);
      alert('Erro ao cadastrar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'saldo' ? parseFloat(value) || 0 : value
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
          Nova Conta Bancária
        </h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Banco *</label>
              <input
                type="text"
                name="banco"
                value={formData.banco}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Ex: Banco do Brasil"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Agência *</label>
              <input
                type="text"
                name="agencia"
                value={formData.agencia}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Ex: 0001"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Número da Conta *</label>
              <input
                type="text"
                name="numeroConta"
                value={formData.numeroConta}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Ex: 123456-7"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Tipo de Conta *</label>
              <select
                name="tipoConta"
                value={formData.tipoConta}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="corrente">Corrente</option>
                <option value="poupanca">Poupança</option>
                <option value="investimento">Investimento</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Saldo Inicial</label>
              <input
                type="number"
                name="saldo"
                value={formData.saldo}
                onChange={handleChange}
                step="0.01"
                min="0"
                style={inputStyle}
                placeholder="0.00"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit" disabled={loading} style={{ flex: 1 }}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/contas')}
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
