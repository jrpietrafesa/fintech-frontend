export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Data não informada';

    try {
        // Adicionar um dia para compensar fuso horário
        const [year, month, day] = dateString.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        // Verificar se a data é válida
        if (isNaN(date.getTime())) {
            return 'Data inválida';
        }

        // Formatar para dd/MM/yyyy
        const dayStr = String(date.getDate()).padStart(2, '0');
        const monthStr = String(date.getMonth() + 1).padStart(2, '0');
        const yearStr = date.getFullYear();

        return `${dayStr}/${monthStr}/${yearStr}`;
    } catch (error) {
        return 'Data inválida';
    }
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};
