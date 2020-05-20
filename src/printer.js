class Printer {
  printStatement(transactions) {
    const STATEMENT_HEADER = "date || credit || debit || balance \n";
    let rows = transactions.map((transaction) => transaction.display());
    console.log(STATEMENT_HEADER + rows.join("\n"));
  }
}

module.exports = Printer;
