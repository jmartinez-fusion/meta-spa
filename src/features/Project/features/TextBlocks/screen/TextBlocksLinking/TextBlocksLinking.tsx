import { type FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import LinkingCardTextBlock from 'Project/features/TextBlocks/components/LinkingCardTextBlock'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import Gated from 'components/Gated'
import { CREATE_TEXT_BLOCKS } from 'permissions'
import useFilters from 'hooks/useFilters.ts'
import {
  type TextBlockFromApi,
  type TextBlocksLinkingProps,
  type TextBlockToApi,
} from 'Project/features/TextBlocks/types'
import useFetchTextBlocks from 'Project/features/TextBlocks/hooks/useFetchTextBlocks.tsx'
import TextBlocksFilters from 'Project/features/TextBlocks/components/TextBlocksFilters'
import NoResults from 'Project/features/TextBlocks/components/NoResults'
import PaginationTextBlock from 'Project/features/TextBlocks/components/PaginationTextBlock'
import TextBlockForm from 'Project/features/TextBlocks/components/TextBlockForm'
import {
  textBlockReferenceToApi,
  textBlockToFormValues,
} from 'Project/features/TextBlocks/transformers'
import LoadingRing from 'components/LoadingRing'
import useTextBlockEdit from 'Project/features/TextBlocks/hooks/useTextBlockEdit.tsx'
import LinkedCardTextBlock from 'Project/features/TextBlocks/components/LinkedCardTextBlock'
import useTextBlockCreate from 'Project/features/TextBlocks/hooks/useTextBlockCreate.tsx'
import styles from './textBlocksLinking.module.scss'

const EDIT_MODE = 'edit'
const CREATE_MODE = 'create'
const LIST_MODE = 'list'

const TextBlocksLinking: FC<TextBlocksLinkingProps> = ({ reference, onSuccess }) => {
  const [mode, setMode] = useState<'edit' | 'create' | 'list'>(LIST_MODE)
  const [editTextBlockId, setEditTextBlockId] = useState<string | undefined>(undefined)
  const {
    textBlock,
    onSubmit: onSubmitEdit,
    isSubmitting: isSubmittingEdit,
  } = useTextBlockEdit(editTextBlockId ?? '', onSuccess)
  const { onSubmit: onSubmitCreate, isSubmitting: isSubmittingCreate } =
    useTextBlockCreate(onSuccess)
  const textBlockFormValues = textBlock && textBlockToFormValues(textBlock)
  const isListMode = mode === LIST_MODE
  const isCreateMode = mode === CREATE_MODE
  const isEditMode = mode === EDIT_MODE
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { onApply, onCancel, filters } = useFilters()
  const { textBlocks, paginator } = useFetchTextBlocks({
    filters: { ...filters, excludeReferenceId: reference?.id },
  })
  const {
    textBlocks: linkedTextBlocks,
    loading: loadingLinkedTextBlocks,
    paginator: paginatorLinkedTextBlocks,
  } = useFetchTextBlocks({
    filters: { referenceId: reference?.id },
  })
  const { lastPage, page, setPage, setPerPage } = paginator
  const {
    lastPage: lastPageLinkedTextBlocks,
    page: pageLinkedTextBlocks,
    setPage: setPageLinkedTextBlocks,
    setPerPage: setPerPageLinkedTextBlocks,
  } = paginatorLinkedTextBlocks

  const handleSubmit = useCallback(
    (data: TextBlockToApi): void => {
      try {
        const dataWithNewReference = { ...data }
        let addedNewReference = false
        dataWithNewReference.references.forEach((addedReference) => {
          if (
            addedReference.referenceId === reference?.id &&
            addedReference.metadata?.elementId === reference?.metadata?.elementId
          ) {
            addedNewReference = true
          }
        })

        if (!addedNewReference) {
          dataWithNewReference.references.push(textBlockReferenceToApi(reference))
        }

        if (isEditMode) {
          onSubmitEdit(dataWithNewReference)
        } else {
          onSubmitCreate(dataWithNewReference)
        }
      } catch (e: any) {
        console.log(e)
      }
    },
    [reference, isCreateMode, isEditMode]
  )

  useEffect(() => {
    setPerPage(4)
  }, [setPerPage])

  useEffect(() => {
    setPerPageLinkedTextBlocks(50)
  }, [setPerPageLinkedTextBlocks])

  const handleClickSelectTextBlock = useCallback(
    (textBlockId: string) => {
      setEditTextBlockId(textBlockId)
      setMode(EDIT_MODE)
    },
    [setMode]
  )

  const handleClickAdd = useCallback(() => {
    setMode(CREATE_MODE)
  }, [setMode])

  const setListMode = useCallback(() => {
    setMode(LIST_MODE)
  }, [setMode])

  if ((!textBlock && isEditMode) || loadingLinkedTextBlocks) {
    return <LoadingRing center small />
  }

  return (
    <div>
      {isListMode && !(linkedTextBlocks?.length === 0) && (
        <div className={styles.linkedTextBlocks}>
          {linkedTextBlocks?.map((textBlock: TextBlockFromApi) => (
            <LinkedCardTextBlock
              key={textBlock.id}
              textBlock={textBlock}
              onSelect={() => {
                handleClickSelectTextBlock(textBlock.id)
              }}
            />
          ))}
          <PaginationTextBlock
            lastPage={lastPageLinkedTextBlocks}
            page={pageLinkedTextBlocks}
            setPage={setPageLinkedTextBlocks}
          />
        </div>
      )}
      <PrivateScreenTitle
        title={t('title')}
        onGoBack={!isListMode ? setListMode : undefined}
        rightContent={
          isListMode && (
            <Gated permissions={CREATE_TEXT_BLOCKS}>
              <Button onClick={handleClickAdd}>{t('create.title')}</Button>
            </Gated>
          )
        }
      />
      {isEditMode && (
        <TextBlockForm
          onSubmit={handleSubmit}
          initialValues={textBlockFormValues}
          isSubmitting={isSubmittingEdit}
          onCancel={setListMode}
        />
      )}
      {isCreateMode && (
        <TextBlockForm
          onSubmit={handleSubmit}
          onCancel={setListMode}
          isSubmitting={isSubmittingCreate}
        />
      )}
      {isListMode && (
        <ContentBox>
          <TextBlocksFilters onCancel={onCancel} onApply={onApply} showBottomFilters={false} />
          {textBlocks?.length === 0 ? (
            <NoResults />
          ) : (
            <div className={styles.cardContent}>
              {textBlocks?.map((textBlock: TextBlockFromApi) => (
                <LinkingCardTextBlock
                  key={textBlock.id}
                  textBlock={textBlock}
                  onSelect={() => {
                    handleClickSelectTextBlock(textBlock.id)
                  }}
                />
              ))}
            </div>
          )}
          <PaginationTextBlock lastPage={lastPage} page={page} setPage={setPage} />
        </ContentBox>
      )}
    </div>
  )
}

export default TextBlocksLinking
