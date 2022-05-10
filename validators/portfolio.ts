import { validatorHandler } from 'utils/validator'
import { check } from 'express-validator'

const portfolioValidators = [
  check('userId').exists().notEmpty().isMongoId(),
  validatorHandler
]

export { portfolioValidators }
