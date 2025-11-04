import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, title, style }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      ...style
    }}>
      {title && (
        <h2 style={{
          marginTop: 0,
          marginBottom: '1rem',
          fontSize: '1.5rem',
          color: '#333'
        }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
