import { Schema, Types, model } from 'mongoose'

const TransactionScheme = new Schema(
  {
    type: {
      type: String,
      enum: ['buy', 'sell'],
      default: 'buy'
    },
    coinSlug: {
      type: String
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    },
    // userId
    ownerId: {
      type: Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('transactions', TransactionScheme)
