import { useEffect, useState } from 'react'
import usersData from '../mocks/user.json'
import { Topbar } from '../components/Topbar'
import { Sidebar } from '../components/Sidebar'

type User = {
  id: number
  name: string
  email: string
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED'
  createdAt: string
  lastActivity: string
}

export function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User>()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsedUser: User = JSON.parse(stored)
      
    setUser(parsedUser)
    setUsers(usersData.users as [])
    }
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
          <Sidebar />
      
      <div className="flex-1 bg-[#020617]">
        <Topbar user={user}/>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Usuários</h1>
              <p className="text-gray-400">Gerencie a base de clientes da plataforma.</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              className="flex-1 bg-[#020617] border border-white/10 rounded-lg p-3 outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <select
              className="bg-[#020617] border border-white/10 rounded-lg p-3"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Todos os Status</option>
              <option value="ACTIVE">Ativo</option>
              <option value="PENDING">Pendente</option>
              <option value="BLOCKED">Bloqueado</option>
            </select>
          </div>

          <div className="bg-[#020617] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="p-3 text-left">Nome / Email</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Cadastro</th>
                  <th className="p-3 text-left">Última atividade</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(user => {
                  const statusColor = {
                    ACTIVE: 'bg-green-500/20 text-green-400',
                    PENDING: 'bg-yellow-500/20 text-yellow-400',
                    BLOCKED: 'bg-red-500/20 text-red-400',
                  }

                  return (
                    <tr key={user.id} className="border-b border-white/5">
                      <td className="p-3">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </td>

                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${statusColor[user.status]}`}>
                          {user.status === 'ACTIVE' && 'Ativo'}
                          {user.status === 'PENDING' && 'Pendente'}
                          {user.status === 'BLOCKED' && 'Bloqueado'}
                        </span>
                      </td>

                      <td className="p-3 text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="p-3 text-gray-400">
                        {new Date(user.lastActivity).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className="p-4 text-sm text-gray-400">
              Mostrando {filteredUsers.length} de {users.length} usuários
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
