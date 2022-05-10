import type { RequestHandler } from 'express'
import { matchedData } from 'express-validator'
import { omit } from 'lodash'
import usersModel from 'models/users'

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

    const createdUser = await usersModel.create(data)
    const { _id, email } = createdUser
    const result = {
      user: omit(createdUser.toJSON(), ['password', 'createdAt', 'updatedAt']),
      token: signToken({ _id, email })
    }

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
    const result = {
      user: omit(user.toJSON(), ['password', 'createdAt', 'updatedAt']),
      token: signToken({ _id, email })
    }

    res.send({ data: result })
  } catch {
    httpErrorHandler(res, {
      message: 'ERROR_USER_LOGIN'
    })
  }
}

export { registerController, loginController }
