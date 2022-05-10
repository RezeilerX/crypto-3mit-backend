import { validatorHandler } from 'utils/validator'
import { check } from 'express-validator'

const registerValidators = [
  check('name').exists().notEmpty().isLength({ max: 50 }),
  check('nickname').exists().notEmpty().isLength({ min: 2, max: 50 }),
  check('email').exists().notEmpty().isEmail().isLength({ min: 5, max: 50 }),
  check('password').exists().notEmpty().isLength({ min: 8, max: 50 }),
  validatorHandler
]

const loginValidators = [
  check('email').exists().notEmpty().isEmail().isLength({ min: 5, max: 50 }),
  check('password').exists().notEmpty().isLength({ min: 8, max: 50 }),
  validatorHandler
]

export { registerValidators, loginValidators }
