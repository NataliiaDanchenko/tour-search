export const formatPrice = (amount: number, currency: string) => {
  return amount != null
    ? `${amount.toLocaleString('uk-UA')} ${currency}`
    : '-';
};
