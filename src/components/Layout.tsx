'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const 


Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header/Navbar */}
      <header style={{
        backgroundColor: '#1a73e8',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/dashboard" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none'
          }}>
            💰 Planejare Fintech 📈
          </Link>

          {user && (
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link
                href="/dashboard"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: isActive('/dashboard') ? 'bold' : 'normal',
                  borderBottom: isActive('/dashboard') ? '2px solid white' : 'none',
                  paddingBottom: '0.25rem'
                }}
              >
                Dashboard
              </Link>
              <Link
                href="/contas"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: isActive('/contas') ? 'bold' : 'normal',
                  borderBottom: isActive('/contas') ? '2px solid white' : 'none',
                  paddingBottom: '0.25rem'
                }}
              >
                Contas
              </Link>
              <Link
                href="/transacoes"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: isActive('/transacoes') ? 'bold' : 'normal',
                  borderBottom: isActive('/transacoes') ? '2px solid white' : 'none',
                  paddingBottom: '0.25rem'
                }}
              >
                Transações
              </Link>
              <Link
                href="/metas"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: isActive('/metas') ? 'bold' : 'normal',
                  borderBottom: isActive('/metas') ? '2px solid white' : 'none',
                  paddingBottom: '0.25rem'
                }}
              >
                Metas
              </Link>
              <Link
                href="/usuarios"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: isActive('/usuarios') ? 'bold' : 'normal',
                  borderBottom: isActive('/usuarios') ? '2px solid white' : 'none',
                  paddingBottom: '0.25rem'
                }}
              >
                Usuários
              </Link>
              <div style={{
                borderLeft: '1px solid rgba(255,255,255,0.3)',
                paddingLeft: '2rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <span>{user.nome}</span>
                <button
                  onClick={logout}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                  Sair
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '2rem',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <p>&copy; 2025 FinTech Planejare - Sistema de Gestão Financeira</p>
      </footer>
    </div>
  );
};

export default Layout;
