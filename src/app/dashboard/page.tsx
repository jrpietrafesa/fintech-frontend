'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import { contaService } from '@/services/contaService';
import { transacaoService } from '@/services/transacaoService';
import { metaService } from '@/services/metaService';
import { Conta, Transacao, Meta } from '@/types';
import { formatDate, formatCurrency } from '@/utils/formatters';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contas, setContas] = useState<Conta[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [stats, setStats] = useState({
    saldoTotal: 0,
    totalContas: 0,
    transacoesRecentes: 0,
    metasAtivas: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadDashboardData();
    }
  }, [user, authLoading, router]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Carregar contas do usuário
      const contasData = await contaService.pesquisarPorUsuario(user.id);
      setContas(contasData);

      // Calcular saldo total
      const saldoTotal = contasData.reduce((acc, conta) => acc + conta.saldo, 0);

      // Carregar transações recentes (últimas 5)
      const todasTransacoes = await transacaoService.listar();
      const transacoesUsuario = todasTransacoes.filter(t =>
        contasData.some(c => c.id === t.contaId)
      ).slice(0, 5);
      setTransacoes(transacoesUsuario);

      // Carregar metas do usuário
      const metasData = await metaService.pesquisarPorUsuario(user.id);
      const metasAtivas = metasData.filter(m => m.status === 'em_andamento');
      setMetas(metasAtivas);

      setStats({
        saldoTotal,
        totalContas: contasData.length,
        transacoesRecentes: transacoesUsuario.length,
        metasAtivas: metasAtivas.length,
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <Loading message="Carregando dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
        Bem-vindo, {user?.nome}! 👋
      </h1>

      {/* Cards de Estatísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              Saldo Total
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1a73e8' }}>
              R$ {stats.saldoTotal.toFixed(2)}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏦</div>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              Total de Contas
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#28a745' }}>
              {stats.totalContas}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              Transações Recentes
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.transacoesRecentes}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              Metas Ativas
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#dc3545' }}>
              {stats.metasAtivas}
            </div>
          </div>
        </Card>
      </div>

      {/* Transações Recentes */}
      <Card title="Transações Recentes" style={{ marginBottom: '2rem' }}>
        {transacoes.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
            Nenhuma transação encontrada
          </p>
        ) : (
          <div>
            {transacoes.map((transacao) => (
              <div
                key={transacao.id}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {transacao.descricao}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {transacao.categoria} • {transacao.metodoPagamento}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.25rem' }}>
                    {formatDate(transacao.dataTransacao)}
                  </div>
                </div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: transacao.tipo === 'entrada' ? '#28a745' : '#dc3545'
                }}>
                  {transacao.tipo === 'entrada' ? '+' : '-'} {formatCurrency(transacao.valor)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Metas em Andamento */}
      <Card title="Metas em Andamento">
        {metas.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
            Nenhuma meta ativa
          </p>
        ) : (
          <div>
            {metas.map((meta) => (
              <div
                key={meta.id}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #eee'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ fontWeight: '500' }}>{meta.nome}</div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    R$ {meta.valorAtual.toFixed(2)} / R$ {meta.valorObjetivo.toFixed(2)}
                  </div>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${meta.porcentagemConcluida}%`,
                    backgroundColor: '#1a73e8',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#666',
                  marginTop: '0.25rem'
                }}>
                  {meta.porcentagemConcluida.toFixed(1)}% concluída
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Layout>
  );
}
