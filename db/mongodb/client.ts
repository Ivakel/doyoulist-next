import { env } from "@/env"
import mongoose from "mongoose"
const connection: { isConnected?: number } = {}

async function dbConnect() {
    if (connection.isConnected) {
        return
    }
    const db = await mongoose.connect(env.MONGO_URI)
    connection.isConnected = db.connections[0].readyState
}
export default dbConnect
