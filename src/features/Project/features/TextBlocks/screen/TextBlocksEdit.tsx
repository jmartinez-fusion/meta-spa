import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { useTranslation } from 'react-i18next'
import TextBlockForm from 'Project/features/TextBlocks/components/TextBlockForm'
import useTextBlockEdit from 'Project/features/TextBlocks/hooks/useTextBlockEdit'
import { textBlockToFormValues } from 'Project/features/TextBlocks/transformers'

const TextBlocksEdit: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { textBlockId } = useParams()

  const { textBlock, onSubmit, isSubmitting } = useTextBlockEdit(textBlockId ?? '')

  const textBlockFormValues = textBlock && textBlockToFormValues(textBlock)

  return (
    <div>
      <PrivateScreenTitle title={t('title')} />
      <TextBlockForm
        mode="edit"
        onSubmit={onSubmit}
        initialValues={textBlockFormValues}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default TextBlocksEdit
