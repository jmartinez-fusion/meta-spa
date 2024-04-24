import dayjs from 'dayjs'
import {
  type AllowedSurveyQuestion,
  type FiltersToApi,
  type Survey,
  type SurveyAnswer,
  type SurveyAnswerFromApi,
  type SurveyDetail,
  type SurveyDetailFromApi,
  type SurveyFromApi,
  type SurveyProcess,
  type SurveyProcessFromApi,
  type SurveyStakeholder,
  type SurveyStakeholderFromApi,
  type SurveyType,
  type SurveyTypeValue,
} from 'Project/features/Surveys/types'
import { surveyStatusFromApi } from 'Project/features/RespondingSurvey/transformers'
import { generateUniqueId } from 'utils/utils.ts'
import { type SurveyConfigurationsFormValues } from 'Project/features/Surveys/components/SurveyConfigurationsForm/SurveyConfigurationsForm.tsx'
import SurveyQuestionFactory from 'Project/features/RespondingSurvey/models/SurveyQuestionFactory.ts'
import { findLastDate } from 'utils/findLastDate.ts'

export const surveyTypeFromApi = (type: SurveyTypeValue): SurveyType => {
  return {
    type,
    isContext: type === 'context',
    isCapture: type === 'capture',
  }
}

export const surveyFromApi = ({
  id,
  title,
  type,
  status,
  responses,
  deliveredAt,
  closedAt,
}: SurveyFromApi): Survey => {
  return {
    id,
    title,
    type: surveyTypeFromApi(type),
    status: surveyStatusFromApi(status),
    totalSent: responses?.total,
    totalSurveyed: responses?.answered,
    deliveredAt: deliveredAt ? dayjs(deliveredAt) : undefined,
    closedAt: closedAt ? dayjs(closedAt) : undefined,
  }
}

export const surveyQuestionFromApi = ({
  type,
  title,
  description,
  metadata,
  dropdownOptions,
}: any): AllowedSurveyQuestion => {
  const question: AllowedSurveyQuestion = {
    uuid: generateUniqueId(),
    type,
    title,
    description,
    process: metadata?.process,
    endStep: metadata?.endStep,
    startStep: metadata?.startStep,
  }

  if (type === 'dropdown' && dropdownOptions) {
    question.options = Object.keys(dropdownOptions).map((key: string) => dropdownOptions[key])
  }

  return question
}

export const surveyDetailFromApi = ({
  id,
  title,
  type,
  status,
  responses,
  deliveredAt,
  closedAt,
  createdAt,
  updatedAt,
  segmentation,
  statusUpdatedAt,
  questions,
  description,
}: SurveyDetailFromApi): SurveyDetail => {
  let segmentationValue

  if (segmentation?.allDepartmentStakeholders) {
    segmentationValue = 'allDepartmentStakeholders'
  }

  if (segmentation?.associatedInfluencers) {
    segmentationValue = 'associatedInfluencers'
  }

  if (segmentation?.allInfluencerStakeholders) {
    segmentationValue = 'allInfluencerStakeholders'
  }

  return {
    id,
    title,
    description,
    type: surveyTypeFromApi(type),
    status: surveyStatusFromApi(status),
    totalSent: responses?.total,
    totalSurveyed: responses?.answered,
    deliveredAt: deliveredAt ? dayjs(deliveredAt) : undefined,
    closedAt: closedAt ? dayjs(closedAt) : undefined,
    createdAt: dayjs(createdAt),
    departments: segmentation?.departments,
    includeChildren: segmentation?.includeChildren,
    includingExcluded: segmentation?.includingExcluded,
    updatedAt: dayjs(updatedAt),
    segmentation: segmentationValue,
    statusUpdatedAt: dayjs(statusUpdatedAt),
    questions: questions?.map((question) => surveyQuestionFromApi(question)),
  }
}

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { title, status, deliveredAtFrom, deliveredAtTo, closedAtFrom, closedAtTo } = data

  return {
    title,
    statuses: status.join(','),
    deliveredAtFrom: deliveredAtFrom ? deliveredAtFrom.toISOString() : undefined,
    deliveredAtTo: deliveredAtTo ? deliveredAtTo.toISOString() : undefined,
    closedAtFrom: closedAtFrom ? closedAtFrom.toISOString() : undefined,
    closedAtTo: closedAtTo ? closedAtTo.toISOString() : undefined,
  }
}

