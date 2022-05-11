import express from 'express'
import cors from 'cors'
import { PORT } from 'config'
import { connectDB } from 'config/mongo'
import { success, error } from 'utils/log'
import router from 'routes/router'

const app = express()

const run = async (): Promise<void> => {
  await connectDB()

  app.use(cors())
  app.use(express.json())
  app.use('/api/v1', router)

  app.listen(PORT, () => {
    success(`Server online at port: ${PORT}`)
  })
}

run().catch(error)
