import colors from 'colors'

export const log = (message?: unknown, ...rest: unknown[]): void => {
  console.log(message, ...rest)
}

export const info = (message: string): void => {
  log(colors.blue(message))
}

export const success = (message: string): void => {
  log(colors.green(message))
}

export const warn = (message: string): void => {
  const error = new Error(message)
  const stackTrace = error?.stack?.split('\n').slice(2).join('\n')
  const newStackTrace = `Warning: ${message}\n${stackTrace}`

  log(colors.yellow(newStackTrace))
}

export const error = (message: string | Error): void => {
  const isString = typeof message === 'string'
  const error = isString ? new Error(message) : message
  const stackTrace = error?.stack?.split('\n').slice(1).join('\n')
  const newStackTraceHeader = `Error: ${error.message}`

  log(colors.red(newStackTraceHeader))
  log(`${stackTrace}`)
}
