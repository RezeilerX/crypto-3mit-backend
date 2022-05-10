import { Schema, model } from 'mongoose'

const UserScheme = new Schema(
  {
    name: {
      type: String
    },
    nickname: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('users', UserScheme)
