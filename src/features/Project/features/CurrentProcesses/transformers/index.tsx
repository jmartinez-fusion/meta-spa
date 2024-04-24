import {
  type FiltersToApi,
  type CurrentProcess,
  type CurrentProcessToApi,
  type CurrentProcessFormValues,
  type CurrentProcessRequestCapturingFromApi,
  type CurrentProcessRequestCapturing,
} from 'Project/features/CurrentProcesses/types'
import dayjs from 'dayjs'

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const {
    currentProcess,
    associatedCurrentProcess,
    associatedSPCProcess,
    spcBranch,
    onlyUncategorized,
    updatedAtFrom,
    updatedAtTo,
    status,
  } = data

  return {
    currentProcess,
    associatedCurrentProcess,
    associatedSPCProcess,
    spcBranch,
    spcBranchOnlyUncategorized: onlyUncategorized,
    updatedAtFrom: updatedAtFrom ? updatedAtFrom.toISOString() : undefined,
    updatedAtTo: updatedAtTo ? updatedAtTo.toISOString() : undefined,
    status,
  }
}

export const currentProcessFromApi = (data: any = {}): CurrentProcess => {
  const {
    id,
    name,
    associatedCurrentProcesses,
    associatedSpc,
    spcBranch,
    mappedBy,
    updatedAt,
    canBeDeleted,
    status,
  } = data

  return {
    id,
    currentProcess: name,
    associatedCurrentProcesses,
    associatedSpc,
    spcBranch,
    mappedBy,
    updatedAt: dayjs(updatedAt).toISOString(),
    canBeDeleted,
    status,
  }
}

export const currentProcessRequestCapturingFromApi = ({
  id,
  name,
  presentationId,
  subProcesses = [],
}: CurrentProcessRequestCapturingFromApi): CurrentProcessRequestCapturing => {
  return {
    id,
    name,
    presentationId,
    subProcesses: subProcesses.map((subProcess: CurrentProcessRequestCapturingFromApi) =>
      currentProcessRequestCapturingFromApi(subProcess)
    ),
  }
}

export const CurrentProcessToAPI = (data: any = {}): CurrentProcessToApi => {
  const { name, associatedCurrentProcesses, associatedSPCs, submitAndRedirect } = data

  return {
    name,
    submitAndRedirect,
    associatesId: associatedCurrentProcesses?.value ?? null,
    spcsId: associatedSPCs?.value ?? null,
  }
}

export const currentProcessToFormValues = (
  currentProcess: CurrentProcess
): CurrentProcessFormValues => {
  return {
    id: currentProcess.id,
    name: currentProcess?.currentProcess,
    associatedCurrentProcesses: currentProcess?.associatedCurrentProcesses
      ? {
          id: currentProcess.associatedCurrentProcesses?.id ?? '',
          name: currentProcess.associatedCurrentProcesses?.name ?? '',
          value: currentProcess.associatedCurrentProcesses?.id ?? '',
        }
      : null,
    associatedSPCs: currentProcess?.associatedSpc
      ? {
          id: currentProcess?.associatedSpc?.id,
          name: currentProcess?.associatedSpc?.name,
          value: currentProcess?.associatedSpc?.id,
        }
      : null,
  }
}
