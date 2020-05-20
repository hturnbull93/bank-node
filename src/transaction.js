const moment = require("moment");
const money = require("./money");

class Transaction {
  constructor({ credit = null, debit = null, balance = null } = {}) {
    this.date = new Date();
    this.credit = credit;
    this.debit = debit;
    this.balance = balance;
  }

  display() {
    return [
      this._dateFormat(),
      this._render(this.credit),
      this._render(this.debit),
      this._render(this.balance),
    ].join("|| ");
  }

  _dateFormat = () => moment(this.date).format("DD/MM/YYYY ");

  _render = (item) => (item != null ? `${money.pounds(item)} ` : "");
}

module.exports = Transaction;
