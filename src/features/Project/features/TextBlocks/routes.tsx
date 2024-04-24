import { lazy } from 'react'
import loadable from 'components/Loadable'
import { PROJECT_PATH, relativePath } from 'Project/util'
import {
  CREATE_TEXT_BLOCKS,
  EDIT_TEXT_BLOCKS,
  LIST_TEXT_BLOCKS,
  VIEW_TEXT_BLOCKS,
} from 'permissions'

const TextBlocksList = loadable(
  lazy(async () => await import('Project/features/TextBlocks/screen/TextBlocksList'))
)

const TextBlocksCreate = loadable(
  lazy(async () => await import('Project/features/TextBlocks/screen/TextBlocksCreate'))
)

const TextBlocksDetails = loadable(
  lazy(async () => await import('Project/features/TextBlocks/screen/TextBlocksDetails'))
)

const TextBlocksEdit = loadable(
  lazy(async () => await import('Project/features/TextBlocks/screen/TextBlocksEdit'))
)

const TextBlocksClone = loadable(
  lazy(async () => await import('Project/features/TextBlocks/screen/TextBlocksClone'))
)

export const TEXT_BLOCKS_PATHS = {
  LIST: `${PROJECT_PATH}text-blocks`,
  CREATE: `${PROJECT_PATH}text-blocks/create`,
  DETAILS: `${PROJECT_PATH}text-blocks/:textBlockId/details`,
  EDIT: `${PROJECT_PATH}text-blocks/:textBlockId/edit`,
  CLONE: `${PROJECT_PATH}text-blocks/:textBlockId/clone`,
}

const TextBlocksRoutes = [
  {
    path: relativePath('LIST', TEXT_BLOCKS_PATHS),
    element: <TextBlocksList />,
    permissions: [LIST_TEXT_BLOCKS],
  },
  {
    path: relativePath('CREATE', TEXT_BLOCKS_PATHS),
    element: <TextBlocksCreate />,
    permissions: [CREATE_TEXT_BLOCKS],
  },
  {
    path: relativePath('DETAILS', TEXT_BLOCKS_PATHS),
    element: <TextBlocksDetails />,
    permissions: [VIEW_TEXT_BLOCKS],
  },
  {
    path: relativePath('EDIT', TEXT_BLOCKS_PATHS),
    element: <TextBlocksEdit />,
    permissions: [EDIT_TEXT_BLOCKS],
  },
  {
    path: relativePath('CLONE', TEXT_BLOCKS_PATHS),
    element: <TextBlocksClone />,
    permissions: [EDIT_TEXT_BLOCKS, CREATE_TEXT_BLOCKS],
  },
]

export default TextBlocksRoutes
