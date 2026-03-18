import transactionsData from "../mocks/transactions.json"

export function getTransactions() {
  const stored = localStorage.getItem("transactions")

  if (stored) {
    return JSON.parse(stored)
  }

  return transactionsData.transactions
}