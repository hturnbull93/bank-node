const money = require("./money");
const Transaction = require("./transaction");
const Printer = require("./printer");

class Account {
  constructor(transactionClass = Transaction, printer = new Printer) {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
    this.transactionClass = transactionClass;
    this.printer = printer;
    this.transactionHistory = [];
  }

  deposit(amount) {
    let credit = money.pence(amount);
    this.balance += credit;
    this._addTransaction({ credit, balance: this.balance });
    let creditDisplay = money.pounds(credit);
    let balanceDisplay = money.pounds(this.balance);
    return `${creditDisplay} deposited. Current balance: ${balanceDisplay}`;
  }

  withdraw(amount) {
    let debit = money.pence(amount);
    if (debit > this.balance) return "Insufficient funds";
    this.balance -= debit;
    this._addTransaction({ debit, balance: this.balance });

    let debitDisplay = money.pounds(debit);
    let balanceDisplay = money.pounds(this.balance);
    return `${debitDisplay} withdrawn. Current balance: ${balanceDisplay}`;
  }

  statement() {
    this.printer.printStatement(this.transactionHistory)
  }

  _addTransaction(argObj) {
    this.transactionHistory.unshift(new this.transactionClass(argObj));
  }
}

module.exports = Account;
