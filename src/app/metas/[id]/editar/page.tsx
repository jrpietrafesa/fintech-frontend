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

export default function EditarMetaPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        valorObjetivo: '',
        valorAtual: '',
        dataObjetivo: '',
        prioridade: 'media',
        status: 'em_andamento',
    });

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

            setFormData({
                nome: metaData.nome,
                descricao: metaData.descricao || '',
                valorObjetivo: metaData.valorObjetivo.toString(),
                valorAtual: metaData.valorAtual.toString(),
                dataObjetivo: metaData.dataObjetivo,
                prioridade: metaData.prioridade,
                status: metaData.status,
            });
        } catch (error) {
            console.error('Erro ao carregar meta:', error);
            alert('Erro ao carregar meta');
            router.push('/metas');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nome || !formData.valorObjetivo || !formData.dataObjetivo) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            setSubmitting(true);
            const id = parseInt(params.id as string);

            const valorObjetivo = parseFloat(formData.valorObjetivo);
            const valorAtual = parseFloat(formData.valorAtual);
            const porcentagemConcluida = (valorAtual / valorObjetivo) * 100;

            const meta: Meta = {
                id,
                usuarioId: user!.id,
                nome: formData.nome,
                descricao: formData.descricao,
                valorObjetivo,
                valorAtual,
                porcentagemConcluida,
                dataInicio: '', // mantém o original
                dataObjetivo: formData.dataObjetivo,
                status: formData.status,
                prioridade: formData.prioridade,
            };

            await metaService.atualizar(id, meta);
            alert('Meta atualizada com sucesso!');
            router.push('/metas');
        } catch (error) {
            console.error('Erro ao atualizar meta:', error);
            alert('Erro ao atualizar meta');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (authLoading || loading) {
        return (
            <Layout>
                <Loading message="Carregando meta..." />
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
                    Editar Meta
                </h1>
                <Button
                    variant="secondary"
                    onClick={() => router.push('/metas')}
                >
                    ← Voltar
                </Button>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {/* Nome */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>
                                Nome da Meta *
                            </label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                placeholder="Ex: Viagem para Europa"
                            />
                        </div>

                        {/* Descrição */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                rows={3}
                                style={{ ...inputStyle, resize: 'vertical' }}
                                placeholder="Ex: Economizar para viagem de férias em julho"
                            />
                        </div>

                        {/* Valor Objetivo */}
                        <div>
                            <label style={labelStyle}>
                                Valor Objetivo *
                            </label>
                            <input
                                type="number"
                                name="valorObjetivo"
                                value={formData.valorObjetivo}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>

                        {/* Valor Atual */}
                        <div>
                            <label style={labelStyle}>
                                Valor Atual *
                            </label>
                            <input
                                type="number"
                                name="valorAtual"
                                value={formData.valorAtual}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>

                        {/* Data Objetivo */}
                        <div>
                            <label style={labelStyle}>
                                Data Objetivo *
                            </label>
                            <input
                                type="date"
                                name="dataObjetivo"
                                value={formData.dataObjetivo}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        {/* Prioridade */}
                        <div>
                            <label style={labelStyle}>
                                Prioridade *
                            </label>
                            <select
                                name="prioridade"
                                value={formData.prioridade}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            >
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label style={labelStyle}>
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            >
                                <option value="em_andamento">Em Andamento</option>
                                <option value="concluida">Concluída</option>
                                <option value="pausada">Pausada</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '2rem',
                        justifyContent: 'flex-end'
                    }}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => router.push('/metas')}
                            disabled={submitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={submitting}
                        >
                            {submitting ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
};