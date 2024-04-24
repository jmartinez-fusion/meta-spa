import React from 'react'
import { type ImageDecoratorToolbarElementProps } from 'components/ImageDecorator/components/ImageDecoratorToolbarElement/types'
import styles from './imageDecoratorToolbarElement.module.scss'
import { Tooltip } from '@mui/material'
import c from 'classnames'

const ImageDecoratorToolbarElement: React.FC<ImageDecoratorToolbarElementProps> = ({
  onClick,
  title,
  active = false,
  children,
}) => {
  return (
    <Tooltip title={title} placement="right">
      <div className={styles.container}>
        <div onClick={onClick} className={c(styles.toolbarItem, active && styles.active)}>
          <div className={styles.toolbarItem}>{children}</div>
        </div>
      </div>
    </Tooltip>
  )
}

export default ImageDecoratorToolbarElement
