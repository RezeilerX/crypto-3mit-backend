import type { RequestHandler } from 'express'
import portfoliosModel from 'models/portfolios'

import { httpErrorHandler } from 'utils/http'

const getPortfolioController: RequestHandler = async (req, res) => {
  try {
    const userId = req.body.user._id
    const portfolio = await portfoliosModel.findOne({ userId })

    if (!portfolio) {
      httpErrorHandler(res, {
        message: 'ERROR_PORTFOLIO_NOT_EXIST',
        code: 404
      })
    }

    const result = portfolio
    res.send({ data: result })
  } catch {
    httpErrorHandler(res, {
      message: 'ERROR_GETTING_PORTFOLIO'
    })
  }
}

export { getPortfolioController }
