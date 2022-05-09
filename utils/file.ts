import path from 'path'

export const getBaseName = (filePath: string): string => {
  return path.basename(filePath)
}

export const getFileName = (filePath: string): string => {
  return path.parse(filePath).name
}
