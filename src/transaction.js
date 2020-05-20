const moment = require('moment');

class Transaction {
  constructor() {
    this.date = new Date();
  }

  display() {
    return `${this.dateFormat()}|| || || `
  }

  dateFormat() {
    return moment(this.date).format("DD/MM/YYYY ");
  }
}

module.exports = Transaction