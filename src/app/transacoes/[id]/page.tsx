'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { transacaoService } from '@/services/transacaoService';
import { contaService } from '@/services/contaService';
import { Transacao, Conta } from '@/types';
import { formatDate, formatCurrency } from '@/utils/formatters';

export default function VisualizarTransacaoPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [transacao, setTransacao] = useState<Transacao | null>(null);
    const [conta, setConta] = useState<Conta | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user && params.id) {
            loadTransacao();
        }
    }, [user, authLoading, params.id, router]);

    const loadTransacao = async () => {
        try {
            setLoading(true);
            const id = parseInt(params.id as string);

            const transacaoData = await transacaoService.pesquisar(id);
            setTransacao(transacaoData);

            try {
                const contaData = await contaService.pesquisar(transacaoData.contaId);
                setConta(contaData);
            } catch (error) {
                console.log('Erro ao buscar conta:', error);
            }
        } catch (error) {
            console.error('Erro ao carregar transação:', error);
            alert('Erro ao carregar transação');
            router.push('/transacoes');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!transacao) return;

        if (window.confirm('Tem certeza que deseja remover esta transação?')) {
            try {
                await transacaoService.remover(transacao.id);
                alert('Transação removida com sucesso!');
                router.push('/transacoes');
            } catch (error) {
                console.error('Erro ao remover transação:', error);
                alert('Erro ao remover transação');
            }
        }
    };

    if (authLoading || loading) {
        return (
            <Layout>
                <Loading message="Carregando transação..." />
            </Layout>
        );
    }

    if (!transacao) {
        return (
            <Layout>
                <Card>
                    <p style={{ textAlign: 'center', color: '#666' }}>
                        Transação não encontrada
                    </p>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Button onClick={() => router.push('/transacoes')}>
                            Voltar para Transações
                        </Button>
                    </div>
                </Card>
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
                <h1 style={{ fontSize: '2rem', color: '#333' }}>
                    Detalhes da Transação
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        variant="secondary"
                        onClick={() => router.push('/transacoes')}
                    >
                        ← Voltar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => router.push(`/transacoes/${transacao.id}/editar`)}
                    >
                        ✏️ Editar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        🗑️ Remover
                    </Button>
                </div>
            </div>

            <Card>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            color: '#333',
                            borderBottom: '2px solid #1a73e8',
                            paddingBottom: '0.5rem'
                        }}>
                            Informações Gerais
                        </h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                ID
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                #{transacao.id}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Descrição
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {transacao.descricao}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Categoria
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {transacao.categoria}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Data
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {formatDate(transacao.dataTransacao)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            color: '#333',
                            borderBottom: '2px solid #1a73e8',
                            paddingBottom: '0.5rem'
                        }}>
                            Valores e Status
                        </h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Tipo
                            </label>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                backgroundColor: transacao.tipo === 'entrada' ? '#d4edda' : '#f8d7da',
                                color: transacao.tipo === 'entrada' ? '#155724' : '#721c24'
                            }}>
                                {transacao.tipo === 'entrada' ? '⬇️ Entrada' : '⬆️ Saída'}
                            </span>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Valor
                            </label>
                            <p style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: transacao.tipo === 'entrada' ? '#28a745' : '#dc3545'
                            }}>
                                {transacao.tipo === 'entrada' ? '+' : '-'} {formatCurrency(transacao.valor)}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Status
                            </label>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                backgroundColor:
                                    transacao.status === 'concluida' ? '#d4edda' :
                                        transacao.status === 'pendente' ? '#fff3cd' : '#f8d7da',
                                color:
                                    transacao.status === 'concluida' ? '#155724' :
                                        transacao.status === 'pendente' ? '#856404' : '#721c24'
                            }}>
                                {transacao.status.charAt(0).toUpperCase() + transacao.status.slice(1)}
                            </span>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Método de Pagamento
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {transacao.metodoPagamento}
                            </p>
                        </div>
                    </div>

                    {conta && (
                        <div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                marginBottom: '1.5rem',
                                color: '#333',
                                borderBottom: '2px solid #1a73e8',
                                paddingBottom: '0.5rem'
                            }}>
                                Conta Vinculada
                            </h3>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    color: '#666',
                                    marginBottom: '0.25rem'
                                }}>
                                    Banco
                                </label>
                                <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                    {conta.banco}
                                </p>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    color: '#666',
                                    marginBottom: '0.25rem'
                                }}>
                                    Agência / Conta
                                </label>
                                <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                    {conta.agencia} / {conta.numeroConta}
                                </p>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    color: '#666',
                                    marginBottom: '0.25rem'
                                }}>
                                    Tipo de Conta
                                </label>
                                <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                    {conta.tipoConta}
                                </p>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    color: '#666',
                                    marginBottom: '0.25rem'
                                }}>
                                    Saldo Atual
                                </label>
                                <p style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: '#1a73e8'
                                }}>
                                    {formatCurrency(conta.saldo)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </Layout>
    );
}