import { useContext } from 'react'
import ProjectContext from 'src/features/Project/contexts/ProjectContext.ts'
import { type ProjectProviderType } from 'src/features/Project/contexts/ProjectProvider.tsx'

const useProject = (): ProjectProviderType => useContext(ProjectContext)

export default useProject
