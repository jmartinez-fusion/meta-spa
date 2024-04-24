import { type FC, useCallback, useEffect, useState } from 'react'
import { type TextBlocksFormProps } from './types'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { EditOutlined, West } from '@mui/icons-material'
import { useFormik } from 'formik'
import useGetOptions from 'hooks/useGetOptions'
import Select from 'components/Select'
import { textBlockToApi, transformArray } from 'Project/features/TextBlocks/transformers'
import ContentBox from 'components/ContentBox'
import useProject from 'Project/hooks/useProject'
import TextBlocksFormSchema from 'Project/features/TextBlocks/schema/TextBlocksFormSchema'
import UserInfo from 'Project/features/TextBlocks/components/UserInfo'
import { TEXT_BLOCKS_PATHS } from 'Project/features/TextBlocks/routes'
import RichTextEditor from 'components/RichTextEditor'
import MultiSelect, { type Option } from 'components/MultiSelect/MultiSelect'
import styles from './textBlockForm.module.scss'
import TextBlockReference from 'Project/features/TextBlocks/components/TextBlockReferences/TextBlockReferences.tsx'

const DEFAULT_INITIAL_VALUES = {
  title: '',
  description: '',
  category: '',
  tags: [],
  createdAt: '',
  createdBy: null,
  updatedAt: '',
  references: [],
  updatedBy: null,
}

const TextBlockForm: FC<TextBlocksFormProps> = ({
  onSubmit = () => null,
  mode = 'create',
  initialValues = DEFAULT_INITIAL_VALUES,
  isSubmitting = false,
  onCancel,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks.form' })

  const { project } = useProject()
  const navigate = useNavigate()
  const { categoriesOptions, tagsOptions } = useGetOptions(['categories', 'tags'])
  const [visibleEditor, setVisibleEditor] = useState(false)
  const [visibleInputTitle, setVisibleInputTitle] = useState(false)
  const [, setSelectedTags] = useState<Option[]>([])
  const isEdit = mode === 'edit'
  const isView = mode === 'view'
  const isCreate = mode === 'create'

  const { handleChange, values, handleSubmit, setFieldValue, setValues, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: TextBlocksFormSchema,
      validateOnChange: false,
      onSubmit: async (data, { setSubmitting }) => {
        try {
          onSubmit(textBlockToApi(data))
          setSubmitting(false)
        } catch (error) {
          console.error('Error', error)
        }
      },
    })

  const getFieldProps = useCallback(
    (name: 'title' | 'description' | 'tags' | 'category') => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        onChange: handleChange,
        onClear: async () => await setFieldValue(name, ''),
      }
    },
    [handleChange, values, setFieldValue, initialValues]
  )

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel()
    } else {
      navigate(TEXT_BLOCKS_PATHS.LIST.replace(':projectId', project?.id ?? ''))
    }
  }, [onCancel])

  const handleEdit = useCallback(() => {
    setVisibleInputTitle(true)
  }, [])

  const handleSubmitForm = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      handleSubmit()
    },
    [handleSubmit]
  )

  const handleMultiSelectChange = (newTags: Option[]): void => {
    setSelectedTags(newTags)
    void setFieldValue('tags', newTags)
  }

  useEffect(() => {
    if (initialValues !== DEFAULT_INITIAL_VALUES) {
      void setValues(initialValues)
    }
    setTimeout(() => {
      setVisibleEditor(true)
    }, 600)
  }, [initialValues])

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <div className={styles.titleEdit}>
          {(isEdit || isView) && !visibleInputTitle && (
            <div className={styles.inputEditTitle}>
              {isView && (
                <IconButton
                  onClick={handleCancel}
                  className={styles.backButton}
                  color="primary"
                  aria-label="back"
                >
                  <West />
                </IconButton>
              )}
              <Typography variant="h3">{initialValues.title}</Typography>
              {isEdit && (
                <IconButton
                  onClick={handleEdit}
                  className={styles.btnActionEdit}
                  color="primary"
                  aria-label="back"
                  size="small"
                >
                  <EditOutlined />
                </IconButton>
              )}
            </div>
          )}
          {(isCreate || visibleInputTitle) && (
            <TextField
              className={errors.title && touched.title ? styles.error : ''}
              label={t('titleLabel')}
              variant="filled"
              placeholder={t('title')}
              fullWidth
              {...getFieldProps('title')}
              autoFocus
            />
          )}
          {errors.title && touched.title && <div className={styles.error}>{t('errors.title')}</div>}
        </div>
        <UserInfo
          createdAt={initialValues.createdAt}
          createdBy={initialValues.createdBy}
          updatedAt={initialValues.updatedAt}
          updatedBy={initialValues.updatedBy}
        />
        <ContentBox>
          <div className={styles.richTextBox}>
            {isView ? (
              <p dangerouslySetInnerHTML={{ __html: initialValues.description }} />
            ) : (
              visibleEditor && (
                <RichTextEditor
                  {...getFieldProps('description')}
                  onChange={(value) => {
                    void setFieldValue('description', value)
                  }}
                  error={!!(errors?.description && touched?.description)}
                />
              )
            )}
            {errors.title && touched.title && (
              <div className={styles.error}>{t('errors.description')}</div>
            )}
          </div>
        </ContentBox>

        <Typography sx={{ margin: '20px 0' }} variant="h3">
          {t('properties')}
        </Typography>
        <div className={styles.middleBox}>
          <Select
            label={t('category')}
            options={categoriesOptions}
            fullWidth
            variant="filled"
            disabled={isView}
            sx={{ margin: '20px 0' }}
            {...getFieldProps('category')}
            onClear={
              mode === 'view'
                ? () => {
                    return null
                  }
                : undefined
            }
          />
          <MultiSelect
            options={transformArray(tagsOptions)}
            onChange={handleMultiSelectChange}
            label={t('tags')}
            initialSelectedOptions={initialValues?.tags ?? []}
          />
        </div>
        <TextBlockReference references={initialValues?.references} />
        <div className={styles.rowBtns}>
          <Button variant="outlined" onClick={handleCancel}>
            {!isView ? t('cancel') : t('back')}
          </Button>
          {!isView && (
            <LoadingButton
              size="large"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleSubmitForm}
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              {t('submit')}
            </LoadingButton>
          )}
        </div>
      </form>
    </div>
  )
}

export default TextBlockForm
