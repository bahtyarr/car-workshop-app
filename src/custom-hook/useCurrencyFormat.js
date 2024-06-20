const useCurrencyFormat = () => {
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  return {
    formatCurrency,
  };
};

export default useCurrencyFormat;
