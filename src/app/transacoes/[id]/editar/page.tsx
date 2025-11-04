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

export default function EditarTransacaoPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [contas, setContas] = useState<Conta[]>([]);
    const [formData, setFormData] = useState({
        contaId: 0,
        tipo: 'entrada',
        categoria: '',
        descricao: '',
        valor: '',
        status: 'pendente',
        metodoPagamento: '',
        dataTransacao: '',
    });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user && params.id) {
            loadData();
        }
    }, [user, authLoading, params.id, router]);

    const loadData = async () => {
        try {
            setLoading(true);
            const id = parseInt(params.id as string);

            // Buscar transação
            const transacaoData = await transacaoService.pesquisar(id);

            // Buscar contas do usuário
            const contasData = await contaService.pesquisarPorUsuario(user!.id);
            setContas(contasData);

            // Preencher formulário
            setFormData({
                contaId: transacaoData.contaId,
                tipo: transacaoData.tipo,
                categoria: transacaoData.categoria,
                descricao: transacaoData.descricao,
                valor: transacaoData.valor.toString(),
                status: transacaoData.status,
                metodoPagamento: transacaoData.metodoPagamento,
                dataTransacao: transacaoData.dataTransacao || '',
            });
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar transação');
            router.push('/transacoes');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.contaId || !formData.categoria || !formData.descricao ||
            !formData.valor || !formData.metodoPagamento) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            setSubmitting(true);
            const id = parseInt(params.id as string);

            const transacao: Transacao = {
                id,
                contaId: formData.contaId,
                tipo: formData.tipo,
                categoria: formData.categoria,
                descricao: formData.descricao,
                valor: parseFloat(formData.valor),
                status: formData.status,
                metodoPagamento: formData.metodoPagamento,
                dataTransacao: formData.dataTransacao,
            };

            await transacaoService.atualizar(id, transacao);
            alert('Transação atualizada com sucesso!');
            router.push('/transacoes');
        } catch (error) {
            console.error('Erro ao atualizar transação:', error);
            alert('Erro ao atualizar transação');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (authLoading || loading) {
        return (
            <Layout>
                <Loading message="Carregando transação..." />
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
                    Editar Transação
                </h1>
                <Button
                    variant="secondary"
                    onClick={() => router.push('/transacoes')}
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
                        {/* Conta */}
                        <div>
                            <label style={labelStyle}>
                                Conta *
                            </label>
                            <select
                                name="contaId"
                                value={formData.contaId}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            >
                                <option value="">Selecione uma conta</option>
                                {contas.map(conta => (
                                    <option key={conta.id} value={conta.id}>
                                        {conta.banco} - {conta.numeroConta}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tipo */}
                        <div>
                            <label style={labelStyle}>
                                Tipo *
                            </label>
                            <select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            >
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                            </select>
                        </div>

                        {/* Categoria */}
                        <div>
                            <label style={labelStyle}>
                                Categoria *
                            </label>
                            <input
                                type="text"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                placeholder="Ex: Alimentação, Salário"
                            />
                        </div>

                        {/* Descrição */}
                        <div>
                            <label style={labelStyle}>
                                Descrição *
                            </label>
                            <input
                                type="text"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                placeholder="Ex: Compra no supermercado"
                            />
                        </div>

                        {/* Valor */}
                        <div>
                            <label style={labelStyle}>
                                Valor *
                            </label>
                            <input
                                type="number"
                                name="valor"
                                value={formData.valor}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                style={inputStyle}
                                placeholder="0.00"
                            />
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
                                <option value="pendente">Pendente</option>
                                <option value="concluida">Concluída</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </div>

                        {/* Método de Pagamento */}
                        <div>
                            <label style={labelStyle}>
                                Método de Pagamento *
                            </label>
                            <select
                                name="metodoPagamento"
                                value={formData.metodoPagamento}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            >
                                <option value="">Selecione</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="debito">Débito</option>
                                <option value="credito">Crédito</option>
                                <option value="pix">PIX</option>
                                <option value="boleto">Boleto</option>
                            </select>
                        </div>

                        {/* Data */}
                        <div>
                            <label style={labelStyle}>
                                Data
                            </label>
                            <input
                                type="date"
                                name="dataTransacao"
                                value={formData.dataTransacao}
                                onChange={handleChange}
                                style={inputStyle}
                            />
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
                            onClick={() => router.push('/transacoes')}
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