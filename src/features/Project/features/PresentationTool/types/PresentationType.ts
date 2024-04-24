import PresentationImageStep, {
  type PresentationImageStepFromJson,
} from 'Project/features/PresentationTool/types/PresentationImageStep.ts'
import PresentationTextStep, {
  type PresentationTextStepFromJson,
} from 'Project/features/PresentationTool/types/PresentationTextStep.ts'

export const PRESENTATION_IMAGE_TYPE = 'image'
export const PRESENTATION_TEXT_TYPE = 'text'

export default {
  [PRESENTATION_IMAGE_TYPE]: (props: PresentationImageStepFromJson) =>
    PresentationImageStep.fromJson(props),
  [PRESENTATION_TEXT_TYPE]: (props: PresentationTextStepFromJson) =>
    PresentationTextStep.fromJson(props),
}
