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
    return `${this.dateFormat()}|| ${this.render(this.credit)}|| ${this.render(
      this.debit
    )}|| ${this.render(this.balance)}`;
  }

  dateFormat = () => moment(this.date).format("DD/MM/YYYY ");

  render = item => item != null ? `${money.pounds(item)} ` : "";
}

module.exports = Transaction;
