import { type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingRing from 'components/LoadingRing'
import SurveyForm from 'Project/features/Surveys/components/SurveyForm/SurveyForm'
import useFetchSurveyDetail from 'Project/features/Surveys/hooks/useFetchSurveyDetail'
import useEditSurvey from 'Project/features/Surveys/hooks/useEditSurvey'

interface SurveyEditionProps {
  module: 'future_state_process' | 'current_state_process'
  goBackPath: string
}

const SurveyEdition: FC<SurveyEditionProps> = ({ module, goBackPath }) => {
  const { surveyId } = useParams()
  const navigate = useNavigate()
  const { surveyDetail, loading } = useFetchSurveyDetail({
    id: surveyId,
  })
  const { save, loading: loadingSave } = useEditSurvey(surveyId ?? '', goBackPath)

  if (loading) {
    return <LoadingRing center small />
  }

  if (!surveyDetail?.status.isPending || surveyDetail?.type?.isCapture) {
    navigate('/404')
  }

  if (!surveyDetail) {
    return null
  }

  return (
    <div>
      <SurveyForm
        module={module}
        survey={surveyDetail}
        onSubmit={save}
        isSubmitting={loadingSave}
        initialValues={{
          name: surveyDetail?.title ?? '',
          description: surveyDetail?.description ?? '',
          questions: surveyDetail?.questions ?? [],
          sprintId: surveyDetail?.sprintId ?? '',
        }}
      />
    </div>
  )
}

export default SurveyEdition
