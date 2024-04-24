import { Navigate } from 'react-router-dom'
import ErrorPage from './ErrorPage'

const ErrorRoutes = [
  {
    path: '404',
    element: <ErrorPage status="404" />,
  },
  {
    path: '401',
    element: <ErrorPage status="401" />,
  },
  {
    path: '410',
    element: <ErrorPage status="410" showGoBack={false} />,
  },
  {
    path: '500',
    element: <ErrorPage status="500" />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
]

export default ErrorRoutes
