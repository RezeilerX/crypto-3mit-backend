import { JWT_SECRET } from 'config/constants'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const signToken = (payload: JwtPayload): string => {
  const sign = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '3h'
  })

  return sign
}

export const verifyToken = (token: string): unknown => {
  return jwt.verify(token, JWT_SECRET)
}
