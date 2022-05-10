const env = process.env

export const PROTOCOL = env.PROTOCOL ?? 'http'
export const HOSTNAME = env.HOSTNAME ?? 'localhost'
export const PORT = env.PORT ?? 80

export const BASE_URL = `${PROTOCOL}://${HOSTNAME}:${PORT}`

export const DB_URI = env.DB_URI ?? ''
export const JWT_SECRET = env.JWT_SECRET ?? ''
