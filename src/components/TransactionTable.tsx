import { useEffect, useState } from "react"
import { getLastTransactions } from "../utils/getLastTransactions"

type Transaction = {
  id: number
  userId: number
  type: "DEPOSIT" | "WITHDRAW"
  asset: string
  amount: number
  date: string
}

type User = {
  id: number
  name: string
}

export function TransactionTable() {

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")

    if (stored) {
      const parsedUser: User = JSON.parse(stored)

      setUser(parsedUser)

      const lastTransactions = getLastTransactions(parsedUser.id)
      setTransactions(lastTransactions as Transaction[])
    }
  }, [])

  return (
    <table className="w-full text-sm bg-[#020617] border border-white/10 rounded-xl overflow-hidden">

      <thead className="text-gray-400 border-b border-white/10">
        <tr>
          <th className="p-3 text-left">Tipo</th>
          <th className="p-3 text-left">Usuário</th>
          <th className="p-3 text-left">Ativo</th>
          <th className="p-3 text-left">Valor</th>
          <th className="p-3 text-left">Data</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) => {

          const isDeposit = t.type === "DEPOSIT"

          return (
            <tr key={t.id} className="border-b border-white/5">

              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  isDeposit
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {isDeposit ? "Depósito" : "Saque"}
                </span>
              </td>

              <td className="p-3">
                {user?.name}
              </td>

              <td className="p-3">
                {t.asset}
              </td>

              <td className={`p-3 ${
                isDeposit ? "text-green-400" : "text-red-400"
              }`}>
                {isDeposit ? "+" : "-"}
                {t.amount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4
                })}{" "}
                {t.asset}
              </td>

              <td className="p-3 text-gray-400">
                {new Date(t.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short"
                })}
              </td>

            </tr>
          )
        })}
      </tbody>

    </table>
  )
}