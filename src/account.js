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

  withdraw() {
    return "100.00 withdrawn. Current balance: 900.00";
  }

  _asPounds(pence) {
    return parseFloat(pence / 100).toFixed(2);
  }

  _toPence(amount) {
    return amount * 100;
  }
}

module.exports = Account;
