import { type FC } from 'react'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { useTranslation } from 'react-i18next'
import TextBlockForm from 'Project/features/TextBlocks/components/TextBlockForm'
import useTextBlockCreate from 'Project/features/TextBlocks/hooks/useTextBlockCreate'

const TextBlocksCreate: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { onSubmit, isSubmitting } = useTextBlockCreate()
  return (
    <div>
      <PrivateScreenTitle title={t('title')} />
      <TextBlockForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

export default TextBlocksCreate
