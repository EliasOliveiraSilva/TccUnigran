import 'dotenv/config'
import mongoose from 'mongoose'

async function connectDatabase() {

    await mongoose.connect(process.env.DB_URI)
}

export default connectDatabase