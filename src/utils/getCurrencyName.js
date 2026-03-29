const getCurrencyName = (val) => {
  if (!val) return "";

  const num = Number(val);

  if (num >= 10000000) {
    // Crore
    return `${(num / 10000000).toFixed(1)} Crore`;
  } else if (num >= 100000) {
    // Lakh
    return `${(num / 100000).toFixed(1)} Lakh`;
  } else {
    // Normal number
    return num.toString();
  }
};

export default getCurrencyName;