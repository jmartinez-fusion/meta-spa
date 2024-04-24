import { PROJECT_PATH, relativePath } from 'Project/util.ts'

export const STRUCTURE_PATH = `${PROJECT_PATH}structure/`
export const structurePath = (path: string, pathOptions: Record<string, string>): string =>
  relativePath(path, pathOptions)
