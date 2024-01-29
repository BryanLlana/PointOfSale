export const formatCurrency = price => Number(price).toLocaleString('es-PE', {
  style: 'currency',
  currency: 'PEN'
})