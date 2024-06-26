import { Schema, Types, model } from 'mongoose'

const PortfolioScheme = new Schema(
  {
    coins: [
      {
        slug: String,
        quantity: Number
      }
    ],
    userId: {
      type: Types.ObjectId
    },
    totalValue: {
      type: Number
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

export default model('portfolios', PortfolioScheme)
