export const formatDate = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return formatter.format(parsedDate).replace(',', '')
}
