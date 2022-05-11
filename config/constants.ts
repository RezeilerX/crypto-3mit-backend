const env = process.env

export const PORT = env.PORT ?? 80
export const DB_URI = env.DB_URI ?? ''
export const JWT_SECRET = env.JWT_SECRET ?? ''
