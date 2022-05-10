import type { Response } from 'express'

interface IHttpErrorHandlerOptions {
  message?: string
  code?: number
}

export const httpErrorHandler = (
  res: Response,
  { message = 'Something went wrong', code = 500 }: IHttpErrorHandlerOptions
): void => {
  res.status(code)
  res.send({ error: message })
  res.end()
}
