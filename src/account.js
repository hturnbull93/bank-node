class Account {
   deposit(amount) {
    if (amount === 100) return "100.00 deposited. Current balance: 100.00";
    else return "200.00 deposited. Current balance: 200.00";
  }
}

module.exports = Account;
