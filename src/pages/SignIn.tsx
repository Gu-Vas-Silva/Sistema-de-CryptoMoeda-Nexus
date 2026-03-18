import { Mail, Lock } from 'lucide-react'
import usersMock from '../mocks/user.json'
import React, { useState } from 'react'

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const users = usersMock.users

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    const isUser = users.find(user => user.email === email && user.password == password)
    console.log(isUser)
      if(!isUser){
        alert('Email ou senha estão incorretos')
        return
      }
      if(isUser.status !== 'ACTIVE'){
        alert('Usuario não autorizado')
        return
      }
      localStorage.setItem("user", JSON.stringify(isUser))
      window.location.href = "/Dashboard"
  }
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="w-420px backdrop-blur-xl bg-[#0b1120]/70 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-white text-center">
              Bem-vindo ao <span className="text-blue-400">NEXUS</span>
            </h1>
            <p className="text-gray-400 text-center text-sm mt-1 mb-8">Dashboard institucional de gestão de ativos</p>
            <div className="mb-4">
              <label className="text-gray-300 text-sm mb-1 block">Email institucional</label>
              <div className="flex items-center bg-[#020617] border border-white/10 rounded-lg px-3 py-2">
                <Mail className="text-gray-400 w-4 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexus.io"
                  className="bg-transparent outline-none text-gray-200 w-full"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between">
                <label className="text-gray-300 text-sm mb-1 block">Senha</label>
              </div>
              <div className="flex items-center bg-[#020617] border border-white/10 rounded-lg px-3 py-2">
                <Lock className="text-gray-400 w-4 mr-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent outline-none text-gray-200 w-full"
                />
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition shadow-lg">
              Acessar Dashboard →
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
