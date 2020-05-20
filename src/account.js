class Account {
  constructor() {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
  }
  deposit(amount) {
    let credit = this._toPence(amount);
    this.balance += credit;
    return `${
      this._asPounds(credit)
    } deposited. Current balance: ${
      this._asPounds(this.balance)
    }`;
  }

  _asPounds(pence) {
    return parseFloat(pence / 100).toFixed(2);
  }

  _toPence(amount) {
    return amount * 100;
  }
}

module.exports = Account;
