import { type AllowedPresentationStep } from 'src/features/Project/features/PresentationTool/types'
import { type Dispatch, type SetStateAction, useState } from 'react'
import PresentationTextStep from 'Project/features/PresentationTool/types/PresentationTextStep.ts'
import PresentationImageStep from 'Project/features/PresentationTool/types/PresentationImageStep.ts'
import useLoadImage from 'hooks/useLoadImage.tsx'

export interface UsePresentationToolResult {
  steps: AllowedPresentationStep[]
  setSteps: Dispatch<SetStateAction<AllowedPresentationStep[]>>
  upStep: (stepIndex: number) => void
  downStep: (stepIndex: number) => void
  loading: boolean
  deleteStep: (stepIndex: number) => void
  addTextStep: () => void
  reorder: (source: number, destination: number) => void
  addImageSteps: (file: File[]) => Promise<any>
  allSteps: AllowedPresentationStep[]
}

export default function usePresentationToolSteps(
  initialSteps: AllowedPresentationStep[] = []
): UsePresentationToolResult {
  const [steps, setSteps] = useState<AllowedPresentationStep[]>(initialSteps)
  const { doFetch: loadImage, loading: loadingImage } = useLoadImage()
  const [deletedSteps, setDeletedSteps] = useState<AllowedPresentationStep[]>([])

  const scrollToBottom = (): void => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 200)
  }

  const swapOrder = (source: number, destination: number): void => {
    const newSteps = steps.map((step) => step.clone())
    const sourceStep = steps[source]
    newSteps[source] = steps[destination]
    newSteps[destination] = sourceStep
    setSteps(newSteps)
  }
  const reorder = (source: number, destination: number): void => {
    const newSteps = steps.map((step) => step.clone())

    const element = newSteps.splice(source, 1)[0]

    newSteps.splice(destination, 0, element)
    setSteps(newSteps)
  }

  const deleteStep = (stepIndex: number): void => {
    const newSteps = steps.map((step) => step.clone())
    const deletedStep = newSteps.splice(stepIndex, 1)[0]
    deletedStep.delete()
    if (deletedStep.id) {
      setDeletedSteps(deletedSteps.concat([deletedStep]))
    }
    setSteps(newSteps)
  }

  const addImage = async (file: File): Promise<any> => {
    return await loadImage({
      data: { file_image: file },
    })
      .then(async (image) => {
        return await Promise.resolve(image)
      })
      .catch(async (e: any) => {
        return await Promise.reject(e)
      })
  }

  const addImageSteps = async (files: File[]): Promise<any> => {
    const presentationImageSteps = []

    for (const file of files) {
      const image = await addImage(file)
      presentationImageSteps.push(new PresentationImageStep(image))
    }

    setSteps(steps.concat(presentationImageSteps))
    scrollToBottom()
  }

  const addTextStep = (): void => {
    setSteps(steps.concat([new PresentationTextStep()]))
    scrollToBottom()
  }

  const upStep = (stepIndex: number): void => {
    swapOrder(stepIndex, stepIndex + 1)
  }

  const downStep = (stepIndex: number): void => {
    swapOrder(stepIndex - 1, stepIndex)
  }

  return {
    steps: steps.filter((step) => !step.deleted),
    setSteps,
    addImageSteps,
    addTextStep,
    loading: loadingImage,
    reorder,
    allSteps: steps.concat(deletedSteps),
    upStep,
    downStep,
    deleteStep,
  }
}
