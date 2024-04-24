import DepartmentsRoutes from 'Project/features/Structure/features/Departments/routes.tsx'
import PositionsRoutes from 'Project/features/Structure/features/Positions/routes.tsx'
import StructureDashboard from 'Project/features/Structure/screens/StructureDashboard'
import StakeholdersRoutes from 'Project/features/Structure/features/Stakeholders/routes.tsx'

const BaseRoute = {
  path: 'structure',
  element: <StructureDashboard />,
}

export const StructureRoutes = [
  ...DepartmentsRoutes,
  ...PositionsRoutes,
  ...StakeholdersRoutes,
  BaseRoute,
]

export default StructureRoutes
