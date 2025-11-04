import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

function Table<T extends { id?: number | string }>({ 
  data, 
  columns, 
  onRowClick 
}: TableProps<T>) {
  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return String(row[column.accessor] ?? '');
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white'
      }}>
        <thead>
          <tr style={{
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #dee2e6'
          }}>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#495057',
                  width: column.width
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#6c757d'
                }}
              >
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                onClick={() => onRowClick?.(row)}
                style={{
                  borderBottom: '1px solid #dee2e6',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  if (onRowClick) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseOut={(e) => {
                  if (onRowClick) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      padding: '1rem',
                      color: '#212529'
                    }}
                  >
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
