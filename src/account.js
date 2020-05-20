const money = require("./money");
const Transaction = require("./transaction");

class Account {
  constructor(transactionClass = Transaction) {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
    this.transactionClass = transactionClass;
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
    const STATEMENT_HEADER = "date || credit || debit || balance \n";
    let statementRows = this.transactionHistory.map((transaction) => {
      return transaction.display();
    });
    return STATEMENT_HEADER + statementRows.join("\n")
  }

  _addTransaction(argObj) {
    this.transactionHistory.unshift(new this.transactionClass(argObj));
  }
}

module.exports = Account;
