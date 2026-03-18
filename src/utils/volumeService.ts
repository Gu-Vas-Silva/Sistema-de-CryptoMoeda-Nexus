import type { Transaction } from "../types/Transactions"
import { getTransactions } from "./getTransactions"
import { getCryptoPrices } from "./priceService"

export async function getTotalVolumeBRLByUser(userId: number) {

  const prices = await getCryptoPrices()
  const transactions: Transaction[] = getTransactions()
  let totalVolume = 0

  const userTransactions = transactions.filter(
    (t) => t.userId === userId
  )

  userTransactions.forEach((t) => {

  const price = prices[t.asset] ?? 0
  const amount = Number(t.amount)

  if (!price || isNaN(amount)) return

  const valueBRL = amount * price

  if (t.type === "DEPOSIT") {
    totalVolume += valueBRL
  } else {
    totalVolume -= valueBRL
  }

})
  
  return totalVolume
}