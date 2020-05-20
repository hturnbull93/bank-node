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

  dateFormat() {
    return moment(this.date).format("DD/MM/YYYY ");
  }

  render(item) {
    if (item != null) return `${money.pounds(item)} `
    else return "";
  }
}

module.exports = Transaction;
