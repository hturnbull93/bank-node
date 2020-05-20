const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const Account = require("../src/account");

describe("Account Feature Test", () => {
  it("deposit 1000, 2000 then withdraw 500", () => {
    const dateOne = new Date(2012, 0, 10, 12);
    const dateTwo = new Date(2012, 0, 13, 12);
    const dateThree = new Date(2012, 0, 14, 12);

    let spy = sinon.spy(console, "log");

    const account = new Account();

    let clock = sinon.useFakeTimers(dateOne);
    account.deposit(1000);

    clock = sinon.useFakeTimers(dateTwo);
    account.deposit(2000);

    clock = sinon.useFakeTimers(dateThree);
    account.withdraw(500);

    let statement = [
      "date || credit || debit || balance ",
      "14/01/2012 || || 500.00 || 2500.00 ",
      "13/01/2012 || 2000.00 || || 3000.00 ",
      "10/01/2012 || 1000.00 || || 1000.00 ",
    ].join("\n");

    account.statement();
    expect(spy).to.have.been.calledWith(statement);

    console.log.restore();
    clock.restore();
  });
});
