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
  });
});
