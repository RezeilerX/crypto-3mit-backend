import { JWT_SECRET } from 'config/constants'
import jwt from 'jsonwebtoken'

export const signToken = (
  payload: string | Record<string, unknown> | Buffer
): string => {
  const sign = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '3h'
  })

  return sign
}

export const verifyToken = (token: string): unknown => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
