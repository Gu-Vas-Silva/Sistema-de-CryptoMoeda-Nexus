import type { Transaction } from "../types/Transactions"
import { getTransactions } from "./getTransactions"


export function getUserBalances(userId: number) {

  const balances: Record<string, number> = {}

  const transactions: Transaction[] = getTransactions()

  const userTransactions = transactions.filter(
    (t) => t.userId === userId
  )

  userTransactions.forEach((t) => {

    if (!balances[t.asset]) {
      balances[t.asset] = 0
    }

    if (t.type === "DEPOSIT") {
      balances[t.asset] += t.amount
    }

    if (t.type === "WITHDRAW") {
      balances[t.asset] -= t.amount
    }

  })

  return Object.entries(balances).map(([asset, amount]) => ({
    asset,
    amount
  }))
}