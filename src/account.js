class Account {
  constructor() {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
  }

  deposit(amount) {
    let credit = this._toPence(amount);
    this.balance += credit;
    let creditDisplay = this._asPounds(credit);
    let balanceDisplay = this._asPounds(this.balance);
    return `${creditDisplay} deposited. Current balance: ${balanceDisplay}`;
  }

  withdraw(amount) {
    let debit = this._toPence(amount);
    this.balance -= debit;
    let debitDisplay = this._asPounds(debit);
    let balanceDisplay = this._asPounds(this.balance);
    return `${debitDisplay} withdrawn. Current balance: ${balanceDisplay}`;
  }

  _asPounds(pence) {
    return parseFloat(pence / 100).toFixed(2);
  }

  _toPence(amount) {
    return amount * 100;
  }
}

module.exports = Account;
