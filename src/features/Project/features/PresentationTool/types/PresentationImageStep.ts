import PresentationStep, {
  type PresentationStepAsJson,
} from 'Project/features/PresentationTool/types/PresentationStep.ts'
import {
  type Image,
  type PresentationType,
  type RichText,
} from 'Project/features/PresentationTool/types/index'
import { type File, type FileFromApi } from 'types/file'
import { fileFromApi } from 'src/transformers/fileTransformer.ts'

export interface PresentationImageStepFromJson {
  title: string
  type: PresentationType
  comments: string
  image: Image
  imageData?: any
  id?: string
  attachments?: FileFromApi[]
}

export interface PresentationImageStepAsJson extends PresentationStepAsJson {
  imageId: string
  imageData?: string
}

class PresentationImageStep extends PresentationStep {
  image: Image
  imageData?: any

  constructor(
    image: Image,
    type: PresentationType = 'image',
    uuid?: string,
    comments?: RichText,
    imageData?: any,
    id?: string,
    title?: string,
    attachments?: File[]
  ) {
    super(uuid, title, type, comments, id, undefined, attachments)
    this.image = image
    this.imageData = imageData
  }

  setImageData(value: any): void {
    this.imageData = value
  }

  get asJson(): PresentationImageStepAsJson {
    return {
      ...super.asJson,
      imageData: this.imageData ? JSON.stringify(this.imageData) : undefined,
      imageId: this.image.id,
    }
  }

  clone(): PresentationImageStep {
    return new PresentationImageStep(
      this.image,
      this.type,
      undefined,
      this.comments,
      this.imageData,
      this.id,
      this.title,
      this.attachments
    )
  }

  static fromJson({
    title,
    type,
    comments,
    image,
    imageData,
    id,
    attachments,
  }: PresentationImageStepFromJson): PresentationImageStep {
    return new PresentationImageStep(
      image,
      type,
      undefined,
      comments || undefined,
      imageData ? JSON.parse(imageData) : undefined,
      id,
      title,
      attachments ? attachments.map((attachment) => fileFromApi(attachment)) : undefined
    )
  }
}

export default PresentationImageStep
