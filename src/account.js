class Account {
  constructor() {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
  }
  deposit(amount) {
    let credit = this.toPence(amount);
    this.balance += credit;
    return `${
      this.asPounds(credit)
    } deposited. Current balance: ${
      this.asPounds(this.balance)
    }`;
  }

  asPounds(pence) {
    return parseFloat(pence / 100).toFixed(2);
  }

  toPence(amount) {
    return amount * 100;
  }
}

module.exports = Account;
