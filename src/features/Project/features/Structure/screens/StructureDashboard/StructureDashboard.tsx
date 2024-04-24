import { type FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useProject from 'Project/hooks/useProject.ts'
import { DEPARTMENTS_PATHS } from 'Project/features/Structure/features/Departments/routes.tsx'

const StructureDashboard: FC = () => {
  const navigate = useNavigate()
  const { project } = useProject()

  useEffect(() => {
    navigate(DEPARTMENTS_PATHS.LIST.replace(':projectId', project?.id ?? ''))
  }, [])

  return null
}

export default StructureDashboard
