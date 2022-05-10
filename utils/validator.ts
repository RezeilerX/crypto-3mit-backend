import { validationResult } from 'express-validator'
import type { Handler } from 'express'

export const validatorHandler: Handler = (req, res, next) => {
  const result = validationResult(req)

  if (result.isEmpty()) return next()

  res.status(400)
  res.send(result.array({ onlyFirstError: true }))
}
