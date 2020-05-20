<!-- omit in toc -->
# Bank - Node

This is a small project to practice maintaining code quality and process. [Source]

I have previously created a Ruby implementation, [available here](https://github.com/hturnbull93/bank/).
I have also created a JavaScript implementation for the browser, [available here](https://github.com/hturnbull93/bank-js/).

It allows you to create an account, deposit funds into it, withdraw funds from it, and print statements.

- [Spec](#spec)
  - [Requirements](#requirements)
  - [Acceptance criteria](#acceptance-criteria)
- [Quick Start](#quick-start)
- [Screen Preview](#screen-preview)
- [Dependencies](#dependencies)
- [Development Journal](#development-journal)
  - [Domain Modelling](#domain-modelling)
  - [User Stories](#user-stories)
  - [Set up](#set-up)
  - [Deposits](#deposits)
  - [Withdrawals](#withdrawals)
  - [Statement](#statement)
  - [Transactions](#transactions)
  - [Back to the Statement](#back-to-the-statement)
  - [Extracting a Printer](#extracting-a-printer)

## Spec

### Requirements

- You should be able to interact with your code via a REPL like IRB or the JavaScript console. (You don't need to implement a command line interface that takes input from STDIN.)
- Deposits, withdrawal.
- Account statement (date, amount, balance) printing.
- Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see:

```irb
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```

## Quick Start

1. Clone this repo.
2. Install dependencies with:

   ```shell
   npm install
   ```

3. Run tests with:

   ```shell
   npm test
   ```

4. Run the Node REP:

   ```js
   node
   ```

5. Require in `account.js` with:

   ```js
   const Account = require("./src/account.js")
   ```

6. Set up your account with:

   ```js
   let account = new Account();
   ```

7. Use the account with the following methods:

| Method                     | Description                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| `account.deposit(number)`  | deposit however much you want into your account, this figure is in pounds with pence as decimals.  |
| `account.withdraw(number)` | withdraw however much you want from your account, this figure is in pounds with pence as decimals. |
| `account.statement()`      | prints a statement of all transactions so far                                                      |

You should see something similar to the below:

## Screen Preview

![Screen preview](images/bank-node-repl.png)

## Dependencies

Production:

[Moment] - Time formatting library.

Development:

[Mocha] - Testing runner framework.
[Chai] - Testing assertion/expectation library.
[Sinon] - Testing spy/stub/mock library.
[Sinon-Chai] - Custom Chai assertions for the Sinon library.

## Development Journal

### Domain Modelling

Given that I know more about the final form of the program from the previous implementations, this project focusses more on the implementation rather than the planning steps. The below CRC modelling and User Stories are taken from the Ruby implementation.

CRC modelling:

![CRC Model](images/Bank-REPL-CRC.png)

### User Stories

- [x] 1

> As a Bank Manager,  
> So that we only take customers money,  
> I want accounts to start with balance 0

- [x] 2

> As a Customer,  
> So I can keep my money safe,  
> I want to be able to deposit into my account

- [x] 3

> As a Customer,  
> So I can spend my money,  
> I want to be able to withdraw from my account

- [x] 3.1

> As a Bank Manager,  
> So we don't go out of pocket,  
> I want withdrawals to only be allowed to occur if the customer has sufficient funds

- [x] 4

> As a Customer,  
> So I can keep on top of my finances,  
> I want to be able to print my account statement

- [x] 4.1

> As a Customer,  
> So I know when each transaction happened,  
> I want transactions on my statement to have the date

- [x] 4.2

> As a Customer,  
> So I know how much each deposit was,  
> I want deposits on my statement to have the credit amount.

- [x] 4.3

> As a Customer,  
> So I know how much each withdrawal was,  
> I want withdrawals on my statement to have the debit amount.

- [x] 4.4

> As a Customer,  
> So can keep track of my balance,  
> I want transactions on my statement to have the balance amount after the transaction was completed.

- [x] 4.5

> As a Customer,  
> Because more recent transactions are more important to me,  
> I want the statement transactions to be ordered from newest to oldest.

### Set up

Initialised node with `npm init`.

Installed Mocha with `npm install --save-dev mocha`.

Added `node_modules` to `.gitgnore`.

Added `test` dir for mocha.

Specified test script to run mocha.

Installed Chai with `npm install --save-dev chai`.

That's enough to get started.

### Deposits

- [x] 1

> As a Bank Manager,  
> So that we only take customers money,  
> I want accounts to start with balance 0

- [x] 2

> As a Customer,  
> So I can keep my money safe,  
> I want to be able to deposit into my account

In `test/accountTest.js` wrote a test for an `Account` class, with a `deposit` method taking 100 results in a string showing deposited 100 and balance of 100. Red.

In `src/account.js`:

- Added `Account` class.
- Added `deposit` function that returns the required string hardcoded.
- Export `Account` for require elsewhere.

Green.

Wrote test for `deposit` method taking 200 results in a string showing deposited 200.00 and balance of 200.00. Red.

- `deposit` now checks for the amount, then if it is 200, return the relevant "200.00" string, else return the "100.00" string.

Green.

Wrote test for `deposit` method taking 200 then 100 results in a string showing deposited 100.00 and balance of 300.00. Red.

- Added `constructor` to `Account` initialising `balance` with constant `STARTING_BALANCE` set as 0.
- `deposit` adds amount to balance, then interpolates the amount and new balance into a returned string.

Green.

Wrote test for `deposit` method taking 10.50, should in a string showing deposited 10.50 and balance of 10.50. Red.

The balance should probably be stored as pence, rather than as a float, but it needs to be display at two decimal places as if it were pounds and pence.

- Let `credit` in `deposit` be the amount passed multiplied by 100 (to get pence value).
- Added `credit` to the balance.
- Then interpolate credit and balance into the returned string converted to two decimal placed with parseFloat of the value / 100, toFixed 2 decimal places.

Green.

Refactors:

- Extracted the operations used to convert to two decimal places to a separate private helper method, `_asPounds`.
- Extracted the operation used to convert the amount to pence into a new private helper method, `_toPence`.

### Withdrawals

- [x] 3

> As a Customer,  
> So I can spend my money,  
> I want to be able to withdraw from my account

Wrote test for withdrawing 100 from an account with 1000, returned string has balance: 900.00. Red.

- Added `withdraw` method, hardcoded returned string.

Green.

Wrote test for withdrawing 200 from an account with 1000, returned string has balance: 800.00. Red.

- `withdraw` checks if the amount passed is 100, if so it returns the string, if not it returns a different string for withdrawing 200.

Wrote test for withdrawing 100 then 200 from an account with 1000, returned string has balance: 700.00. Red.

`withdraw` implements similar functionality to `deposit` but deducting the amount from the balance.

Green.

- [x] 3.1

> As a Bank Manager,  
> So we don't go out of pocket,  
> I want withdrawals to only be allowed to occur if the customer has sufficient funds

Wrote test for withdrawing 1500 from an account with 1000, string returned should say "Insufficient funds". Red.

- Added guard clause to check if the amount to be withdrawn is greater than the current balance, if so return the string.

Green.

### Statement

- [x] 4

> As a Customer,  
> So I can keep on top of my finances,  
> I want to be able to print my account statement

The feature test I want to write needs to be able to have the date mocked. For this I will use [Sinon].

Sinon is installed with `npm install --save-dev sinon`

In `test/accountFeatureTest.js` wrote a feature test similar to the above acceptance criteria, using sinon fake timers to mock the date. Red.

Part of solving the feature is to implement `Transaction`s.

### Transactions

- [x] 4.1

> As a Customer,  
> So I know when each transaction happened,  
> I want transactions on my statement to have the date

In `test/transactionTest.js` wrote a test for the `display` method of the `Transaction` class to return a formatted string, with the formatted date in the first column. Red.

In `src/transaction.js`:

- `Transaction` class, with `constructor` setting `this.date` with a new instance of `Date`.
- `dateFormat` uses the moment library to format the date as "dd/mm/yyyy" - - Manually formatting dates in JavaScript is a bit more fiddly compared to Ruby, moment is installed as a dependency with `npm install --save moment`.
- `display` method returns a string interpolated with the `dateFormat` returned value.
- Exported `Transaction` as a module.
- Required `Transaction` into `transactionTest.js`.

Green.

- [x] 4.2

> As a Customer,  
> So I know how much each deposit was,  
> I want deposits on my statement to have the credit amount.

Wrote a test for constructing a transaction object with an argument object with credit value, its `display` method should include that value in the second column of the returned string. Red.

- `Transaction` constructor takes an object as argument with property credit defaulting to null, which is assigned to `this.credit`.
- Extracted the helper methods `toPence` and `asPounds` to an object `money`, as methods `pence` and `pounds` in their own module, `src/money.js`.
- Require `money` into `transaction`.
- Added `render` method which takes an item, then if that is not null returns `money.pounds` passing in the item, concatenated with a trailing space, else returns an empty string.
- `display` interpolates `render` of `this.credit`.

Green.

Refactors:

- Converted `render` into a single line arrow function using a ternary operator.
- Also refactored `dateFormat` into single line arrow function

- [x] 4.3

> As a Customer,  
> So I know how much each withdrawal was,  
> I want withdrawals on my statement to have the debit amount.

Wrote a test for constructing a transaction object passing in argument object with debit, its `display` method should include the debit value in the third column of the returned string. Red.

- `constructor`'s argument obj also has a debit property, defaulting to null, assigned to `this.debit`.
- `display` interpolates in the third column `render` of `this.debit`.

- [x] 4.4

> As a Customer,  
> So can keep track of my balance,  
> I want transactions on my statement to have the balance amount after the transaction was completed.

Wrote a test for constructing a transaction object passing an argument object with balance property, its `display` method should include the balance value in the fourth column of the returned string. Red.

- `constructor`'s argument obj also has a balance property, defaulting to null, assigned to `this.debit`.
- `display` interpolates in the fourth column `render` of `this.balance`.

Refactors:

- The display method has a lot of duplication or columns in a long string interpolation, which also doesn't read very well any way you try to format it. Changed this to an array with each of the elements as a `render` call, joined with a delimiter of "|| " for the columns.
- Also prepend an underscore to `render` and `dateFormat` as they should be treated as private methods.

### Back to the Statement

To write a test that `deposit` calls for a new `Transaction`, the sinon-chai library is needed, installed with `npm install --save-dev sinon-chai`.

Wrote a test that `deposit` calls for a new `Transaction`. Red,

- The `Account` class can have `Transaction` injected into it.
- The `constructor` takes an argument `transactionClass` defaulting to `Transaction`, assigned to `this.transactionClass`.
- `deposit` calls for a new `this.transactionClass` passing in an object with the credit and balance.

Green.

Wrote a test that `withdraw` calls for a new `Transaction`. Red,

- `withdraw` calls for a new `this.transactionClass` passing in an object with the credit and balance.

Refactor:

- As the behaviour in `deposit` and `withdraw` is similar, extracted a private helper method `_addTransaction`, which `deposit` and `withdraw` call.

Now to pass the feature test.

- `constructor` initialised `this.transactionHistory` as an empty array.
- `_addTransaction` unshifts the `Transaction` it creates onto `this.transactionHistory`.
- The `Account` `statement` method includes a constant `STATEMENT_HEADER` assigned with the header string for the statement, ending in newline.
- It then assigns `statementRows` by mapping through the `transactionHistory`, returning the `display` call on each transaction.
- It then returns the `STATEMENT_HEADER` concatenated with `statementRows` joined with newline characters.

Green.

### Extracting a Printer

Wrote a test that `statement` calls `Printer.printStatement`. Red.

- Extracted the constant and logic from the `statement` method into a new class, `Printer` in `src/printer.js`.
- Its `printStatement` method takes any array of transactions, maps through them calling their `display` methods assigned to `rows`, then returns `STATEMENT_HEADER` concatenated with `rows` joined with newline characters.

Green.

Refactors:

Rather than returning a concatenated string, the printer should log it to the console.

- Adjusted the feature test to spy on `console`'s `log` method, expecting it to be called with the prepared `statement`.
- `printStatement` console logs instead of returning.
- `statement` no longer returns, it just calls `printer.printStatement`.
- Added a test for `Printer.printStatement` to print the statement header and result of array elements display calls on newlines.
- Extracted a method `_transactionMessage` from withdraw and amount to handle the conversion of the credit/debit amount and balance for input into the transaction message string.


<!-- Links -->

[source]: https://github.com/makersacademy/course/blob/master/individual_challenges/bank_tech_test.md
[mocha]: https://mochajs.org/
[chai]: https://www.chaijs.com/
[sinon]: https://sinonjs.org/
[sinon-chai]: https://www.chaijs.com/plugins/sinon-chai/
[moment]: https://momentjs.com/
