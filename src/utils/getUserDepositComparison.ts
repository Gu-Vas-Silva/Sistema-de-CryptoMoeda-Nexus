import type { Transaction } from "../types/Transactions"
import { getTransactions } from "./getTransactions"
import { getCryptoPrices } from "./priceService"

export async function getUserDepositComparison(
  userId: number,
  typeTransaction: string
) {

  const prices = await getCryptoPrices()

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const lastMonthDate = new Date(currentYear, currentMonth - 1)
  const lastMonth = lastMonthDate.getMonth()
  const lastMonthYear = lastMonthDate.getFullYear()

  const transactions: Transaction[] = getTransactions()

  let currentMonthTotal = 0
  let lastMonthTotal = 0

  transactions.forEach((t) => {

    if (t.userId !== userId || t.type !== typeTransaction) return

    const date = new Date(t.date)
    const month = date.getMonth()
    const year = date.getFullYear()

    // 🔥 pega preço do ativo
    const price = prices[t.asset] || 1

    // 🔥 converte pra BRL
    const valueBRL = t.amount * price

    if (month === currentMonth && year === currentYear) {
      currentMonthTotal += valueBRL
    }

    if (month === lastMonth && year === lastMonthYear) {
      lastMonthTotal += valueBRL
    }

  })

  const difference = currentMonthTotal - lastMonthTotal

  const percentage =
    lastMonthTotal === 0
      ? 100
      : ((difference / lastMonthTotal) * 100).toFixed(2)

  return {
    currentMonthTotal,
    percentage
  }
}