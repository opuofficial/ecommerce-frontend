export const formatAmount = (amount) => {
  if (Number.isInteger(amount)) {
    return amount + ".00";
  } else {
    return amount.toFixed(2);
  }
};
