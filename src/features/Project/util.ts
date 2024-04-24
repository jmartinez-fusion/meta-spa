export const PROJECT_PATH = `/project/:projectId/`
export const PROJECT_PUBLIC_PATH = `/external/project/:projectId/`

export const relativePath = (path: string, pathOptions: Record<string, string>): string =>
  pathOptions[path]?.replace(PROJECT_PATH, '') || ''

export const projectPublicPath = (path: string, pathOptions: Record<string, string>): string =>
  pathOptions[path]?.replace(PROJECT_PUBLIC_PATH, '') || ''
