import { type FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import Gated from 'components/Gated'
import { CREATE_TEXT_BLOCKS } from 'permissions'
import useFilters from 'hooks/useFilters'
import useProject from 'Project/hooks/useProject'
import { type TextBlockFromApi } from 'Project/features/TextBlocks/types'
import useFetchTextBlocks from 'Project/features/TextBlocks/hooks/useFetchTextBlocks'
import TextBlocksFilters from 'Project/features/TextBlocks/components/TextBlocksFilters'
import NoResults from 'Project/features/TextBlocks/components/NoResults'
import PaginationTextBlock from 'Project/features/TextBlocks/components/PaginationTextBlock'
import CardTextBlock from 'Project/features/TextBlocks/components/CardTextBlock'
import { TEXT_BLOCKS_PATHS } from 'Project/features/TextBlocks/routes'
import styles from './textBlocksList.module.scss'

const TextBlocksList: FC = () => {
  const navigate = useNavigate()
  const { project } = useProject()
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { onApply, onCancel, filters } = useFilters()
  const { textBlocks, paginator } = useFetchTextBlocks({
    filters,
  })

  const { lastPage, page, setPage, setPerPage } = paginator

  useEffect(() => {
    setPerPage(4)
  }, [setPerPage])

  const handleClickAdd = useCallback(() => {
    navigate(TEXT_BLOCKS_PATHS.CREATE.replace(':projectId', project?.id ?? ''))
    return null
  }, [navigate])

  return (
    <div>
      <PrivateScreenTitle
        title={t('title')}
        rightContent={
          <Gated permissions={CREATE_TEXT_BLOCKS}>
            <Button onClick={handleClickAdd}>{t('create.title')}</Button>
          </Gated>
        }
      />
      <ContentBox>
        <TextBlocksFilters onCancel={onCancel} onApply={onApply} />
        {textBlocks?.length === 0 ? (
          <NoResults />
        ) : (
          <div className={styles.cardContent}>
            {textBlocks?.map((textBlock: TextBlockFromApi) => (
              <CardTextBlock key={textBlock.id} textBlock={textBlock} />
            ))}
          </div>
        )}
        <PaginationTextBlock lastPage={lastPage} page={page} setPage={setPage} />
      </ContentBox>
    </div>
  )
}

export default TextBlocksList
