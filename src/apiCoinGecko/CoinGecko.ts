import axios from "axios"

export const api = axios.create({
  baseURL: "https://api.allorigins.win/raw?url=https://api.coingecko.com/api/v3"
})