import { type FC } from 'react'
import { type StartDroppingOrAddingStepsProps } from 'components/StartDroppingOrAddingSteps/types'
import styles from './startDroppingOrAddingSteps.module.scss'
import { SvgIcon } from '@mui/material'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import c from 'classnames'
import AddStepsActions from 'components/AddStepsActions'

const StartDroppingOrAddingSteps: FC<StartDroppingOrAddingStepsProps> = ({
  isDragActive,
  text,
  handleClick,
  children,
  onAddDescription,
  onAddCaptures,
  ...props
}) => {
  return (
    <div className={c(styles.mainContainer, isDragActive && styles.dragging)} {...props}>
      <div className={styles.icon}>
        <SvgIcon fontSize="inherit">
          <AddCircleOutlineRounded fontSize="inherit" />
        </SvgIcon>
      </div>
      <span>{text}</span>
      <div className={styles.buttons}>
        <AddStepsActions onAddCaptures={onAddCaptures} onAddDescription={onAddDescription} />
      </div>
      {children}
    </div>
  )
}

export default StartDroppingOrAddingSteps
