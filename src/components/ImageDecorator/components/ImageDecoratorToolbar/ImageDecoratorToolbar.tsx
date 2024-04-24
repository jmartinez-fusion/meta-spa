import { type ImageDecoratorToolbarProps } from 'components/ImageDecorator/components/ImageDecoratorToolbar/types'
import { type FC } from 'react'
import styles from './imageDecoratorToolbar.module.scss'
import ImageDecoratorToolbarElement from 'components/ImageDecorator/components/ImageDecoratorToolbarElement'
import { AdsClickRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const ImageDecoratorToolbar: FC<ImageDecoratorToolbarProps> = ({
  readOnly = false,
  canLinkWithTextBlocks,
  handleSelectionClick = () => {},
  handleRectangleClick = () => {},
  handleHighlightClick = () => {},
  handleBlurClick = () => {},
  handleCommentClick = () => {},
  handleTextBlockSelectionClick = () => {},
  isSelectionToolActive = false,
  isRectangleToolActive = false,
  isHighlightToolActive = false,
  isBlurToolActive = false,
  isCommentToolActive = false,
  isTextBlockSelectionToolActive = false,
}) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.toolbar}>
      {!readOnly && (
        <>
          <ImageDecoratorToolbarElement
            onClick={handleSelectionClick}
            active={isSelectionToolActive}
            title={t('presentationTool.actions.selection')}
          >
            <AdsClickRounded />
          </ImageDecoratorToolbarElement>
          <ImageDecoratorToolbarElement
            onClick={handleRectangleClick}
            active={isRectangleToolActive}
            title={t('presentationTool.actions.rectangle')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16Z"
                className={styles.toolbarItemIcon}
              />
            </svg>
          </ImageDecoratorToolbarElement>
          <ImageDecoratorToolbarElement
            onClick={handleHighlightClick}
            active={isHighlightToolActive}
            title={t('presentationTool.actions.highlight')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M13.6003 14L11.0003 11.4L6.00026 16.4L8.60026 19L13.6003 14ZM12.4253 9.975L15.0253 12.575L20.0003 7.6L17.4003 5L12.4253 9.975ZM10.3253 9.275L15.7253 14.675L10.0003 20.4C9.60026 20.8 9.13359 21 8.60026 21C8.06693 21 7.60026 20.8 7.20026 20.4L7.15026 20.35L7.07526 20.425C6.89193 20.6083 6.67943 20.75 6.43776 20.85C6.19609 20.95 5.94193 21 5.67526 21H2.70026C2.46693 21 2.30859 20.9 2.22526 20.7C2.14193 20.5 2.18359 20.3167 2.35026 20.15L4.65026 17.85L4.60026 17.8C4.20026 17.4 4.00026 16.9333 4.00026 16.4C4.00026 15.8667 4.20026 15.4 4.60026 15L10.3253 9.275ZM10.3253 9.275L16.0003 3.6C16.4003 3.2 16.8669 3 17.4003 3C17.9336 3 18.4003 3.2 18.8003 3.6L21.4003 6.2C21.8003 6.6 22.0003 7.06667 22.0003 7.6C22.0003 8.13333 21.8003 8.6 21.4003 9L15.7253 14.675L10.3253 9.275Z" />
            </svg>
          </ImageDecoratorToolbarElement>
          <ImageDecoratorToolbarElement
            onClick={handleCommentClick}
            active={isCommentToolActive}
            title={t('presentationTool.actions.comment')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17C3 16.7167 3.09583 16.4792 3.2875 16.2875C3.47917 16.0958 3.71667 16 4 16H14C14.2833 16 14.5208 16.0958 14.7125 16.2875C14.9042 16.4792 15 16.7167 15 17C15 17.2833 14.9042 17.5208 14.7125 17.7125C14.5208 17.9042 14.2833 18 14 18H4ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47917 7.90417 3.2875 7.7125C3.09583 7.52083 3 7.28333 3 7C3 6.71667 3.09583 6.47917 3.2875 6.2875C3.47917 6.09583 3.71667 6 4 6H20C20.2833 6 20.5208 6.09583 20.7125 6.2875C20.9042 6.47917 21 6.71667 21 7C21 7.28333 20.9042 7.52083 20.7125 7.7125C20.5208 7.90417 20.2833 8 20 8H4Z" />
            </svg>
          </ImageDecoratorToolbarElement>
          <ImageDecoratorToolbarElement
            onClick={handleBlurClick}
            active={isBlurToolActive}
            title={t('presentationTool.actions.blur')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M5 14C4.71667 14 4.47917 13.9042 4.2875 13.7125C4.09583 13.5208 4 13.2833 4 13C4 12.7167 4.09583 12.4792 4.2875 12.2875C4.47917 12.0958 4.71667 12 5 12H10C10.2833 12 10.5208 12.0958 10.7125 12.2875C10.9042 12.4792 11 12.7167 11 13C11 13.2833 10.9042 13.5208 10.7125 13.7125C10.5208 13.9042 10.2833 14 10 14H5ZM5 10C4.71667 10 4.47917 9.90417 4.2875 9.7125C4.09583 9.52083 4 9.28333 4 9C4 8.71667 4.09583 8.47917 4.2875 8.2875C4.47917 8.09583 4.71667 8 5 8H14C14.2833 8 14.5208 8.09583 14.7125 8.2875C14.9042 8.47917 15 8.71667 15 9C15 9.28333 14.9042 9.52083 14.7125 9.7125C14.5208 9.90417 14.2833 10 14 10H5ZM5 6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H14C14.2833 4 14.5208 4.09583 14.7125 4.2875C14.9042 4.47917 15 4.71667 15 5C15 5.28333 14.9042 5.52083 14.7125 5.7125C14.5208 5.90417 14.2833 6 14 6H5ZM13 19V17.35C13 17.2167 13.025 17.0875 13.075 16.9625C13.125 16.8375 13.2 16.725 13.3 16.625L18.525 11.425C18.675 11.275 18.8417 11.1667 19.025 11.1C19.2083 11.0333 19.3917 11 19.575 11C19.775 11 19.9667 11.0375 20.15 11.1125C20.3333 11.1875 20.5 11.3 20.65 11.45L21.575 12.375C21.7083 12.525 21.8125 12.6917 21.8875 12.875C21.9625 13.0583 22 13.2417 22 13.425C22 13.6083 21.9667 13.7958 21.9 13.9875C21.8333 14.1792 21.725 14.35 21.575 14.5L16.375 19.7C16.275 19.8 16.1625 19.875 16.0375 19.925C15.9125 19.975 15.7833 20 15.65 20H14C13.7167 20 13.4792 19.9042 13.2875 19.7125C13.0958 19.5208 13 19.2833 13 19ZM14.5 18.5H15.45L18.475 15.45L18.025 14.975L17.55 14.525L14.5 17.55V18.5ZM18.025 14.975L17.55 14.525L18.475 15.45L18.025 14.975Z" />
            </svg>
          </ImageDecoratorToolbarElement>
        </>
      )}
      {canLinkWithTextBlocks && (
        <ImageDecoratorToolbarElement
          onClick={handleTextBlockSelectionClick}
          active={isTextBlockSelectionToolActive}
          title={t('presentationTool.actions.textBlockSelection')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17C3 16.7167 3.09583 16.4792 3.2875 16.2875C3.47917 16.0958 3.71667 16 4 16H14C14.2833 16 14.5208 16.0958 14.7125 16.2875C14.9042 16.4792 15 16.7167 15 17C15 17.2833 14.9042 17.5208 14.7125 17.7125C14.5208 17.9042 14.2833 18 14 18H4ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47917 7.90417 3.2875 7.7125C3.09583 7.52083 3 7.28333 3 7C3 6.71667 3.09583 6.47917 3.2875 6.2875C3.47917 6.09583 3.71667 6 4 6H20C20.2833 6 20.5208 6.09583 20.7125 6.2875C20.9042 6.47917 21 6.71667 21 7C21 7.28333 20.9042 7.52083 20.7125 7.7125C20.5208 7.90417 20.2833 8 20 8H4Z" />
          </svg>
        </ImageDecoratorToolbarElement>
      )}
    </div>
  )
}

export default ImageDecoratorToolbar
