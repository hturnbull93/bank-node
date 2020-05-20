const money = require('./money');
const Transaction = require('./transaction');

class Account {
  constructor(transactionClass = Transaction) {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
    this.transactionClass = transactionClass
  }

  deposit(amount) {
    let credit = money.pence(amount);
    this.balance += credit;
    let deposit = new this.transactionClass({credit, balance: this.balance})
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
