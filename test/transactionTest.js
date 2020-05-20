const sinon = require("sinon");
const expect = require("chai").expect;
const Transaction = require("../src/transaction");

describe("Transaction", () => {
  describe(".display", () => {
    it("has the date the transaction was made in the first column, formatted as dd/mm/yyyy", () => {
      let date = new Date(2020, 4, 19);
      let clock = sinon.useFakeTimers(date);

      const transaction = new Transaction();

      expect(transaction.display()).to.equal("19/05/2020 || || || ");

      clock.restore();
    });

    it("has the credit amount in second column", () => {
      let date = new Date(2020, 4, 19);
      let clock = sinon.useFakeTimers(date);

      const transaction = new Transaction({ credit: 10000 });

      expect(transaction.display()).to.equal("19/05/2020 || 100.00 || || ");

      clock.restore();
    });

    it("has the credit amount in third column", () => {
      let date = new Date(2020, 4, 19);
      let clock = sinon.useFakeTimers(date);

      const transaction = new Transaction({ debit: 10000 });

      expect(transaction.display()).to.equal("19/05/2020 || || 100.00 || ");

      clock.restore();
    });

    it("has the balance amount in fourth column", () => {
      let date = new Date(2020, 4, 19);
      let clock = sinon.useFakeTimers(date);

      const transaction = new Transaction({ balance: 10000 });

      expect(transaction.display()).to.equal("19/05/2020 || || || 100.00 ");

      clock.restore();
    });
  });
});
