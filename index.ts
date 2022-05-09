import express from 'express'
import cors from 'cors'
import { PORT } from 'config'
import { connectDB } from 'config/mongo'
import { success, error } from 'utils/log'

const app = express()

const run = async (): Promise<void> => {
  await connectDB()

  app.use(cors())

  app.listen(PORT, () => {
    success('Server online')
  })
}

run().catch(error)
