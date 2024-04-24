import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useProject from 'Project/hooks/useProject'
import { PROCESS_MAPPING_PATHS } from 'Project/features/ProcessMapping/routes'
import ProcessMappingInfo from 'Project/features/ProcessMapping/components/ProcessMappingInfo'
import ProcessMappingDepartmentInfo from 'Project/features/ProcessMapping/components/ProcessMappingDepartmentInfo'
import { processMappingDetailFromApi } from 'Project/features/ProcessMapping/transformers'
import useFetchProcessMappingDetail from 'Project/features/ProcessMapping/hooks/useFetchProcessMappingDetail'
import InfluencersContent from 'Project/features/ProcessMapping/components/InfluencersContent'

const ProcessMappingDetails: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const { project } = useProject()
  const { processMappingId } = useParams()
  const { processMapping } = useFetchProcessMappingDetail({
    id: processMappingId,
    transformer: processMappingDetailFromApi,
  })

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        goBackPath={PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? '')}
      />
      <div>
        <ProcessMappingInfo processMapping={processMapping ?? undefined} />
        {processMapping?.department && (
          <>
            <ProcessMappingDepartmentInfo department={processMapping?.department} />
            <InfluencersContent processMapping={processMapping} />
          </>
        )}
      </div>
    </div>
  )
}

export default ProcessMappingDetails
