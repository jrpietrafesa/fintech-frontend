import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  style
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s',
      opacity: disabled ? 0.6 : 1,
    };

    const variants = {
      primary: {
        backgroundColor: '#1a73e8',
        color: 'white',
      },
      secondary: {
        backgroundColor: '#6c757d',
        color: 'white',
      },
      danger: {
        backgroundColor: '#dc3545',
        color: 'white',
      },
      success: {
        backgroundColor: '#28a745',
        color: 'white',
      },
    };

    return { ...baseStyles, ...variants[variant] };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...getVariantStyles(), ...style }}
      onMouseOver={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
