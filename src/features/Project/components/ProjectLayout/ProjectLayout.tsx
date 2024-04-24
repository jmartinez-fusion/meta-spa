import { type FC } from 'react'
import PrivateLayout from 'components/PrivateLayout'
import useProjectSidebarComponents from 'src/features/Project/hooks/useProjectSidebarComponents.tsx'
import ProjectSideBar from 'src/features/Project/components/ProjectSideBar'

const ProjectLayout: FC = () => {
  const { components } = useProjectSidebarComponents()

  return <PrivateLayout sidebarComponents={components} sidebar={ProjectSideBar} />
}

export default ProjectLayout
