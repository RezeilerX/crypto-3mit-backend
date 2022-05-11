import type { RequestHandler } from 'express'
import type { UserToken } from 'types'

import usersModel from 'models/users'
import { verifyToken } from 'utils/jwt'
import { httpErrorHandler } from 'utils/http'

const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const autorization = req.headers.authorization as string
    if (!autorization) {
      throw new Error('NEED_SESSION')
    }

    const token = autorization.split('Bearer ').pop()
    const tokenData = verifyToken(`${token}`) as UserToken

    if (!tokenData._id || !tokenData.email) {
      httpErrorHandler(res, {
        message: 'ERROR_INVALID_TOKEN',
        code: 401
      })
    }

    const user = await usersModel.findById(tokenData._id)

    // Pass the user to the next middleware
    if (user) req.body.user = user

    next()
  } catch (error: any) {
    httpErrorHandler(res, {
      message: 'ERROR_INVALID_SESSION',
      code: 401
    })
  }
}

export default authMiddleware
