import dayjs from 'dayjs'
import {
  type TextBlockToApi,
  type TextBlockFromApi,
  type TagFromApi,
  type Tag,
  type TextBlockFilterToApi,
  type TextBlockReference,
  type TextBlockReferenceToApi,
  type TextBlockReferenceFromApi,
} from 'Project/features/TextBlocks/types'

export const textBlocksFromApi = (data: any = {}): TextBlockFromApi => {
  const { createdAt, createdBy, description, id, isGlobal, title, updatedAt, updatedBy } = data

  return {
    id,
    title,
    description,
    createdBy,
    createdAt: dayjs(createdAt).toISOString(),
    updatedBy,
    updatedAt: dayjs(updatedAt).toISOString(),
    isGlobal,
    references: [],
  }
}

export const textBlockReferenceFromApi = (data: TextBlockReferenceFromApi): TextBlockReference => {
  const { id, type, metadata, question, survey, name, module, processId, stepNumber, answer } =
    data || {}

  const referenceData: any = {}

  if (type === 'survey_answer') {
    referenceData.questionId = question?.id
    referenceData.questionName = question?.name
    referenceData.surveyId = survey?.id
    referenceData.surveyName = survey?.name
    referenceData.answerId = answer?.answerId
    referenceData.responderName = answer?.responderName
    referenceData.questionAnswerId = answer?.questionAnswerId
    referenceData.module = survey?.module
  }

  if (type === 'presentation_step') {
    referenceData.processName = name
    referenceData.processId = processId
    referenceData.module = module
    referenceData.stepNumber = stepNumber
  }

  return {
    id,
    type,
    metadata,
    referenceData,
  }
}

export const textBlockFromApi = (data: any = {}): TextBlockFromApi => {
  const {
    createdAt,
    createdBy,
    description,
    id,
    isGlobal,
    title,
    updatedAt,
    updatedBy,
    tags,
    category,
    references = [],
  } = data

  return {
    id,
    title,
    description,
    createdBy,
    createdAt: dayjs(createdAt).toISOString(),
    updatedBy,
    updatedAt: dayjs(updatedAt).toISOString(),
    isGlobal,
    tags,
    category,
    references: references?.map((reference: TextBlockReferenceFromApi) =>
      textBlockReferenceFromApi(reference)
    ),
  }
}

export const textBlockToFormValues = (data: any = {}): TextBlockFromApi => {
  const {
    createdAt,
    createdBy,
    description,
    id,
    isGlobal,
    title,
    updatedAt,
    updatedBy,
    tags,
    category,
    references,
  } = data

  return {
    id,
    title,
    description,
    createdBy,
    createdAt: dayjs(createdAt).toISOString(),
    updatedBy,
    updatedAt: dayjs(updatedAt).toISOString(),
    isGlobal,
    tags,
    category: category?.id,
    references,
  }
}

export const filtersToApi = (data: any = {}): TextBlockFilterToApi => {
  const {
    question,
    tags,
    categories,
    createdAtFrom,
    createdAtTo,
    createdBy,
    updatedAtFrom,
    updatedAtTo,
    updatedBy,
  } = data

  return {
    question,
    tags: tags.map((tag: any) => tag.value).join(','),
    categories: categories.map((category: any) => category.value).join(','),
    createdBy,
    createdAtFrom: createdAtFrom ? createdAtFrom.toISOString() : undefined,
    createdAtTo: createdAtTo ? createdAtTo.toISOString() : undefined,
    updatedBy,
    updatedAtFrom: updatedAtFrom ? updatedAtFrom.toISOString() : undefined,
    updatedAtTo: updatedAtTo ? updatedAtTo.toISOString() : undefined,
  }
}

export const tagFromApi = (data: TagFromApi): Tag => {
  const { id, name, updatedAt, createdAt } = data

  return {
    id,
    name,
    updatedAt: dayjs(updatedAt),
    createdAt: dayjs(createdAt),
  }
}

export const transformTags = (tags: any[]): any[] => {
  return tags.map((tag) => ({
    name: tag.name,
    id: tag.name === tag.id ? null : tag.id,
  }))
}

export const transformArray = (
  array: Array<{ name: string; value: string }>
): Array<{ name: string; id: string }> => {
  return array.map((item) => ({
    name: item.name,
    id: item.value,
  }))
}

export const textBlockReferenceToApi = (data: TextBlockReference): TextBlockReferenceToApi => {
  const { id, type, metadata = {} } = data

  return {
    referenceId: id,
    type,
    metadata,
  }
}

export const textBlockToApi = (data: any = {}): TextBlockToApi => {
  const { title, description, tags, category, references } = data

  return {
    title,
    tags: transformTags(tags),
    category,
    description,
    references: references.map((reference: TextBlockReference) =>
      textBlockReferenceToApi(reference)
    ),
  }
}
