import bcriptjs from 'bcryptjs'

export const encryptPassword = async (
  plainPassword: string
): Promise<string> => {
  return await bcriptjs.hash(plainPassword, 15)
}

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcriptjs.compare(plainPassword, hashedPassword)
}