export const surveyToApi = (data: any = {}): any => {
  const { name, description, questions, module, sprintId } = data
  return {
    title: name,
    description,
    module,
    type: 'context',
    questions: questions.map((question: any, index: number) => questionToApi(question, index + 1)),
    sprintId,
  }
}

export const surveyConfigurationsToApi = (data: any = {}): any => {
  const { deliveredAt, closedAt, departments, includeChildren, includingExcluded, segmentation } =
    data

  return {
    deliveredAt,
    closedAt,
    segmentation: {
      departments: departments.map((departmentOption: any) => departmentOption.value),
      includeChildren: !!includeChildren,
      includingExcluded: !!includingExcluded,
      allDepartmentStakeholders: segmentation === 'allDepartmentStakeholders',
      allInfluencerStakeholders: segmentation === 'allInfluencerStakeholders',
      associatedInfluencers: segmentation === 'associatedInfluencers',
    },
  }
}

type DropdownOption = string | { value: string; label: string }

function arrayToObject(array: DropdownOption[]): Record<string, string> {
  return array.reduce((acc: Record<string, string> = {}, item) => {
    if (typeof item === 'string') {
      acc[item] = item
    } else {
      acc[item.value] = item.label
    }
    return acc
  }, {})
}

export const surveyStakeholderFromApi = (
  data: SurveyStakeholderFromApi = {}
): SurveyStakeholder => {
  const { id, name, influencerType, projectRole, departments, positions } = data

  return {
    id,
    name,
    influencerTypes: influencerType,
    positions,
    projectRole,
    departments,
  }
}

export const questionToApi = (data: any = {}, order: number): any => {
  const { title, description, type, options, process, startStep, endStep } = data
  const question = {
    title,
    description,
    type,
    order,
    dropdownOptions: {},
    metadata: {
      process,
      startStep,
      endStep,
    },
  }

  if (type === 'dropdown' && options) {
    question.dropdownOptions = {}
    arrayToObject(options)
    question.dropdownOptions = arrayToObject(options)
  }

  return question
}

export const surveyAnswerFromApi = ({
  id,
  status,
  module,
  title,
  stakeholder,
  questions: questionsFromApi,
}: SurveyAnswerFromApi): SurveyAnswer => {
  const questions = questionsFromApi.map((question) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return SurveyQuestionFactory[question.type]?.(question)
  })
  const lastAnsweredAt = findLastDate(
    questions
      .filter((question) => !!question?.answer?.answeredAt)
      .map((question) => question?.answer?.answeredAt)
  )

  return {
    id,
    status: surveyStatusFromApi(status),
    title,
    lastAnsweredAt: lastAnsweredAt ? dayjs(lastAnsweredAt) : undefined,
    stakeholder: surveyStakeholderFromApi(stakeholder),
    questions,
    module,
  }
}

export const surveyProcessFromApi = (data: SurveyProcessFromApi): SurveyProcess => {
  return {
    ...data,
    steps: data.templateBlocks.map((step, index) => {
      return { id: step.id, name: `${index + 1}. ${step.name}` }
    }),
  }
}

export const surveyDetailToFormValues = (data?: SurveyDetail): SurveyConfigurationsFormValues => {
  const { deliveredAt, closedAt } = data ?? {}

  return {
    deliveredAt: deliveredAt ? new Date(deliveredAt.toISOString()) : undefined,
    closedAt: closedAt ? new Date(closedAt.toISOString()) : undefined,
    segmentation: data?.segmentation,
    includeChildren: data?.includeChildren,
    includingExcluded: data?.includingExcluded,
    departments: data?.departments?.map((department) => {
      return { name: department.name, value: department.id }
    }),
  }
}
