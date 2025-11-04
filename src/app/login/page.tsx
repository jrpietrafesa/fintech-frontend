'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, senha });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '1rem'
    }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#1a73e8', marginBottom: '0.5rem' }}>
            💰 Planejare FinTech 
          </h1>
          <p style={{ color: '#666' }}>Sistema de Gestão Financeira </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="seu@email.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid #eee'
        }}>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            Não tem uma conta?{' '}
            <Link
              href="/cadastro"
              style={{
                color: '#1a73e8',
                fontWeight: '500',
                textDecoration: 'underline'
              }}
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
