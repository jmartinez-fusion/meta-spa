import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import TextBlockForm from 'Project/features/TextBlocks/components/TextBlockForm'
import useTextBlockCreate from 'Project/features/TextBlocks/hooks/useTextBlockCreate'
import useTextBlockEdit from 'Project/features/TextBlocks/hooks/useTextBlockEdit'
import { textBlockToFormValues } from 'Project/features/TextBlocks/transformers'

const TextBlocksClone: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { onSubmit, isSubmitting } = useTextBlockCreate()

  const { textBlockId } = useParams()

  const { textBlock } = useTextBlockEdit(textBlockId ?? '')

  const textBlockFormValues = textBlock && textBlockToFormValues(textBlock)

  return (
    <div>
      <PrivateScreenTitle title={t('title')} />
      <TextBlockForm
        mode="create"
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        initialValues={textBlockFormValues}
      />
    </div>
  )
}

export default TextBlocksClone
