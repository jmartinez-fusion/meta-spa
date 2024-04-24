import { type PresentationType, type RichText } from 'Project/features/PresentationTool/types'
import { generateUniqueId } from 'utils/utils.ts'
import { type File } from 'types/file'

export interface PresentationStepAsJson {
  stepId: string | null
  title?: string
  comment?: string
  type: string
  deleted: boolean
  processTitle?: string
  attachments?: string[]
}

class PresentationStep {
  uuid: string
  id?: string
  title?: string
  deleted: boolean
  number?: string | number
  type: PresentationType
  comments?: RichText
  processTitle?: string
  attachments?: File[]

  constructor(
    uuid: string = generateUniqueId(),
    title: string = '',
    type: PresentationType,
    comments: RichText,
    id?: string,
    processTitle?: string,
    attachments?: File[]
  ) {
    this.uuid = uuid
    this.id = id
    this.title = title
    this.type = type
    this.deleted = false
    this.comments = comments
    this.processTitle = processTitle
    this.attachments = attachments
  }

  get asJson(): PresentationStepAsJson {
    return {
      stepId: this.id ?? null,
      title: this.title,
      comment: this.comments,
      type: this.type,
      deleted: this.deleted,
      processTitle: this.processTitle,
      attachments: this.attachments
        ? this.attachments?.map((attachment) => attachment.id)
        : undefined,
    }
  }

  get currentValues(): any {
    return {
      step: this,
      title: this.title,
      comments: this.comments,
      processTitle: this.processTitle,
    }
  }

  setComments(value: any): void {
    this.comments = value
  }

  setTitle(value: string): void {
    this.title = value
  }

  setProcessTitle(value: string): void {
    this.processTitle = value
  }

  delete(): void {
    this.deleted = true
  }
}

export default PresentationStep
