import { type FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DASHBOARD } from 'src/utils/constants.ts'

const BaseDashboard: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(DASHBOARD)
  }, [])

  return null
}

export default BaseDashboard
