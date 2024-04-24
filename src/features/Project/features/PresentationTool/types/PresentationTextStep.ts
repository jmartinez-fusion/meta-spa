import PresentationStep, {
  type PresentationStepAsJson,
} from 'Project/features/PresentationTool/types/PresentationStep.ts'
import { type PresentationType, type RichText } from 'Project/features/PresentationTool/types/index'
import { type File, type FileFromApi } from 'types/file'
import { fileFromApi } from 'src/transformers/fileTransformer.ts'

export interface PresentationTextStepFromJson {
  title: string
  type: PresentationType
  comments: string
  description: string
  id?: string
  processTitle?: string
  attachments?: FileFromApi[]
}

export interface PresentationTextStepAsJson extends PresentationStepAsJson {
  text?: string
}

class PresentationTextStep extends PresentationStep {
  description?: RichText

  constructor(
    type: PresentationType = 'text',
    uuid?: string,
    comments?: RichText,
    description?: string,
    id?: string,
    title?: string,
    processTitle?: string,
    attachments?: File[]
  ) {
    super(uuid, title, type, comments, id, undefined, attachments)
    this.description = description
    this.processTitle = processTitle
  }

  get asJson(): PresentationTextStepAsJson {
    return {
      ...super.asJson,
      text: this.description || undefined,
    }
  }

  clone(): PresentationTextStep {
    return new PresentationTextStep(
      this.type,
      undefined,
      this.comments,
      this.description,
      this.id,
      this.title,
      this.processTitle,
      this.attachments
    )
  }

  get currentValues(): any {
    return {
      step: this,
      title: this.title,
      comments: this.comments,
      description: this.description,
      processTitle: this.processTitle,
    }
  }

  setDescription(value: string): void {
    this.description = value
  }

  static fromJson({
    title,
    type,
    comments,
    description,
    processTitle,
    id,
    attachments,
  }: PresentationTextStepFromJson): PresentationTextStep {
    return new PresentationTextStep(
      type,
      undefined,
      comments || undefined,
      description || undefined,
      id,
      title,
      processTitle,
      attachments ? attachments.map((attachment) => fileFromApi(attachment)) : undefined
    )
  }
}

export default PresentationTextStep
