import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch.ts'
import { projectRoleFromApi } from 'features/ProjectRoles/transformers'
import { type ProjectRole, type ProjectRoleFromApi } from 'features/ProjectRoles/types'

const useFetchProjectRoles = (): { projectRoles: ProjectRole[] } => {
  const { t } = useTranslation('features', { keyPrefix: 'Industries' })
  const { response, doFetch } = useFetch(`${config.api.msOrganization.baseUrl}/project-roles`)
  const [projectRoles, setProjectRoles] = useState<ProjectRole[]>([])

  useEffect(() => {
    if (!response) return

    const projectRoles = response.data.map((projectRole: ProjectRoleFromApi) =>
      projectRoleFromApi(projectRole)
    )

    setProjectRoles(projectRoles)
  }, [response, t])

  useEffect(() => {
    void doFetch()
  }, [])

  return { projectRoles }
}

export default useFetchProjectRoles
