import entitiesToOptions from 'utils/entityToOptions'
import useFetchIndustries from 'Industries/hooks/useFetchIndustries'
import useFetchRoles from 'Roles/hooks/useFetchRolesOptions'
import useFetchFutureProcesses from 'Project/features/ProcessSelection/hooks/useFetchFutureProcesses'
import useFetchFutureProcessesStatus from 'Project/features/FutureProcesses/hooks/useFetchFutureProcessesStatus'
import useFetchCurrentProcesses from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcesses'
import useFetchSPCes from 'Project/features/ProcessSelection/hooks/useFetchSPCs'
import useFetchCategories from 'features/Categories/hooks/useFetchCategories'
import useFetchCurrentProcessesStatus from 'Project/features/CurrentProcesses/hooks/useCurrentProcessesStatus'
import useFetchDepartments from 'Project/features/Structure/features/Departments/hooks/useFetchDepartments'
import useFetchPositions from 'Project/features/Structure/features/Positions/hooks/useFetchPositions'
import useFetchTags from 'Project/features/TextBlocks/hooks/useFetchTags'
import useFetchSprints from 'Project/features/Sprints/hooks/useFetchSprints'
import useFetchProjectRoles from 'features/ProjectRoles/hooks/useFetchProjectRoles'
import useFetchSurveys from 'Project/features/Surveys/hooks/useFetchSurveys.tsx'


type ResourceName = string

type Options = {
  [key in `${ResourceName}Options`]: any[]
}

const HOOKS_MAP: Record<ResourceName, any> = {
  industries: useFetchIndustries,
  categories: useFetchCategories,
  roles: useFetchRoles,
  futureProcesses: useFetchFutureProcesses,
  futureProcessesStatus: useFetchFutureProcessesStatus,
  currentProcesses: useFetchCurrentProcesses,
  currentProcessesList: useFetchCurrentProcesses,
  departments: useFetchDepartments,
  positions: useFetchPositions,
  SPCs: useFetchSPCes,
  surveys: useFetchSurveys,
  currentProcessesStatus: useFetchCurrentProcessesStatus,
  tags: useFetchTags,
  sprints: useFetchSprints,
  projectRoles: useFetchProjectRoles,
}

const FIELD_LABEL: Record<ResourceName, string> = {
  industries: 'name',
  categories: 'name',
  roles: 'name',
  futureProcesses: 'name',
  futureProcessesStatus: 'name',
  currentProcesses: 'name',
  currentProcessesList: 'currentProcess',
  departments: 'name',
  positions: 'name',
  SPCs: 'name',
  surveys: 'title',
  tags: 'name',
  sprints: 'name',
  projectRoles: 'name',
}

const FIELD_VALUE: Record<ResourceName, string> = {
  industries: 'id',
  categories: 'id',
  roles: 'id',
  futureProcesses: 'branchCode',
  futureProcessesStatus: 'id',
  currentProcesses: 'name',
  currentProcessesList: 'id',
  departments: 'id',
  surveys: 'id',
  positions: 'id',
  SPCs: 'id',
  tags: 'id',
  sprints: 'id',
  projectRoles: 'id',
}

const useGetOptions = (resourceNameList: ResourceName[], filters?: any): Options => {
  const options: Partial<Options> = {}

  resourceNameList.forEach((resourceName: ResourceName) => {
    const resourceFetchHook = HOOKS_MAP[resourceName]
    const hookData = resourceFetchHook?.({ filters })

    const resourceList = hookData?.[resourceName] || []
    options[`${resourceName}Options`] = entitiesToOptions(resourceList, {
      fieldLabel: FIELD_LABEL[resourceName],
      fieldValue: FIELD_VALUE[resourceName],
    })
  })

  return options as Options
}

export default useGetOptions
