import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  console.log('🔑 API KEY carregada:', env.COINGECKO_API_KEY ? 'SIM' : 'NÃO - VAZIA!')

  return {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api/prices": {
          target: "https://api.coingecko.com",
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path, "http://localhost")
            const ids = url.searchParams.get("ids") ?? ''
            const finalUrl = `/api/v3/simple/price?ids=${ids}&vs_currencies=brl&x_cg_demo_api_key=${env.COINGECKO_API_KEY}`
            console.log('🌐 URL final:', finalUrl)
            return finalUrl
          }
        }
      }
    }
  }
})