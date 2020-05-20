const money = require('./money');

class Account {
  constructor() {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
  }

  deposit(amount) {
    let credit = money.pence(amount);
    this.balance += credit;
    let creditDisplay = money.pounds(credit);
    let balanceDisplay = money.pounds(this.balance);
    return `${creditDisplay} deposited. Current balance: ${balanceDisplay}`;
  }

  withdraw(amount) {
    let debit = money.pence(amount);
    if (debit > this.balance) return "Insufficient funds";
    this.balance -= debit;
    let debitDisplay = money.pounds(debit);
    let balanceDisplay = money.pounds(this.balance);
    return `${debitDisplay} withdrawn. Current balance: ${balanceDisplay}`;
  }
}

module.exports = Account;
