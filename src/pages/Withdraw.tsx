import { useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import usersData from '../mocks/user.json'
import assetsData from '../mocks/assets.json'
import transactionsData from '../mocks/transactions.json'
import { getTotalVolumeBRLByUser } from '../utils/volumeService'
type User = {
  id: number
  name: string
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED'
}

export function WithDraw() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState('')
  const [asset, setAsset] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [user, setUser] = useState<User>()
  const [volume, setVolume] = useState<any>()

  useEffect(() => {
    const activeUsers = usersData.users.filter(u => u.status === 'ACTIVE')
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsedUser: User = JSON.parse(stored)

      setUser(parsedUser)
      setUsers(activeUsers as [])
      getTotalVolumeBRLByUser(parsedUser.id).then(setVolume)
    }
  }, [])

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()

    if (!selectedUser || !asset || !amount) {
      alert('Preencha os campos obrigatórios')
      return
    }

    const newTransaction = {
      id: Date.now(),
      userId: Number(selectedUser),
      type: 'WITHDRAW',
      asset,
      amount: Number(amount),
      date: new Date().toISOString(),
      note,
    }

    if(newTransaction.amount <= 0){
        alert('Coloque um valor maior doque 0')
        return
    }
    transactionsData.transactions.push(newTransaction)

    if(newTransaction.amount < volume){
        alert("Saldo insuficiente")
        return
    }
    console.log('Nova transação:', newTransaction)
    const dados = JSON.parse(localStorage.getItem('transactions') || '[]')
    dados.push(newTransaction)

    localStorage.setItem('dados', JSON.stringify(dados))
    alert('Saque realizado com sucesso!')

    setSelectedUser('')
    setAsset('')
    setAmount('')
    setNote('')
  }

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <div className="flex-1">
        <Topbar user={user} />

        <div className="flex justify-center">
          <div className="pt-24">
            <div className="mb-6 w-full flex flex-col gap-2">
              <h1 className="text-2xl text- font-bold">Realizar Saque</h1>
              <p className="text-gray-400">Saque dinheiro de uma conta selecionada</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#020617] border border-white/10 rounded-xl p-6 max-w-3xl">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-gray-300">Usuário Destino *</label>

                  <select
                    className="w-full mt-1 bg-[#020617] border border-white/10 rounded-lg p-3"
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                  >
                    <option value="">Selecione o usuário</option>

                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300">Ativo *</label>

                  <select
                    className="w-full mt-1 bg-[#020617] border border-white/10 rounded-lg p-3"
                    value={asset}
                    onChange={e => setAsset(e.target.value)}
                  >
                    <option value="">Selecione a moeda</option>

                    {assetsData.assets.map(a => (
                      <option key={a.symbol} value={a.symbol}>
                        {a.name} ({a.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-300">Valor *</label>

                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full mt-1 bg-[#020617] border border-white/10 rounded-lg p-3"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-300">Observação (Opcional)</label>

                <textarea
                  placeholder="Motivo do depósito, hash, etc..."
                  className="w-full mt-1 bg-[#020617] border border-white/10 rounded-lg p-3 resize-none"
                  rows={4}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUser('')
                    setAsset('')
                    setAmount('')
                    setNote('')
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>

                <button type="submit" className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium">
                  Confirmar Depósito
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
