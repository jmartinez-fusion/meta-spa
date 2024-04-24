import { type ReactNode, useState } from 'react'
import useFetchProjectDetail from 'src/features/Projects/hooks/useFetchProjectDetail.tsx'
import { type Project } from 'src/features/Projects/types'
import { useParams } from 'react-router-dom'
import ProjectContext from './ProjectContext.ts'
import LoadingRing from 'components/LoadingRing'
import ErrorPage from 'src/features/Errors'
import { type AllowedPresentationStep } from 'Project/features/PresentationTool/types'

export interface PresentationStepForSurvey {
  processId: string
  step: AllowedPresentationStep
}

export interface ProjectProviderType {
  isLoading: boolean
  project?: Project
  setPresentationStepForSurvey: (processId: string, step: AllowedPresentationStep) => void
  clearPresentationStepForSurvey: () => void
  presentationStepForSurvey?: PresentationStepForSurvey
}

interface ProjectProviderProps {
  children: ReactNode
}

const ProjectProvider = ({ children }: ProjectProviderProps): ReactNode => {
  const { projectId } = useParams()
  const [presentationStepForSurvey, setPresentationStepForSurvey] = useState<
    PresentationStepForSurvey | undefined
  >(undefined)
  const { project, loading, error } = useFetchProjectDetail({ id: projectId ?? '' })

  const changePresentationStepForSurvey = (
    processId: string,
    step: AllowedPresentationStep
  ): void => {
    setPresentationStepForSurvey({ processId, step })
  }

  const clearPresentationStepForSurvey = (): void => {
    setPresentationStepForSurvey(undefined)
  }

  if (loading || !project?.id) {
    return <LoadingRing center />
  }

  if (error) {
    return <ErrorPage status="404" />
  }

  return (
    <ProjectContext.Provider
      value={{
        project,
        setPresentationStepForSurvey: changePresentationStepForSurvey,
        presentationStepForSurvey,
        clearPresentationStepForSurvey,
        isLoading: loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider
