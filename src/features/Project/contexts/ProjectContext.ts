import { createContext } from 'react'
import { type ProjectProviderType } from './ProjectProvider.tsx'

const ProjectContext = createContext<ProjectProviderType>({
  isLoading: false,
  project: undefined,
  setPresentationStepForSurvey: () => {},
  clearPresentationStepForSurvey: () => {},
  presentationStepForSurvey: undefined,
})

export default ProjectContext
