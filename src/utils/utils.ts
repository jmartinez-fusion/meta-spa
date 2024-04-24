// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { v4 as uuidv4 } from 'uuid'
const generateUniqueId = (): string => uuidv4()

export const toCamelCase = (input: string): string =>
  input
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '')

export { generateUniqueId }
