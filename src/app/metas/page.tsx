'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { metaService } from '@/services/metaService';
import { Meta } from '@/types';

export default function MetasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [metas, setMetas] = useState<Meta[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadMetas();
    }
  }, [user, authLoading, router]);

  const loadMetas = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await metaService.pesquisarPorUsuario(user.id);
      setMetas(data);
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
      alert('Erro ao carregar metas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta meta?')) {
      try {
        await metaService.remover(id);
        alert('Meta removida com sucesso!');
        loadMetas();
      } catch (error) {
        console.error('Erro ao remover meta:', error);
        alert('Erro ao remover meta');
      }
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <Loading message="Carregando metas..." />
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
        <h1 style={{ fontSize: '2rem', color: '#333' }}>Metas Financeiras</h1>
        <Button onClick={() => router.push('/metas/nova')}>
          + Nova Meta
        </Button>
      </div>

      {metas.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3>Nenhuma meta cadastrada</h3>
            <p style={{ marginTop: '1rem' }}>Comece criando sua primeira meta financeira!</p>
          </div>
        </Card>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {metas.map((meta) => (
            <Card key={meta.id}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#333' }}>
                  {meta.nome}
                </h3>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: 
                    meta.prioridade === 'alta' ? '#fee' :
                    meta.prioridade === 'media' ? '#ffeaa7' : '#dfe6e9',
                  color:
                    meta.prioridade === 'alta' ? '#c33' :
                    meta.prioridade === 'media' ? '#d63031' : '#2d3436'
                }}>
                  {meta.prioridade.toUpperCase()}
                </span>
              </div>

              <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {meta.descricao}
              </p>

              <div style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontWeight: '500' }}>Progresso</span>
                  <span style={{ fontWeight: 'bold', color: '#1a73e8' }}>
                    {meta.porcentagemConcluida.toFixed(1)}%
                  </span>
                </div>
                <div style={{
                  height: '12px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${meta.porcentagemConcluida}%`,
                    backgroundColor: '#1a73e8',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: '#666'
                }}>
                  <span>R$ {meta.valorAtual.toFixed(2)}</span>
                  <span>R$ {meta.valorObjetivo.toFixed(2)}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: '#666',
                marginBottom: '1rem'
              }}>
                <div>
                  <strong>Status:</strong>{' '}
                  <span style={{
                    color: meta.status === 'em_andamento' ? '#1a73e8' : '#28a745'
                  }}>
                    {meta.status === 'em_andamento' ? 'Em andamento' : meta.status}
                  </span>
                </div>
                <div>
                  <strong>Prazo:</strong>{' '}
                  {new Date(meta.dataObjetivo).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant="primary"
                  onClick={() => router.push(`/metas/${meta.id}`)}
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}
                >
                  Ver
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/metas/${meta.id}/editar`)}
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(meta.id)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  ✕
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
