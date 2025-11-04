'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { metaService } from '@/services/metaService';
import { Meta } from '@/types';
import { formatDate, formatCurrency } from '@/utils/formatters';

export default function VisualizarMetaPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState<Meta | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user && params.id) {
            loadMeta();
        }
    }, [user, authLoading, params.id, router]);

    const loadMeta = async () => {
        try {
            setLoading(true);
            const id = parseInt(params.id as string);
            const metaData = await metaService.pesquisar(id);
            setMeta(metaData);
        } catch (error) {
            console.error('Erro ao carregar meta:', error);
            alert('Erro ao carregar meta');
            router.push('/metas');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!meta) return;

        if (window.confirm('Tem certeza que deseja remover esta meta?')) {
            try {
                await metaService.remover(meta.id);
                alert('Meta removida com sucesso!');
                router.push('/metas');
            } catch (error) {
                console.error('Erro ao remover meta:', error);
                alert('Erro ao remover meta');
            }
        }
    };

    if (authLoading || loading) {
        return (
            <Layout>
                <Loading message="Carregando meta..." />
            </Layout>
        );
    }

    if (!meta) {
        return (
            <Layout>
                <Card>
                    <p style={{ textAlign: 'center', color: '#666' }}>
                        Meta não encontrada
                    </p>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Button onClick={() => router.push('/metas')}>
                            Voltar para Metas
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
                    Detalhes da Meta
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        variant="secondary"
                        onClick={() => router.push('/metas')}
                    >
                        ← Voltar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => router.push(`/metas/${meta.id}/editar`)}
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {/* Coluna 1 - Informações Gerais */}
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
                                Nome da Meta
                            </label>
                            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#333' }}>
                                {meta.nome}
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
                            <p style={{ fontSize: '1rem', color: '#555' }}>
                                {meta.descricao || 'Sem descrição'}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Prioridade
                            </label>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                backgroundColor:
                                    meta.prioridade === 'alta' ? '#fee' :
                                        meta.prioridade === 'media' ? '#ffc' : '#efe',
                                color:
                                    meta.prioridade === 'alta' ? '#c00' :
                                        meta.prioridade === 'media' ? '#960' : '#060'
                            }}>
                                {meta.prioridade.charAt(0).toUpperCase() + meta.prioridade.slice(1)}
                            </span>
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
                                    meta.status === 'concluida' ? '#d4edda' :
                                        meta.status === 'em_andamento' ? '#d1ecf1' : '#f8d7da',
                                color:
                                    meta.status === 'concluida' ? '#155724' :
                                        meta.status === 'em_andamento' ? '#0c5460' : '#721c24'
                            }}>
                                {meta.status === 'em_andamento' ? 'Em Andamento' :
                                    meta.status.charAt(0).toUpperCase() + meta.status.slice(1)}
                            </span>
                        </div>
                    </div>

                    {/* Coluna 2 - Valores e Progresso */}
                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            color: '#333',
                            borderBottom: '2px solid #1a73e8',
                            paddingBottom: '0.5rem'
                        }}>
                            Progresso
                        </h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem'
                            }}>
                                <span style={{ fontSize: '0.875rem', color: '#666' }}>
                                    Valor Atual
                                </span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a73e8' }}>
                                    {formatCurrency(meta.valorAtual)}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem'
                            }}>
                                <span style={{ fontSize: '0.875rem', color: '#666' }}>
                                    Valor Objetivo
                                </span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#28a745' }}>
                                    {formatCurrency(meta.valorObjetivo)}
                                </span>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                                        Progresso
                                    </span>
                                    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1a73e8' }}>
                                        {meta.porcentagemConcluida.toFixed(1)}%
                                    </span>
                                </div>

                                <div style={{
                                    height: '20px',
                                    backgroundColor: '#e9ecef',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${meta.porcentagemConcluida}%`,
                                        backgroundColor: '#1a73e8',
                                        transition: 'width 0.3s',
                                        borderRadius: '10px'
                                    }} />
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.875rem', color: '#666' }}>
                                    Faltam: {formatCurrency(meta.valorObjetivo - meta.valorAtual)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 3 - Datas */}
                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            color: '#333',
                            borderBottom: '2px solid #1a73e8',
                            paddingBottom: '0.5rem'
                        }}>
                            Prazos
                        </h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Data de Início
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {formatDate(meta.dataInicio)}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Data Objetivo
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {formatDate(meta.dataObjetivo)}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Tempo Restante
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#dc3545' }}>
                                {(() => {
                                    const hoje = new Date();
                                    const objetivo = new Date(meta.dataObjetivo);
                                    const diff = Math.ceil((objetivo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
                                    if (diff < 0) return 'Prazo expirado';
                                    if (diff === 0) return 'Hoje é o prazo!';
                                    return `${diff} dias`;
                                })()}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
}