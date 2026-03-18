import { useEffect, useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { Topbar } from "../components/Topbar"
import assetsData from "../mocks/assets.json"
import { getCryptoPrices } from "../utils/priceService"

type User = {
  id: number
  name: string
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED'
}

export function Convert() {

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User>()

  useEffect (() => {
    const stored = localStorage.getItem('user')
    if(stored){
         const parsedUser: User = JSON.parse(stored)
         setUser(parsedUser)
    }
  }, [])

  async function handleConvert() {

    if (!from || !to || !amount) return

    setLoading(true)

    const prices = await getCryptoPrices()

    const fromPrice = prices[from] || 1
    const toPrice = prices[to] || 1

    const valueInBRL = Number(amount) * fromPrice
    const converted = valueInBRL / toPrice

    setResult(converted)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">

      <Sidebar />

      <div className="flex-1">

        <Topbar user={user} />
      
      <div className="flex justify-center">
        <div className="flex flex-col items-center pt-24">

          <div className="mb-6 flex flex-col w-full gap-2">
            <h1 className="text-2xl font-bold">Conversor OTC</h1>
            <p className="text-gray-400">
              Cotação em tempo real via CoinGecko API.
            </p>
          </div>

          <div className="flex gap-6">

            <div className="bg-[#020617] border border-white/10 rounded-xl p-20 w-150">

              <div className="flex items-center gap-4 mb-4">

                <select
                  className="flex-1 bg-[#020617] border border-white/10 rounded-lg p-3"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                >
                  <option value="">Origem</option>
                  {assetsData.assets.map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.name} ({a.symbol})
                    </option>
                  ))}
                </select>

                <span className="text-gray-400">→</span>

                <select
                  className="flex-1 bg-[#020617] border border-white/10 rounded-lg p-3"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                >
                  <option value="">Destino</option>
                  {assetsData.assets.map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.name} ({a.symbol})
                    </option>
                  ))}
                </select>

              </div>

              <div className="mb-4">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-[#020617] border border-white/10 rounded-lg p-3"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button
                onClick={handleConvert}
                className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-medium"
              >
                {loading ? "Calculando..." : "Calcular Conversão"}
              </button>

            </div>

            <div className="bg-[#020617] border border-white/10 rounded-xl flex items-center justify-center w-150 p-20">

              {!result ? (
                <p className="text-gray-400 text-center">
                  Preencha os dados ao lado<br />
                  para visualizar a simulação.
                </p>
              ) : (
                <div className="text-center">

                  <p className="text-gray-400 mb-2">
                    Resultado da conversão
                  </p>

                  <h2 className="text-2xl font-bold">
                    {Number(amount).toFixed(4)} {from}
                  </h2>

                  <p className="text-gray-400 my-2">≈</p>

                  <h2 className="text-3xl font-bold text-green-400">
                    {result.toFixed(4)} {to}
                  </h2>

                </div>
              )}

            </div>

          </div>

        </div>
        </div>
      </div>
    </div>
  )
}