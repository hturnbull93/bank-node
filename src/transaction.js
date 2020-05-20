const moment = require("moment");
const money = require("./money");

class Transaction {
  constructor({ credit = null, debit = null } = {}) {
    this.date = new Date();
    this.credit = credit;
    this.debit = debit;
  }

  display() {
    return `${this.dateFormat()}|| ${this.render(this.credit)}|| ${this.render(
      this.debit
    )}|| `;
  }

  dateFormat = () => moment(this.date).format("DD/MM/YYYY ");

  render = item => item != null ? `${money.pounds(item)} ` : "";
}

module.exports = Transaction;
