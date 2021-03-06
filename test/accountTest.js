const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

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
      const account = accountWith1000Deposited();

      expect(account.withdraw(100)).to.equal(
        "100.00 withdrawn. Current balance: 900.00"
      );
    });

    it("reduces balance by 200 when passed 200", () => {
      const account = accountWith1000Deposited();

      expect(account.withdraw(200)).to.equal(
        "200.00 withdrawn. Current balance: 800.00"
      );
    });

    it("100 then 200, return string has balance: 700.00", () => {
      const account = accountWith1000Deposited();
      account.withdraw(100);

      expect(account.withdraw(200)).to.equal(
        "200.00 withdrawn. Current balance: 700.00"
      );
    });

    it("overwithdraw should return string 'Insufficient funds'", () => {
      const account = accountWith1000Deposited();

      expect(account.withdraw(1500)).to.equal("Insufficient funds");
    });
  });

  describe("uses Transaction class", () => {
    it("deposit calls for new Transaction", () => {
      let transactionSpy = sinon.spy();
      const account = new Account(transactionSpy);

      account.deposit(100);
      expect(transactionSpy).to.have.been.calledWith({
        credit: 10000,
        balance: 10000,
      });
    });

    it("withdraw calls for new Transaction", () => {
      let transactionSpy = sinon.spy();
      const account = new Account(transactionSpy);
      account.deposit(100);

      account.withdraw(100);
      expect(transactionSpy).to.have.been.calledWith({
        debit: 10000,
        balance: 0,
      });
    });
  });

  describe("uses Printer class", () => {
    it("statement calls printer.printStatement", () => {
      let printerSpy = {
        printStatement: () => {},
      };
      let spiedFunction = sinon.spy(printerSpy, "printStatement");
      let transactionSpy;
      const account = new Account(transactionSpy, printerSpy);

      account.statement();
      expect(spiedFunction).to.have.been.called;
    });
  });
});

function accountWith1000Deposited() {
  let account = new Account();
  account.deposit(1000);
  return account;
}
