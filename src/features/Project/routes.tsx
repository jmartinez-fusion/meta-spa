import ProjectProvider from 'src/features/Project/contexts/ProjectProvider'
import ProjectLayout from 'src/features/Project/components/ProjectLayout'
import SelectedProcessesRoutes from 'Project/features/ProcessSelection/routes'
import FutureProcessesRoutes from 'Project/features/FutureProcesses/routes'
import CurrentProcessesRoutes from 'Project/features/CurrentProcesses/routes'
import { PROJECT_PATH, PROJECT_PUBLIC_PATH } from 'Project/util.ts'
import StructureRoutes from 'Project/features/Structure/routes.tsx'
import SprintsRoutes from 'Project/features/Sprints/routes.tsx'
import RespondingSurveyRoutes from 'Project/features/RespondingSurvey/routes.tsx'
import ProjectPublicLayout from 'src/components/ProjectPublicLayout'
import ProcessMappingRoutes from 'Project/features/ProcessMapping/routes'
import TextBlocksRoutes from 'Project/features/TextBlocks/routes'
import ClientUsersRoutes from 'Project/features/ClientUsers/routes.tsx'

export const ProjectRoutes = {
  path: PROJECT_PATH,
  element: (
    <ProjectProvider>
      <ProjectLayout />
    </ProjectProvider>
  ),
  children: [
    ...SelectedProcessesRoutes,
    ...FutureProcessesRoutes,
    ...SprintsRoutes,
    ...ClientUsersRoutes,
    ...CurrentProcessesRoutes,
    ...StructureRoutes,
    ...ProcessMappingRoutes,
    ...TextBlocksRoutes,
  ],
}

export const ProjectPublicRoutes = {
  path: PROJECT_PUBLIC_PATH,
  element: (
    <ProjectProvider>
      <ProjectPublicLayout />
    </ProjectProvider>
  ),
  children: [...RespondingSurveyRoutes],
}

export default { ProjectRoutes, ProjectPublicRoutes }
