import { success, error } from 'utils/log'
import { connect } from 'mongoose'
import { DB_URI } from 'config/constants'

export const connectDB = (): Promise<void> => {
  return connect(DB_URI)
    .then(() => {
      success('Database successfully connected')
    })
    .catch(e => {
      error(e)
      process.exit()
    })
}
