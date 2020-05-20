class Account {
  constructor() {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
  }
  deposit(amount) {
    let credit = amount * 100;
    this.balance += credit
    return `${
      parseFloat(credit / 100).toFixed(2)
    } deposited. Current balance: ${
      parseFloat(this.balance / 100).toFixed(2)
    }`;
  }
}

module.exports = Account;
