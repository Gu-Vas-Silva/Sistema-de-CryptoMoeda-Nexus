import assetsData from "../mocks/assets.json"
import { assetToCoingeckoId } from "./assetsMap"
let cache: { data: Record<string, number>, timestamp: number } | null = null
const CACHE_TTL = 60_000

export async function getCryptoPrices() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data
  }

  const ids = assetsData.assets
    .map(asset => assetToCoingeckoId[asset.symbol])
    .filter(id => id && id !== "brl")
    .join(",")

  const response = await fetch(`/api/prices?ids=${ids}`)

  if (!response.ok) {
    if (cache) return cache.data
    throw new Error(`Erro ${response.status}`)
  }

  const data = await response.json()

  const prices: Record<string, number> = { BRL: 1 }

  assetsData.assets.forEach(asset => {
    const cgId = assetToCoingeckoId[asset.symbol]
    if (cgId && data[cgId]?.brl) {
      prices[asset.symbol] = data[cgId].brl
    }
  })

  cache = { data: prices, timestamp: Date.now() }
  return prices
}