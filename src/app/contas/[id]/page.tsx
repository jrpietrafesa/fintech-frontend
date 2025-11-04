'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { contaService } from '@/services/contaService';
import { Conta } from '@/types';

export default function ContaDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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

  const detailStyle: React.CSSProperties = {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: '600',
    color: '#666',
    fontSize: '0.875rem',
    marginBottom: '0.25rem'
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    color: '#333'
  };

  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', color: '#333' }}>Detalhes da Conta</h1>
          <Button onClick={() => router.push('/contas')} variant="secondary">
            Voltar
          </Button>
        </div>

        <Card>
          <div style={detailStyle}>
            <div style={labelStyle}>ID</div>
            <div style={valueStyle}>{conta.id}</div>
          </div>

          <div style={detailStyle}>
            <div style={labelStyle}>Banco</div>
            <div style={valueStyle}>{conta.banco}</div>
          </div>

          <div style={detailStyle}>
            <div style={labelStyle}>Agência</div>
            <div style={valueStyle}>{conta.agencia}</div>
          </div>

          <div style={detailStyle}>
            <div style={labelStyle}>Número da Conta</div>
            <div style={valueStyle}>{conta.numeroConta}</div>
          </div>

          <div style={detailStyle}>
            <div style={labelStyle}>Tipo de Conta</div>
            <div style={valueStyle}>
              {conta.tipoConta.charAt(0).toUpperCase() + conta.tipoConta.slice(1)}
            </div>
          </div>

          <div style={detailStyle}>
            <div style={labelStyle}>Saldo</div>
            <div style={{ ...valueStyle, color: '#1a73e8', fontWeight: 'bold' }}>
              R$ {conta.saldo.toFixed(2)}
            </div>
          </div>

          <div style={detailStyle}>
            <div style={labelStyle}>Status</div>
            <div>
              <span style={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: conta.ativa ? '#d4edda' : '#f8d7da',
                color: conta.ativa ? '#155724' : '#721c24',
                fontWeight: '500'
              }}>
                {conta.ativa ? 'Ativa' : 'Inativa'}
              </span>
            </div>
          </div>

          {conta.dataAbertura && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={labelStyle}>Data de Abertura</div>
              <div style={valueStyle}>
                {new Date(conta.dataAbertura).toLocaleDateString('pt-BR')}
              </div>
            </div>
          )}

          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '2px solid #eee',
            display: 'flex',
            gap: '1rem'
          }}>
            <Button
              onClick={() => router.push(`/contas/${conta.id}/editar`)}
              style={{ flex: 1 }}
            >
              Editar
            </Button>
            <Button
              onClick={() => router.push('/contas')}
              variant="secondary"
              style={{ flex: 1 }}
            >
              Voltar para Lista
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
