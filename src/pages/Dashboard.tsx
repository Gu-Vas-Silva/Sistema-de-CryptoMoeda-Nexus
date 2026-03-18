import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { StatCard } from '../components/StatCard'
import { AssetCard } from '../components/AssetCard'
import { TransactionTable } from '../components/TransactionTable'
import { getUserDepositComparison } from '../utils/getUserDepositComparison'
import { useEffect, useState } from 'react'
import { getActiveUsersComparison } from '../utils/getActiveUsersComparison'
import { getTotalVolumeBRLByUser } from '../utils/volumeService'
import { getUserBalances } from '../utils/getUserBalances'

type User = {
  id: number
  name: string
  email: string
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED'
  createdAt: string
  lastActivity: string
}

type DepositComparison = {
  currentMonthTotal: number
  percentage: number | string
}

export function Dashboard() {
  const [user, setUser] = useState<User>()
  const [deposits, setDeposits] = useState<DepositComparison>()
  const [withDraws, setWithDraws] = useState<DepositComparison>()
  const [volume, setVolume] = useState<any>()
  const [balances, setBalances] = useState<any[]>([])
  const usersActives = getActiveUsersComparison()
  useEffect(() => {
    
      async function load() {
        const stored = localStorage.getItem('user')
        if (stored) {
        const parsedUser: User = JSON.parse(stored)

        setUser(parsedUser)
        const deposits = await getUserDepositComparison(parsedUser.id, 'DEPOSIT')
        const withdraws = await getUserDepositComparison(parsedUser.id, 'WITHDRAW')

        setDeposits(deposits)
        setWithDraws(withdraws)
        getTotalVolumeBRLByUser(parsedUser.id).then(setVolume)
        setBalances(getUserBalances(parsedUser.id))
      }
    }
    load()
  }, [])

  const assetConfig: Record<string, { name: string; color: string }> = {
    BTC: {
      name: 'Bitcoin',
      color: 'from-orange-600/30 to-orange-900/20',
    },
    ETH: {
      name: 'Ethereum',
      color: 'from-blue-600/30 to-blue-900/20',
    },
    USDT: {
      name: 'Tether',
      color: 'from-green-600/30 to-green-900/20',
    },
    BRL: {
      name: 'Real',
      color: 'from-indigo-600/30 to-indigo-900/20',
    },
  }

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-gray-400 mb-8">Resumo geral das operações da plataforma neste mês.</p>
          <div className="grid grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Depositado" value={deposits?.currentMonthTotal} change={deposits?.percentage} />
            <StatCard title="Total Sacado" value={withDraws?.currentMonthTotal} change={withDraws?.percentage} />
            <StatCard title="Usuários Ativos" value={usersActives.currentTotal} change={usersActives.percentage} />
            <StatCard title="Saldo(BRL)" value={volume} change={0} />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Custódia Total</h2>
              <div className="space-y-4">
                {balances.map(item => {
                  const config = assetConfig[item.asset]

                  if (!config) return null

                  return <AssetCard key={item.asset} name={config.name} amount={item.amount} color={config.color} />
                })}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
              <TransactionTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
