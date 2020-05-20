class Account {
  constructor() {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
  }
  deposit(amount) {
    let credit = this.toPence(amount);
    this.balance += credit
    return `${
      parseFloat(credit / 100).toFixed(2)
    } deposited. Current balance: ${
      parseFloat(this.balance / 100).toFixed(2)
    }`;
  }

  toPence(amount) {
    return amount * 100;
  }
}

module.exports = Account;
