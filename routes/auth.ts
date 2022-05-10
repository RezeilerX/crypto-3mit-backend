import { Router } from 'express'
import { loginValidators, registerValidators } from 'validators/auth'
import { loginController, registerController } from 'controllers/auth'

const router = Router()

// User registration
router.post('/register', registerValidators, registerController)

// User login
router.post('/login', loginValidators, loginController)

export default router
