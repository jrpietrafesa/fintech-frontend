'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { Usuario } from '@/types';

export default function UsuariosPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user) {
            setLoading(false);
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) {
        return (
            <Layout>
                <Loading message="Carregando..." />
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
                    Perfil do Usuário
                </h1>
            </div>

            <Card>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {/* Informações Pessoais */}
                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            color: '#333',
                            borderBottom: '2px solid #1a73e8',
                            paddingBottom: '0.5rem'
                        }}>
                            Informações Pessoais
                        </h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Nome
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {user?.nome}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Email
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {user?.email}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                CPF
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {user?.cpf || 'Não informado'}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Telefone
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {user?.telefone || 'Não informado'}
                            </p>
                        </div>
                    </div>

                    {/* Informações Financeiras */}
                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            color: '#333',
                            borderBottom: '2px solid #1a73e8',
                            paddingBottom: '0.5rem'
                        }}>
                            Informações Financeiras
                        </h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Endereço
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {user?.endereco || 'Não informado'}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Renda Mensal
                            </label>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745' }}>
                                {user?.rendaMensal
                                    ? new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(user.rendaMensal)
                                    : 'Não informado'}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: '#666',
                                marginBottom: '0.25rem'
                            }}>
                                Data de Cadastro
                            </label>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}>
                                {user?.dataCadastro
                                    ? new Date(user.dataCadastro).toLocaleDateString('pt-BR')
                                    : 'Não informado'}
                            </p>
                        </div>
                    </div>

                    {/* Ações */}
                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            color: '#333',
                            borderBottom: '2px solid #1a73e8',
                            paddingBottom: '0.5rem'
                        }}>
                            Ações
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Button
                                onClick={() => alert('Funcionalidade em desenvolvimento')}
                                style={{ width: '100%' }}
                            >
                                ✏️ Editar Perfil
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => alert('Funcionalidade em desenvolvimento')}
                                style={{ width: '100%' }}
                            >
                                🔒 Alterar Senha
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => router.push('/dashboard')}
                                style={{ width: '100%' }}
                            >
                                ← Voltar ao Dashboard
                            </Button>
                        </div>

                        <div style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            <h4 style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '0.5rem'
                            }}>
                                💡 Dica
                            </h4>
                            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
                                Mantenha suas informações sempre atualizadas para ter uma melhor
                                experiência no gerenciamento de suas finanças!
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
}