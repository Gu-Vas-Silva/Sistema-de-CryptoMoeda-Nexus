import { api } from "../apiCoinGecko/CoinGecko"
import assetsData from "../mocks/assets.json"
import { assetToCoingeckoId } from "./assetsMap"

export async function getCryptoPrices() {

  const ids = assetsData.assets
    .map(asset => assetToCoingeckoId[asset.symbol])
    .filter(id => id && id !== "brl")
    .join(",")

  const response = await api.get("/simple/price", {
    params: {
      ids,
      vs_currencies: "brl"
    }
  })

  const data = response.data

  const prices: Record<string, number> = {
    BRL: 1
  }

  assetsData.assets.forEach(asset => {
    const cgId = assetToCoingeckoId[asset.symbol]

    if (cgId && data[cgId]) {
      prices[asset.symbol] = data[cgId].brl
    }
  })

  return prices
}