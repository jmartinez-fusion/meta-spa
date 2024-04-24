import { type FC } from 'react'
import SurveyForm from 'Project/features/Surveys/components/SurveyForm/SurveyForm'
import useSaveSurvey from 'Project/features/Surveys/hooks/useSaveSurvey'
import styles from './surveyCreation.module.scss'

interface SurveyCreationProps {
  module: 'future_state_process' | 'current_state_process'
  goBackPath: string
}

const SurveyCreation: FC<SurveyCreationProps> = ({ module, goBackPath }) => {
  const { save, loading: loadingSave } = useSaveSurvey(goBackPath)

  return (
    <div className={styles.creationContainer}>
      <SurveyForm onSubmit={save} isSubmitting={loadingSave} module={module} />
    </div>
  )
}

export default SurveyCreation
