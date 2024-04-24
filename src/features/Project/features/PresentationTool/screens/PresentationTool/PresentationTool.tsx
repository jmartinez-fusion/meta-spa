import { type FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import {
  type AllowedPresentationStep,
  type PresentationToolProps,
} from 'Project/features/PresentationTool/types'
import PresentationStep from 'components/PresentationStep'
import DropZoneWrapper from 'components/DropZoneWrapper'
import PresentationToolbar from 'components/PresentationToolbar'
import StartDroppingOrAddingSteps from 'components/StartDroppingOrAddingSteps/StartDroppingOrAddingSteps'
import usePresentationToolSteps from 'Project/features/PresentationTool/hooks/usePresentationToolSteps'
import { type TextBlockReference } from 'Project/features/TextBlocks/types'
import TextBlockLinkerModal from 'Project/features/TextBlocks/components/TextBlockLinkerModal'
import SelectTypeCapturing from 'Project/features/PresentationTool/components/SelectTypeCapturing'
import styles from './presentationTool.module.scss'
import { Button } from '@mui/material'
import CaptureExtension from 'components/CaptureExtension'
import { useSearchParams } from 'react-router-dom'

const PresentationTool: FC<PresentationToolProps> = ({
  initialData = undefined,
  processId,
  mode = 'edit',
  isSaving = false,
  effectiveProcessId,
  onSave,
  module,
}) => {
  const [textBlockReference, setTextBlockReference] = useState<TextBlockReference | undefined>(
    undefined
  )
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })
  const [typeCapturingSelected, setTypeCapturingSelected] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const params = {
    typeCapturingSelected: searchParams.get('typeCapturingSelected'),
  }
  const isView = mode === 'view'
  const {
    steps,
    upStep,
    downStep,
    deleteStep,
    addImageSteps,
    addTextStep,
    setSteps,
    allSteps,
    reorder,
  } = usePresentationToolSteps(initialData?.map((step) => step.clone()))

  const handleDiscardChanges = useCallback(() => {
    setSteps(initialData?.map((step) => step.clone()) ?? [])
  }, [initialData, setSteps])

  const handleSave = useCallback(() => {
    onSave(allSteps)
  }, [allSteps])

  const clearTextBlockReference = useCallback(() => {
    setTextBlockReference(undefined)
  }, [textBlockReference])

  const handleLinkWithTextBlock = useCallback(
    (step: AllowedPresentationStep, metadata?: any) => {
      setTextBlockReference({
        id: step.id ?? '',
        type: 'presentation_step',
        metadata: metadata || {},
      })
    },
    [textBlockReference]
  )

  const addImages = (files: File[] = []): void => {
    void addImageSteps(files)
  }

  const onDropAnimation = (style: any, snapshot: any): any => {
    if (!snapshot.isDropAnimating) {
      return style
    }

    const { moveTo, curve } = snapshot.dropAnimation
    // move to the right spot
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`
    // add a bit of turn for fun
    const rotate = 'rotate(0)'

    // patching the existing style
    return {
      ...style,
      transform: `${translate} ${rotate}`,
      // slowing down the drop because we can
      transition: `transform ${curve} ${500}ms`,
    }
  }

  const onDragEnd = useCallback(
    (result: any): void => {
      if (!result.destination) {
        return
      }

      reorder(result.source.index, result.destination.index)
    },
    [reorder]
  )

  const onSelectTypeCapturing = (typeCapturingSelected: string): void => {
    setSearchParams({ typeCapturingSelected })
  }

  useEffect(() => {
    setSteps(initialData?.map((step) => step.clone()) ?? [])
  }, [initialData])

  useEffect(() => {
    setTypeCapturingSelected(params?.typeCapturingSelected ?? '')
  }, [params])

  if (!isView && typeCapturingSelected === '') {
    return (
      <div className={styles.mainContainer}>
        <SelectTypeCapturing
          onSelectTypeCapturing={onSelectTypeCapturing}
          module={module}
          processId={processId}
        />
      </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      {initialData?.length === 0 && steps?.length === 0 ? (
        isView ? (
          <div className={styles.emptyPresentation}>{t('emptyPresentation')}</div>
        ) : (
          <>
            {typeCapturingSelected === 'manual' ? (
              <DropZoneWrapper
                Component={StartDroppingOrAddingSteps}
                acceptedFiles={['image/*']}
                onChange={addImages}
                text={t('startDroppingCaptures')}
                onAddCaptures={addImages}
                onAddDescription={addTextStep}
              />
            ) : (
              <CaptureExtension processId={processId} module={module}>
                <Button>{t('captureBtn')}</Button>
              </CaptureExtension>
            )}
          </>
        )
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided: any) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.presentationContainer}
                >
                  {steps.map((presentationStep, i) => (
                    <Draggable
                      key={presentationStep.uuid}
                      draggableId={presentationStep.uuid}
                      index={i}
                      isDragDisabled={isView}
                    >
                      {(draggableProvided: any, snapshot: any) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          style={onDropAnimation(draggableProvided.draggableProps.style, snapshot)}
                        >
                          <PresentationStep
                            upStep={
                              steps.length - 1 > i
                                ? () => {
                                    upStep(i)
                                  }
                                : undefined
                            }
                            canLinkWithTextBlocks={isView}
                            onLinkWithTextBlock={(metadata) => {
                              handleLinkWithTextBlock(presentationStep, metadata)
                            }}
                            effectiveProcessId={effectiveProcessId}
                            canAddStepsToSurveys={isView}
                            selected={
                              !!textBlockReference?.id &&
                              textBlockReference?.id === presentationStep.id
                            }
                            downStep={
                              i > 0
                                ? () => {
                                    downStep(i)
                                  }
                                : undefined
                            }
                            step={presentationStep}
                            number={i + 1}
                            readOnly={isView}
                            module={module}
                            onDeleteStep={() => {
                              deleteStep(i)
                            }}
                            dragProps={draggableProvided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <TextBlockLinkerModal
            handleClose={clearTextBlockReference}
            reference={textBlockReference}
          />
          {!isView && (
            <DropZoneWrapper
              acceptedFiles={['image/*']}
              onChange={addImages}
              Component={PresentationToolbar}
              onDiscardChanges={handleDiscardChanges}
              onSave={handleSave}
              onAddCaptures={addImages}
              onAddDescription={addTextStep}
              isSaving={isSaving}
            />
          )}
        </>
      )}
    </div>
  )
}

export default PresentationTool
