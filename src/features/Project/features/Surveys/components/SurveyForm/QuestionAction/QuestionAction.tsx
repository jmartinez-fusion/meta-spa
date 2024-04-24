import React from 'react'
import { type QuestionActionProps } from 'Project/features/Surveys/components/SurveyForm/QuestionAction/types'
import { Tooltip } from '@mui/material'
import styles from './questionAction.module.scss'

const QuestionAction: React.FC<QuestionActionProps> = ({
  onClick = () => null,
  title,
  children,
  ...restProps
}) => {
  return (
    <Tooltip title={title} placement="left">
      <div className={styles.container}>
        <div onClick={onClick} className={styles.toolbarItem} {...restProps}>
          <div className={styles.toolbarItem}>{children}</div>
        </div>
      </div>
    </Tooltip>
  )
}

export default QuestionAction
