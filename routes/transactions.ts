import { Router } from 'express'
import authMiddleware from 'middlewares/authMiddleware'
import {
  createTransactionValidators,
  getTransactionValidators,
  getTransactionsValidators
} from 'validators/transactions'
import {
  createTransactionController,
  getTransactionController,
  getTransactionsController
} from 'controllers/transactions'

const router = Router()

// Transaction creation
router.post(
  '/',
  authMiddleware,
  createTransactionValidators,
  createTransactionController
)

// Transaction detail
router.get(
  '/:transactionId',
  authMiddleware,
  getTransactionValidators,
  getTransactionController
)

// Transaction list
router.get(
  '/',
  authMiddleware,
  getTransactionsValidators,
  getTransactionsController
)

export default router
