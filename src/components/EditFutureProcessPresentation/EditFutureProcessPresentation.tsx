import { type FC } from 'react'
import { type EditFutureProcessPresentationProps } from 'components/EditFutureProcessPresentation/types'
import FutureProcessesInfo from 'Project/features/FutureProcesses/components/FutureProcessesInfo/FutureProcessesInfo.tsx'
import EditPresentation from 'components/EditPresentation'
import { RESET_FUTURE_PROCESS_PRESENTATION } from 'permissions'

const EditFutureProcessPresentation: FC<EditFutureProcessPresentationProps> = ({
  futureProcess,
  handleCloseModalEdit,
  goToEditPresentation,
  handleReset,
  handleStart,
}) => {
  return (
    <EditPresentation
      handleCloseModalEdit={handleCloseModalEdit}
      goToEditPresentation={goToEditPresentation}
      handleReset={handleReset}
      handleStart={handleStart}
      showStart={futureProcess?.status === 'not started'}
      resetPermissions={RESET_FUTURE_PROCESS_PRESENTATION}
    >
      <FutureProcessesInfo futureProcess={futureProcess} viewStatus={false} />
    </EditPresentation>
  )
}

export default EditFutureProcessPresentation
