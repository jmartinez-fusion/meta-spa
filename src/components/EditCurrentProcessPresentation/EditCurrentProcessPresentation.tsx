import { type FC } from 'react'
import EditPresentation from 'components/EditPresentation'
import { type EditCurrentProcessPresentationProps } from 'components/EditCurrentProcessPresentation/types'
import CurrentProcessesInfo from 'Project/features/CurrentProcesses/components/CurrentProcessesInfo/CurrentProcessesInfo.tsx'
import { RESET_CURRENT_PROCESS_PRESENTATION } from 'permissions'

const EditCurrentProcessPresentation: FC<EditCurrentProcessPresentationProps> = ({
  currentProcess,
  handleCloseModalEdit,
  handleReset,
  handleStart,
  goToEditPresentation,
}) => {
  return (
    <EditPresentation
      handleCloseModalEdit={handleCloseModalEdit}
      goToEditPresentation={goToEditPresentation}
      handleReset={handleReset}
      handleStart={handleStart}
      showStart={currentProcess?.status === 'not started'}
      resetPermissions={RESET_CURRENT_PROCESS_PRESENTATION}
    >
      <CurrentProcessesInfo currentProcess={currentProcess} viewStatus={false} />
    </EditPresentation>
  )
}

export default EditCurrentProcessPresentation
