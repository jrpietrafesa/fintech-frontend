'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';
import Loading from '@/components/Loading';
import { transacaoService } from '@/services/transacaoService';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { Transacao } from '@/types';


export default function TransacoesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [filtro, setFiltro] = useState({
    tipo: 'todos',
    status: 'todos'
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadTransacoes();
    }
  }, [user, authLoading, router]);

  const loadTransacoes = async () => {
    try {
      setLoading(true);
      const data = await transacaoService.listar();
      setTransacoes(data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      alert('Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta transação?')) {
      try {
        await transacaoService.remover(id);
        alert('Transação removida com sucesso!');
        loadTransacoes();
      } catch (error) {
        console.error('Erro ao remover transação:', error);
        alert('Erro ao remover transação');
      }
    }
  };

  const transacoesFiltradas = transacoes.filter(t => {
    if (filtro.tipo !== 'todos' && t.tipo !== filtro.tipo) return false;
    if (filtro.status !== 'todos' && t.status !== filtro.status) return false;
    return true;
  });

  const columns = [
    { header: 'ID', accessor: 'id' as keyof Transacao, width: '60px' },
    {
      header: 'Tipo',
      accessor: (t: Transacao) => (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.875rem',
          backgroundColor: t.tipo === 'entrada' ? '#d4edda' : '#f8d7da',
          color: t.tipo === 'entrada' ? '#155724' : '#721c24'
        }}>
          {t.tipo === 'entrada' ? '⬇️ Entrada' : '⬆️ Saída'}
        </span>
      ),
      width: '120px'
    },
    { header: 'Descrição', accessor: 'descricao' as keyof Transacao },
    { header: 'Categoria', accessor: 'categoria' as keyof Transacao },
    {
      header: 'Valor',
      accessor: (t: Transacao) => (
        <span style={{
          fontWeight: 'bold',
          color: t.tipo === 'entrada' ? '#28a745' : '#dc3545'
        }}>
          {formatCurrency(t.valor)}
        </span>
      ),
      width: '120px'
    },
    {
      header: 'Status',
      accessor: (t: Transacao) => (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.875rem',
          backgroundColor:
            t.status === 'concluida' ? '#d4edda' :
              t.status === 'pendente' ? '#fff3cd' : '#f8d7da',
          color:
            t.status === 'concluida' ? '#155724' :
              t.status === 'pendente' ? '#856404' : '#721c24'
        }}>
          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
        </span>
      ),
      width: '120px'
    },
    { header: 'Pagamento', accessor: 'metodoPagamento' as keyof Transacao },

    // ⬇️⬇️⬇️ ADICIONE ESTA COLUNA AQUI ⬇️⬇️⬇️
    {
      header: 'Data',
      accessor: (t: Transacao) => (
        <span style={{ fontSize: '0.875rem', color: '#666' }}>
          {formatDate(t.dataTransacao)}
        </span>
      ),
      width: '110px'
    },
    // ⬆️⬆️⬆️ FIM DA NOVA COLUNA ⬆️⬆️⬆️

    {
      header: 'Ações',
      accessor: (t: Transacao) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="primary"
            onClick={() => router.push(`/transacoes/${t.id}`)}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            Ver
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/transacoes/${t.id}/editar`)}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(t.id)}
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
        <Loading message="Carregando transações..." />
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
        <h1 style={{ fontSize: '2rem', color: '#333' }}>Transações</h1>
        <Button onClick={() => router.push('/transacoes/nova')}>
          + Nova Transação
        </Button>
      </div>

      {/* Filtros */}
      <Card style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              Tipo
            </label>
            <select
              value={filtro.tipo}
              onChange={(e) => setFiltro(prev => ({ ...prev, tipo: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="todos">Todos</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              Status
            </label>
            <select
              value={filtro.status}
              onChange={(e) => setFiltro(prev => ({ ...prev, status: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="concluida">Concluída</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ marginBottom: '1rem', color: '#666' }}>
          Total de transações: {transacoesFiltradas.length}
        </div>
        <Table data={transacoesFiltradas} columns={columns} />
      </Card>
    </Layout>
  );
}
