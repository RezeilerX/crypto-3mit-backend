import type { RequestHandler } from 'express'
import type { UserToken } from 'types'

import { matchedData } from 'express-validator'
import { omit } from 'lodash'
import usersModel from 'models/users'
import portfoliosModel from 'models/portfolios'

import { encryptPassword, comparePassword } from 'utils/password'
import { signToken } from 'utils/jwt'
import { httpErrorHandler } from 'utils/http'

const registerController: RequestHandler = async (req, res) => {
  try {
    const rawData = matchedData(req)
    const data = {
      ...rawData,
      password: await encryptPassword(rawData.password)
    }

    // User creation
    const createdUser = await usersModel.create(data)
    const { _id, email } = createdUser
    const userToken: UserToken = { _id, email }
    const result = {
      user: omit(createdUser.toJSON(), ['password', 'createdAt', 'updatedAt']),
      token: signToken(userToken)
    }

    // Portfolio creation
    await portfoliosModel.create({ userId: _id })

    res.status(201)
    res.send({ data: result })
  } catch (error: any) {
    if (error?.name === 'MongoServerError' && error?.code === 11000) {
      httpErrorHandler(res, {
        message: 'ERROR_USER_DUPLICATED',
        code: 409
      })
    } else {
      httpErrorHandler(res, {
        message: 'ERROR_CREATING_USER'
      })
    }
  }
}

const loginController: RequestHandler = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await usersModel.findOne({ email: data.email })

    if (!user) {
      httpErrorHandler(res, {
        message: 'ERROR_USER_NOT_EXIST',
        code: 404
      })
    }

    const passwordHash = user.password
    const isCorrectPassword = comparePassword(data.password, passwordHash)

    if (!isCorrectPassword) {
      httpErrorHandler(res, {
        message: 'PASSWORD_INVALID',
        code: 401
      })
    }

    const { _id, email } = user
    const userToken: UserToken = { _id, email }
    const result = {
      user: omit(user.toJSON(), ['password', 'createdAt', 'updatedAt']),
      token: signToken(userToken)
    }

    res.send({ data: result })
  } catch {
    httpErrorHandler(res, {
      message: 'ERROR_USER_LOGIN'
    })
  }
}

export { registerController, loginController }
