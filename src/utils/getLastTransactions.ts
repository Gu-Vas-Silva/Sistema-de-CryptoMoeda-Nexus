
import type { Transaction } from "../types/Transactions"
import { getTransactions } from "./getTransactions"
export function getLastTransactions(userId: number, limit = 5) {
  const transactions: Transaction[] = getTransactions()
  const userTransactions = transactions
    .filter((t) => t.userId === userId)

    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    .slice(0, limit)

  return userTransactions
}