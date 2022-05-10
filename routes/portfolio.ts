import { Router } from 'express'
import { portfolioValidators } from 'validators/portfolio'
import { getPortfolioController } from 'controllers/portfolio'

const router = Router()

// Portfolio detail
router.get('/', portfolioValidators, getPortfolioController)

export default router
