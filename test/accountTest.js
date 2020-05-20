const expect = require("chai").expect;

describe("Account", () => {
  describe(".deposit", () => {
    it("returns str with balance: 100 when passed 100", () => {
      const account = new Account();

      expect(account.deposit(100)).to.equal(
        "100.00 deposited. Current balance: 100.00"
      );
    });
  });
});
