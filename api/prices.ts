import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { ids } = req.query

    if (!ids) return res.status(400).json({ error: 'ids obrigatório' })

    const apiKey = process.env.COINGECKO_API_KEY ?? ''

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=brl&x_cg_demo_api_key=${apiKey}`
    )

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erro CoinGecko: ${response.status}` })
    }

    const data = await response.json()
    return res.status(200).json(data)

  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}