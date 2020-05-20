const moment = require("moment");
const money = require("./money");

class Transaction {
  constructor({ credit = null } = {}) {
    this.date = new Date();
    this.credit = credit;
  }

  display() {
    return `${this.dateFormat()}|| ${this.render(this.credit)}|| || `;
  }

  dateFormat = () => moment(this.date).format("DD/MM/YYYY ");

  render = item => item != null ? `${money.pounds(item)} ` : "";
}

module.exports = Transaction;
