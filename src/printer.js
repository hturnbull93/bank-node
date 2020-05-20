class Printer {
  printStatement(transactions) {
    const STATEMENT_HEADER = "date || credit || debit || balance \n";
    let rows = transactions.map(transaction => transaction.display())
    return STATEMENT_HEADER + rows.join("\n");
  }
}

module.exports = Printer
