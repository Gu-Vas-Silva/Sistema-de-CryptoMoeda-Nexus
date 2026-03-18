export type Transaction = {
  id: number
  userId: number
  type: "DEPOSIT" | "WITHDRAW"
  asset: string
  amount: number
  date: string
  note?: string
}