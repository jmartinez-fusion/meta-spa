import { useCallback, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { useTranslation } from 'react-i18next'
import useProject from 'Project/hooks/useProject'
import TextBlockForm from 'Project/features/TextBlocks/components/TextBlockForm'
import { TEXT_BLOCKS_PATHS } from 'Project/features/TextBlocks/routes'
import useFetchTextBlockDetail from 'Project/features/TextBlocks/hooks/useFetchTextBlockDetail'
import { textBlockToFormValues } from 'Project/features/TextBlocks/transformers'

const TextBlocksDetails: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { textBlockId } = useParams()
  const { project } = useProject()
  const navigate = useNavigate()
  const { textBlock } = useFetchTextBlockDetail({ id: textBlockId })

  const textBlockFormValues = textBlock && textBlockToFormValues(textBlock)

  const onSubmit = useCallback(() => {
    navigate(TEXT_BLOCKS_PATHS.LIST.replace(':projectId', project?.id ?? ''))
  }, [navigate])

  return (
    <div>
      <PrivateScreenTitle title={t('title')} />
      <TextBlockForm mode="view" onSubmit={onSubmit} initialValues={textBlockFormValues} />
    </div>
  )
}

export default TextBlocksDetails
