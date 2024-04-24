import { type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchSurveyDetail from 'Project/features/Surveys/hooks/useFetchSurveyDetail.tsx'
import LoadingRing from 'components/LoadingRing'
import SurveyInfo from 'Project/features/Surveys/components/SurveyInfo'
import SurveyConfigurationsForm from 'Project/features/Surveys/components/SurveyConfigurationsForm'
import ContentBox from 'components/ContentBox'
import useSaveConfigurations from 'Project/features/Surveys/hooks/useSaveSurveyConfigurations.tsx'
import { surveyDetailToFormValues } from 'Project/features/Surveys/transformers'

interface SurveyConfigurationsProps {
  module: 'future_state_process' | 'current_state_process'
  goBackPath: string
}

const SurveyConfigurations: FC<SurveyConfigurationsProps> = ({ module, goBackPath }) => {
  const { surveyId } = useParams()
  const navigate = useNavigate()
  const { surveyDetail, loading } = useFetchSurveyDetail({
    id: surveyId,
  })
  const { save, loading: loadingSave } = useSaveConfigurations(surveyId ?? '', goBackPath)

  if (loading) {
    return <LoadingRing center small />
  }

  if (!surveyDetail?.status.isPending || surveyDetail?.type?.isCapture) {
    navigate('/404')
  }

  return (
    <div>
      <SurveyInfo module={module} survey={surveyDetail} showTitle />
      <ContentBox>
        <SurveyConfigurationsForm
          module={module}
          initialValues={surveyDetailToFormValues(surveyDetail)}
          onSubmit={save}
          mode="edition"
          isSubmitting={loadingSave}
          goBackPath={goBackPath}
        />
      </ContentBox>
    </div>
  )
}

export default SurveyConfigurations
