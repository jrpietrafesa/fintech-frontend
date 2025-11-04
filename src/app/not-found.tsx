'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{
          fontSize: '8rem',
          fontWeight: 'bold',
          color: '#1a73e8',
          marginBottom: '1rem'
        }}>
          404
        </div>
        
        <h1 style={{
          fontSize: '2rem',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Página não encontrada
        </h1>
        
        <p style={{
          color: '#666',
          fontSize: '1.125rem',
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <Link href="/dashboard">
            <Button>
              🏠 Ir para Dashboard
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">
              🔐 Ir para Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
