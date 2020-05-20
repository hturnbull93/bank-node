const expect = require("chai").expect;
const Account = require("../src/account");

describe("Account", () => {
  describe(".deposit", () => {
    it("returns str with balance: 100 when passed 100", () => {
      const account = new Account();

      expect(account.deposit(100)).to.equal(
        "100.00 deposited. Current balance: 100.00"
      );
    });

    it("returns str with balance: 200 when passed 200", () => {
      const account = new Account();

      expect(account.deposit(200)).to.equal(
        "200.00 deposited. Current balance: 200.00"
      );
    });

    it("returns str with deposited 100, balance: 300, when passed 200 then 100", () => {
      const account = new Account();
      account.deposit(200);

      expect(account.deposit(100)).to.equal(
        "100.00 deposited. Current balance: 300.00"
      );
    });

    it("returns str with balance: 10.50 when passed 10.50", () => {
      const account = new Account();

      expect(account.deposit(10.5)).to.equal(
        "10.50 deposited. Current balance: 10.50"
      );
    });
  });

  describe(".withdraw (account has 1000 deposited already)", () => {
    it("reduces balance by 100 when passed 100", () => {
      let account = new Account();
      account.deposit(1000);

      expect(account.withdraw(100)).toEqual(
        "100.00 withdrawn. Current balance: 900.00"
      );
    });
  });
});
