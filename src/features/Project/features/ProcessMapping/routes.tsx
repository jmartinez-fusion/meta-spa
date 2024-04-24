import { lazy } from 'react'
import loadable from 'components/Loadable'
import { PROJECT_PATH, relativePath } from 'Project/util'
import { LIST_PROCESS_MAPPINGS, VIEW_PROCESS_MAPPINGS } from 'permissions'

// dashboard routing
const ProcessMappingList = loadable(
  lazy(async () => await import('Project/features/ProcessMapping/screen/ProcessMappingList'))
)

const ProcessMappingDetails = loadable(
  lazy(async () => await import('Project/features/ProcessMapping/screen/ProcessMappingDetails'))
)

export const PROCESS_MAPPING_PATHS = {
  LIST: `${PROJECT_PATH}process-mappings`,
  DETAILS: `${PROJECT_PATH}process-mappings/details/:processMappingId`,
}

const FutureProcessesRoutes = [
  {
    path: relativePath('LIST', PROCESS_MAPPING_PATHS),
    element: <ProcessMappingList />,
    permissions: [LIST_PROCESS_MAPPINGS],
  },
  {
    path: relativePath('DETAILS', PROCESS_MAPPING_PATHS),
    element: <ProcessMappingDetails />,
    permissions: [VIEW_PROCESS_MAPPINGS],
  },
]

export default FutureProcessesRoutes
