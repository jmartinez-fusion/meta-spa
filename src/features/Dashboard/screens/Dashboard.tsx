import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJECTS_PATHS } from 'Projects/routes.tsx'

const Dashboard = (): ReactNode => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(PROJECTS_PATHS.LIST)
  }, [])

  return null
}

export default Dashboard
