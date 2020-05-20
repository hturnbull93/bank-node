const money = {
  pounds: (pence) => {
    return parseFloat(pence / 100).toFixed(2);
  },
  pence: (amount) => {
    return amount * 100;
  },
};

module.exports = money;
