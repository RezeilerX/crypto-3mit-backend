import type { RequestHandler } from 'express'
import { matchedData } from 'express-validator'
import transactionsModel from 'models/transactions'

import { httpErrorHandler } from 'utils/http'

const createTransactionController: RequestHandler = async (req, res) => {
  try {
    const rawData = matchedData(req)
    const data = {
      ...rawData,
      ownerId: rawData.user._id
    }
    const createdTransaction = await transactionsModel.create(data)

    const result = createdTransaction
    res.send(result)
  } catch {
    httpErrorHandler(res, {
      message: 'ERROR_CREATING_TRANSACTION'
    })
  }
}

const getTransactionController: RequestHandler = async (req, res) => {
  try {
    const {
      transactionId,
      user: { id: ownerId }
    } = matchedData(req)

    const transaction = await transactionsModel
      .findOne({
        _id: transactionId,
        ownerId
      })
      .select('-createdAt -updatedAt')

    if (!transaction) {
      httpErrorHandler(res, {
        message: 'ERROR_TRANSACTION_NOT_EXIST',
        code: 404
      })
    }

    const result = transaction
    res.send({ data: result })
  } catch {
    httpErrorHandler(res, {
      message: 'ERROR_GETTING_TRANSACTION'
    })
  }
}

const getTransactionsController: RequestHandler = async (req, res) => {
  try {
    const { userId } = matchedData(req)
    const transactions = await transactionsModel.find({ userId })

    const result = transactions
    res.send({ data: result })
  } catch {
    httpErrorHandler(res, {
      message: 'ERROR_GETTING_TRANSACTIONS'
    })
  }
}

export {
  createTransactionController,
  getTransactionController,
  getTransactionsController
}
