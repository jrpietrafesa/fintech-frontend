'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { contaService } from '@/services/contaService';
import { Conta } from '@/types';

export default function EditarContaPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [conta, setConta] = useState<Conta | null>(null);

  useEffect(() => {
    if (params.id) {
      loadConta(Number(params.id));
    }
  }, [params.id]);

  const loadConta = async (id: number) => {
    try {
      setLoading(true);
      const data = await contaService.pesquisar(id);
      setConta(data);
    } catch (error) {
      console.error('Erro ao carregar conta:', error);
      alert('Erro ao carregar conta');
      router.push('/contas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!conta) return;

    setSaving(true);
    try {
      await contaService.atualizar(conta.id, conta);
      alert('Conta atualizada com sucesso!');
      router.push('/contas');
    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
      alert('Erro ao atualizar conta');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!conta) return;
    const { name, value, type } = e.target;
    
    setConta(prev => {
      if (!prev) return prev;
      
      if (type === 'checkbox') {
        return { ...prev, [name]: (e.target as HTMLInputElement).checked };
      }
      
      return {
        ...prev,
        [name]: name === 'saldo' ? parseFloat(value) || 0 : value
      };
    });
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

  if (loading) {
    return (
      <Layout>
        <Loading message="Carregando conta..." />
      </Layout>
    );
  }

  if (!conta) {
    return (
      <Layout>
        <Card>
          <p>Conta não encontrada</p>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
          Editar Conta
        </h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Banco *</label>
              <input
                type="text"
                name="banco"
                value={conta.banco}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Agência *</label>
              <input
                type="text"
                name="agencia"
                value={conta.agencia}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Número da Conta *</label>
              <input
                type="text"
                name="numeroConta"
                value={conta.numeroConta}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Tipo de Conta *</label>
              <select
                name="tipoConta"
                value={conta.tipoConta}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="corrente">Corrente</option>
                <option value="poupanca">Poupança</option>
                <option value="investimento">Investimento</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Saldo</label>
              <input
                type="number"
                name="saldo"
                value={conta.saldo}
                onChange={handleChange}
                step="0.01"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  name="ativa"
                  checked={conta.ativa}
                  onChange={handleChange}
                  style={{ width: 'auto' }}
                />
                <span style={{ fontWeight: '500', color: '#333' }}>Conta Ativa</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit" disabled={saving} style={{ flex: 1 }}>
                {saving ? 'Salvando...' : 'Salvar'}
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
