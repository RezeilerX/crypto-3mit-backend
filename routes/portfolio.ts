import { Router } from 'express'
import authMiddleware from 'middlewares/authMiddleware'
import { getPortfolioController } from 'controllers/portfolio'

const router = Router()

// Portfolio detail
router.get('/', authMiddleware, getPortfolioController)

export default router
