'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';
import Loading from '@/components/Loading';
import { contaService } from '@/services/contaService';
import { Conta } from '@/types';

export default function ContasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contas, setContas] = useState<Conta[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadContas();
    }
  }, [user, authLoading, router]);

  const loadContas = async () => {
    try {
      setLoading(true);
      const data = await contaService.listar();
      setContas(data);
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
      alert('Erro ao carregar contas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta conta?')) {
      try {
        await contaService.remover(id);
        alert('Conta removida com sucesso!');
        loadContas();
      } catch (error) {
        console.error('Erro ao remover conta:', error);
        alert('Erro ao remover conta');
      }
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' as keyof Conta },
    { header: 'Banco', accessor: 'banco' as keyof Conta },
    { header: 'Agência', accessor: 'agencia' as keyof Conta },
    { header: 'Número', accessor: 'numeroConta' as keyof Conta },
    { header: 'Tipo', accessor: 'tipoConta' as keyof Conta },
    {
      header: 'Saldo',
      accessor: (conta: Conta) => `R$ ${conta.saldo.toFixed(2)}`
    },
    {
      header: 'Status',
      accessor: (conta: Conta) => (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.875rem',
          backgroundColor: conta.ativa ? '#d4edda' : '#f8d7da',
          color: conta.ativa ? '#155724' : '#721c24'
        }}>
          {conta.ativa ? 'Ativa' : 'Inativa'}
        </span>
      )
    },
    {
      header: 'Ações',
      accessor: (conta: Conta) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="primary"
            onClick={() => router.push(`/contas/${conta.id}`)}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            Ver
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/contas/${conta.id}/editar`)}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(conta.id)}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            Remover
          </Button>
        </div>
      )
    }
  ];

  if (authLoading || loading) {
    return (
      <Layout>
        <Loading message="Carregando contas..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '2rem', color: '#333' }}>Contas Bancárias</h1>
        <Button onClick={() => router.push('/contas/nova')}>
          + Nova Conta
        </Button>
      </div>

      <Card>
        <Table data={contas} columns={columns} />
      </Card>
    </Layout>
  );
}
