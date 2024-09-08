import { env } from "@/env"
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: env.BASE_URL,
})
