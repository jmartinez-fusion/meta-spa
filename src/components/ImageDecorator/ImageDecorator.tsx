import { type FC, useEffect, useRef, useState /*, useEffect */ } from 'react'
import { convertToExcalidrawElements, Excalidraw } from '@excalidraw/excalidraw'
import CommentModal from 'src/components/ImageDecorator/components/CommentModal'
import { type ImageDecoratorProps } from './types'
import { ChatBubbleRounded } from '@mui/icons-material'
import styles from './imageDecorator.module.scss'
import ImageDecoratorToolbar from 'components/ImageDecorator/components/ImageDecoratorToolbar'
import useModal from 'hooks/useModal.tsx'
import ModalHeader from 'components/ModalHeader/ModalHeader.tsx'
import { useTranslation } from 'react-i18next'
import ContentBox from 'components/ContentBox'

type TOOL_TYPE = 'selection' | 'rectangle' | 'highlight' | 'blur' | 'comment' | 'textBlockSelection'

const ImageDecorator: FC<ImageDecoratorProps> = ({
  image,
  readOnly = false,
  initialData,
  onElementsChange,
  onTextBlockElementSelection,
  canLinkWithTextBlocks = false,
}) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null)
  const ref = useRef<HTMLInputElement>()
  const [selectedTool, setSelectedTool] = useState<TOOL_TYPE | null>('selection')
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })
  const [savedComments, setSavedComments] = useState<any>({})
  const [elementComment, setElementComment] = useState<any>(null)
  const {
    Modal: ModalComment,
    close: onCloseModalComment,
    open,
    handleOpen: handleOpenCommentModal,
  } = useModal()
  const isTextBlockSelectionToolActive =
    selectedTool === 'textBlockSelection' && canLinkWithTextBlocks
  const isCommentToolActive = selectedTool === 'comment'
  const isSelectionToolActive = selectedTool === 'selection'
  const isRectangleToolActive = selectedTool === 'rectangle'
  const isHighlightToolActive = selectedTool === 'highlight'
  const isBlurToolActive = selectedTool === 'blur'

  const selectTextBlockSelection = (): void => {
    const tool = 'selection'
    const appState = excalidrawAPI.getAppState()

    appState.activeTool.type = tool
    appState.activeTool.locked = true
    excalidrawAPI.updateScene(appState)
    setSelectedTool('textBlockSelection')
  }

  const selectSelection = (): void => {
    const tool = 'selection'
    const appState = excalidrawAPI.getAppState()

    setSelectedTool(tool)
    appState.activeTool.type = tool
    excalidrawAPI.updateScene(appState)
  }

  // rectangle tool selection
  const selectRectangle = (): void => {
    const tool = 'rectangle'
    const appState = excalidrawAPI.getAppState()

    setSelectedTool(tool)

    // sets default attributes for the tool
    appState.activeTool.type = tool
    appState.activeTool.locked = true
    appState.currentItemStrokeWidth = 2
    appState.currentItemStrokeColor = 'black'
    appState.currentItemRoundness = 'sharp'
    appState.currentItemBackgroundColor = 'transparent'
    appState.currentItemOpacity = 100

    excalidrawAPI.updateScene(appState)
  }

  // highlight tool selection
  const selectHighlight = (): void => {
    const tool = 'highlight'
    const appState = excalidrawAPI.getAppState()

    setSelectedTool(tool)

    // sets default attributes for the tool
    appState.activeTool.type = 'freedraw'
    appState.activeTool.locked = true
    appState.currentItemStrokeWidth = 3
    appState.currentItemStrokeColor = 'yellow'
    appState.currentItemOpacity = 50
    appState.currentItemRoundness = 'round'

    excalidrawAPI.updateScene(appState)
  }

  // blur tool selection
  const selectBlur = (): void => {
    const tool = 'blur'
    const appState = excalidrawAPI.getAppState()

    setSelectedTool(tool)

    // sets default attributes for the tool
    appState.activeTool.type = 'freedraw'
    appState.activeTool.locked = true
    appState.currentItemStrokeWidth = 3
    appState.currentItemStrokeColor = '#313131'
    appState.currentItemOpacity = 100
    appState.currentItemRoundness = 'round'

    excalidrawAPI.updateScene(appState)
  }

  // comment tool selection
  const selectComment = (): void => {
    const appState = excalidrawAPI.getAppState()

    setSelectedTool('comment')

    appState.activeTool.type = 'selection'
    appState.activeTool.locked = true

    excalidrawAPI.updateScene(appState)
  }

  const handleDeleteSelectedComment = (): void => {
    const newComments = { ...savedComments }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newComments[elementComment?.element?.id]
    onCloseModalComment()
    setSavedComments(newComments)
  }

  const saveComment = (comment: string): void => {
    const allElements = excalidrawAPI.getSceneElements()
    const appState = excalidrawAPI.getAppState()
    appState.selectedElementIds = {}

    if (
      allElements.filter((savedElement: any) => savedElement === elementComment?.element).length ===
      0
    ) {
      excalidrawAPI.updateScene({
        elements: [elementComment?.element, ...allElements],
      })
    }

    const allComments = savedComments
    allComments[elementComment.element.id] = { comment, element: elementComment.element }

    excalidrawAPI.updateScene(appState)
    setSavedComments(allComments)
    onCloseModalComment()
    handleExcalidrawChange()
  }

  const textBlockAction = (pointerDownState: any): void => {
    const element = pointerDownState.hit.element
    console.log()

    if (element && onTextBlockElementSelection) {
      onTextBlockElementSelection({ elementId: element.id })
      selectSelection()
    }
  }

  const commentAction = (pointerDownState: any) => {
    let elementComment = pointerDownState.hit.element

    if (!elementComment) {
      elementComment = convertToExcalidrawElements([
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        {
          angle: 0,
          backgroundColor: 'rgba(0,0,0,0)',
          boundElements: null,
          fillStyle: 'cross-hatch',
          frameId: null,
          groupIds: [],
          isDeleted: false,
          link: null,
          locked: true,
          opacity: 100,
          roughness: 0,
          roundness: { type: 2 },
          seed: 1106441000,
          strokeColor: 'rgba(0,0,0,0)',
          strokeStyle: 'solid',
          strokeWidth: 4,
          type: 'ellipse',
          updated: 1698249705209,
          version: 70,
          versionNonce: 1740872744,
          height: 20,
          width: 20,
          x: pointerDownState.origin.x,
          y: pointerDownState.origin.y,
        },
      ])[0]
    }
    setElementComment({
      savedComment: savedComments[elementComment.id]?.comment,
      element: elementComment,
    })
    handleOpenCommentModal()
  }

  // attempts to create or show a comment (if it already exists) on pointer down when selected tool is comment
  const onPointerDown = (_activeTool: any, pointerDownState: any): void => {
    if (isCommentToolActive) {
      commentAction(pointerDownState)
    }

    if (isTextBlockSelectionToolActive) {
      textBlockAction(pointerDownState)
    }
  }

  const handleExcalidrawChange = (elements?: any): void => {
    if (excalidrawAPI) {
      let allElements = elements

      if (!elements) {
        allElements = excalidrawAPI.getSceneElements()
      }

      const data = { elements: allElements, comments: savedComments }

      if (JSON.stringify(data) !== JSON.stringify(initialData)) {
        onElementsChange(data)
      }
    }
  }

  useEffect(() => {
    if (initialData?.comments) {
      setSavedComments(initialData.comments)
    }
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <div className={styles.container} style={{ backgroundImage: `url(${image?.url})` }} ref={ref}>
      {Object.keys(savedComments).map((elementId: any) => {
        const { element, comment } = savedComments[elementId] || {}

        return (
          <div
            key={elementId + '_savedComment'}
            className={styles.commentBubble}
            style={{ top: element.y, left: element.x }}
            onClick={() => {
              setElementComment({
                element,
                savedComment: comment,
              })
              handleOpenCommentModal()
            }}
          >
            <ChatBubbleRounded />
          </div>
        )
      })}
      <ImageDecoratorToolbar
        readOnly={readOnly}
        canLinkWithTextBlocks={canLinkWithTextBlocks}
        handleSelectionClick={selectSelection}
        handleRectangleClick={selectRectangle}
        handleHighlightClick={selectHighlight}
        handleBlurClick={selectBlur}
        handleCommentClick={selectComment}
        handleTextBlockSelectionClick={selectTextBlockSelection}
        isSelectionToolActive={isSelectionToolActive}
        isRectangleToolActive={isRectangleToolActive}
        isHighlightToolActive={isHighlightToolActive}
        isBlurToolActive={isBlurToolActive}
        isCommentToolActive={isCommentToolActive}
        isTextBlockSelectionToolActive={isTextBlockSelectionToolActive}
      />
      <Excalidraw
        excalidrawAPI={(api) => {
          setExcalidrawAPI(api)
        }}
        onScrollChange={() => {
          const state = excalidrawAPI.getAppState()
          state.scrollY = 0
          state.scrollX = 0
          state.zoom.value = 1
          excalidrawAPI.updateScene(state)
        }}
        handleKeyboardGlobally={false}
        onChange={handleExcalidrawChange}
        viewModeEnabled={readOnly && !isTextBlockSelectionToolActive}
        onPointerDown={onPointerDown}
        initialData={{
          elements: initialData?.elements || undefined,
          appState: {
            scrollY: 0,
            scrollX: 0,
            viewBackgroundColor: 'transparent',
            defaultSidebarDockedPreference: false,
          },
        }}
        UIOptions={{
          canvasActions: {
            clearCanvas: false,
            export: false,
            changeViewBackgroundColor: false,
            saveToActiveFile: false,
            saveAsImage: false,
            toggleTheme: false,
            loadScene: false,
          },
          tools: {
            image: false,
          },
        }}
      />
      <ModalComment open={open} onClose={onCloseModalComment}>
        <ContentBox isModal>
          <ModalHeader onClose={onCloseModalComment} title={t('presentationComments')} />
          <CommentModal
            onConfirm={(comment: string) => {
              saveComment(comment)
            }}
            onDelete={() => {
              handleDeleteSelectedComment()
            }}
            readOnly={readOnly}
            onClose={onCloseModalComment}
            element={elementComment}
          />
        </ContentBox>
      </ModalComment>
    </div>
  )
}

export default ImageDecorator
