const money = require("./money");
const Transaction = require("./transaction");
const Printer = require("./printer");

class Account {
  constructor(transactionClass = Transaction, printer = new Printer()) {
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
    return this._transactionMessage(credit, "deposited");
  }

  withdraw(amount) {
    let debit = money.pence(amount);
    if (debit > this.balance) return "Insufficient funds";
    this.balance -= debit;
    this._addTransaction({ debit, balance: this.balance });
    return this._transactionMessage(debit, "withdrawn");
  }

  statement() {
    this.printer.printStatement(this.transactionHistory);
  }

  _addTransaction(argObj) {
    this.transactionHistory.unshift(new this.transactionClass(argObj));
  }

  _transactionMessage(credit, phrase) {
    let creditDisplay = money.pounds(credit);
    let balanceDisplay = money.pounds(this.balance);
    return `${creditDisplay} ${phrase}. Current balance: ${balanceDisplay}`;
  }
}

module.exports = Account;
