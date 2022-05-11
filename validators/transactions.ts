import { validatorHandler } from 'utils/validator'
import { check, body } from 'express-validator'

const createTransactionValidators = [
  check('type').exists().notEmpty().optional(),
  check('coinSlug').exists().notEmpty(),
  check('quantity').exists().notEmpty().isNumeric(),
  check('price').exists().notEmpty().isNumeric(),
  check('user').exists().notEmpty(),
  validatorHandler
]

const getTransactionValidators = [
  check('transactionId').exists().notEmpty(),
  body('user').exists().notEmpty(),
  validatorHandler
]

const getTransactionsValidators = [
  body('user').exists().notEmpty(),
  validatorHandler
]

export {
  createTransactionValidators,
  getTransactionValidators,
  getTransactionsValidators
}
