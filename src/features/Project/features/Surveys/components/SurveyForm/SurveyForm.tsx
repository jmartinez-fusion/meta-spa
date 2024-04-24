import { type FC, useCallback, useEffect, useMemo } from 'react'
import { FormHelperText, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { LoadingButton } from '@mui/lab'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { ContentCopyOutlined, DeleteForeverOutlined, OpenWithOutlined } from '@mui/icons-material'
import useModal from 'hooks/useModal'
import entitiesToOptions from 'utils/entityToOptions'
import { generateUniqueId } from 'utils/utils'
import Select from 'components/Select'
import RichTextEditor from 'components/RichTextEditor/RichTextEditor'
import SurveysFormSchema from 'Project/features/Surveys/schema/SurveysFormSchema'
import QuestionAction from 'Project/features/Surveys/components/SurveyForm/QuestionAction'
import QuestionForm from 'Project/features/Surveys/components/SurveyForm/QuestionForm'
import ProcessForm from 'Project/features/Surveys/components/SurveyForm/ProcessForm'
import QuestionsBankList from 'Project/features/Surveys/components/QuestionsBank/screen/QuestionsBankList'
import { type SurveyDetail } from 'Project/features/Surveys/types'
import { type BankQuestion } from 'Project/features/Surveys/components/QuestionsBank/types'
import AddQuestionButton from 'Project/features/Surveys/components/AddQuestionButton'
import { surveyToApi } from 'Project/features/Surveys/transformers'
import SurveyInfo from 'Project/features/Surveys/components/SurveyInfo'
import useFetchSurveyProcesses from 'Project/features/Surveys/hooks/useFetchSurveyProcesses'
import styles from './surveyForm.module.scss'
import useProject from 'Project/hooks/useProject.ts'

interface SurveyFormProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
  module: 'future_state_process' | 'current_state_process'
  survey?: SurveyDetail | undefined
  initialValues?: {
    name: string
    description: string
    questions: any[]
    sprintId?: string
  }
}

const SurveyForm: FC<SurveyFormProps> = ({
  onSubmit,
  module,
  survey,
  initialValues = {
    name: '',
    description: '',
    questions: [],
    type: '',
    sprintId: '',
  },
  // isLoading = false,
  isSubmitting = false,
}) => {
  const {
    Modal: ModalQuestionsBank,
    close: closeQuestionsBank,
    open: openQuestionsBank,
    handleOpen: handleOpenQuestionsBank,
  } = useModal()
  const { presentationStepForSurvey } = useProject()
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Surveys' })
  const { surveyProcesses } = useFetchSurveyProcesses({ module })
  const questionTypesOptions = useMemo(
    () => [
      { id: 'dropdown', name: t('questionTypes:dropdown') },
      { id: 'paragraph', name: t('questionTypes:paragraph') },
    ],
    []
  )

  const { handleChange, values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: SurveysFormSchema,
    onSubmit: async (values) => {
      onSubmit(surveyToApi({ ...values, module }))
    },
  })

  const getFieldProps = useCallback(
    (name: 'name' | 'description' | 'questions' | 'sprintId') => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        helperText: hasTouched && error ? i18n.t(error, { field: t(name) }) : '',
        onBlur: () => {},
        onChange: handleChange,
      }
    },
    [handleChange, touched, values, errors]
  )

  const getQuestionFieldProps = useCallback(
    (name: 'type' | 'title' | 'description', index: number) => ({
      name: `questions[${index}].${name}`,
      value: values?.questions[index][name],
      onChange: handleChange,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      error: !!errors.questions?.[index]?.[name],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      helperText: errors.questions?.[index]?.[name]
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          i18n.t(errors.questions?.[index]?.[name], { field: t(name) })
        : '',
    }),
    [handleChange, values.questions, errors, values, errors.questions, i18n]
  )

  const addQuestion = (): void => {
    void setFieldValue('questions', [
      ...values.questions,
      { uuid: generateUniqueId(), type: null, title: '' },
    ])
  }

  const onAddQuestionFromBank = (bankQuestion: BankQuestion): void => {
    void setFieldValue('questions', [
      ...values.questions,
      {
        uuid: generateUniqueId(),
        type: bankQuestion.type,
        title: bankQuestion.title,
        description: bankQuestion.description,
        options:
          bankQuestion.dropdownOptions && Array.isArray(bankQuestion.dropdownOptions)
            ? bankQuestion.dropdownOptions.map((dropdownOption: any) => dropdownOption.value)
            : undefined,
      },
    ])
    closeQuestionsBank()
  }

  const cloneQuestion = (index: number): void => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const newQuestions = [...values?.questions]
    newQuestions.push({ ...values?.questions[index], uuid: generateUniqueId() })
    void setFieldValue('questions', newQuestions)
  }

  const reorder = (source: number, destination: number): void => {
    const newQuestions = [...values.questions]

    const element = newQuestions.splice(source, 1)[0]
    newQuestions.splice(destination, 0, element)
    void setFieldValue('questions', newQuestions)
  }

  const onDropAnimation = (style: any, snapshot: any): any => {
    if (!snapshot.isDropAnimating) {
      return style
    }

    const { moveTo, curve } = snapshot.dropAnimation
    // move to the right spot
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`
    // add a bit of turn for fun
    const rotate = 'rotate(0)'

    // patching the existing style
    return {
      ...style,
      transform: `${translate} ${rotate}`,
      // slowing down the drop because we can
      transition: `transform ${curve} ${500}ms`,
    }
  }

  const onDragEnd = useCallback(
    (result: any): void => {
      if (!result.destination) {
        return
      }

      reorder(result.source.index, result.destination.index)
    },
    [reorder]
  )

  const handleChangeSprint = useCallback(
    (e: { preventDefault: () => void }, sprintId: string): void => {
      e?.preventDefault()
      void setFieldValue('sprintId', sprintId)
    },
    []
  )

  const deleteQuestion = (index: number): void => {
    const newQuestions = [...values.questions]
    newQuestions.splice(index, 1)
    void setFieldValue('questions', newQuestions)
  }

  useEffect(() => {
    if (presentationStepForSurvey) {
      void setFieldValue('questions', [
        ...values.questions,
        {
          uuid: generateUniqueId(),
          type: null,
          title: '',
          process: presentationStepForSurvey.processId,
          startStep: presentationStepForSurvey.step.id,
        },
      ])
    }
  }, [presentationStepForSurvey, setFieldValue])

  return (
    <form onSubmit={handleSubmit} className={styles.mainContainer}>
      <ModalQuestionsBank open={openQuestionsBank} onClose={closeQuestionsBank}>
        <QuestionsBankList onClose={closeQuestionsBank} onAddQuestion={onAddQuestionFromBank} />
      </ModalQuestionsBank>
      <SurveyInfo
        module={module}
        survey={survey}
        {...getFieldProps}
        onChangeSprint={handleChangeSprint}
      />
      <div className={styles.title}>
        <TextField
          autoFocus
          variant="standard"
          placeholder={t('fields.title')}
          fullWidth
          {...getFieldProps('name')}
          sx={{
            input: {
              fontSize: '28px !important',
              paddingBottom: '15px !important',
              '&::placeholder': { fontSize: '28px !important' },
            },
          }}
        />
      </div>

      <div className={styles.mainFields}>
        <RichTextEditor
          label={t('fields.description')}
          {...getFieldProps('description')}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onChange={async (value) => await setFieldValue(`description`, value)}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.questionsContainer}
            >
              {values.questions.map((question: any, index: number) => (
                <Draggable
                  key={question.uuid}
                  draggableId={question.uuid}
                  index={index}
                  // isDragDisabled={isView}
                >
                  {(draggableProvided: any, snapshot: any) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      style={onDropAnimation(draggableProvided.draggableProps.style, snapshot)}
                    >
                      <div key={index} className={styles.question}>
                        <div className={styles.questionFields}>
                          <TextField
                            label={t('fields.questions.title')}
                            fullWidth
                            {...getQuestionFieldProps('title', index)}
                          />
                          <RichTextEditor
                            label={t('fields.questions.description')}
                            {...getQuestionFieldProps('description', index)}
                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                            onChange={async (value) =>
                              await setFieldValue(`questions[${index}].description`, value)
                            }
                          />
                          <ProcessForm
                            processOptions={surveyProcesses ?? []}
                            getFieldProps={(field: any) => getQuestionFieldProps(field, index)}
                            setFieldValue={async (field: any, value) => {
                              await setFieldValue(`questions[${index}].${field}`, value)
                            }}
                          />
                          <div className={styles.typeContainer}>
                            <Select
                              label={t('fields.questions.type')}
                              fullWidth
                              {...getQuestionFieldProps('type', index)}
                              options={entitiesToOptions(questionTypesOptions)}
                            />
                          </div>
                          {getQuestionFieldProps('type', index).value && (
                            <QuestionForm
                              type={getQuestionFieldProps('type', index).value}
                              getFieldProps={(field: any) => getQuestionFieldProps(field, index)}
                              initialValues={values.questions[index].dropdownOptions}
                              setFieldValue={async (field: any, value) => {
                                await setFieldValue(`questions[${index}].${field}`, value)
                              }}
                            />
                          )}
                        </div>
                        <div className={styles.questionActions}>
                          <QuestionAction
                            title={t('actions.move')}
                            {...draggableProvided.dragHandleProps}
                          >
                            <OpenWithOutlined />
                          </QuestionAction>
                          <QuestionAction
                            onClick={() => {
                              cloneQuestion(index)
                            }}
                            title={t('actions.clone')}
                          >
                            <ContentCopyOutlined />
                          </QuestionAction>
                          <QuestionAction
                            onClick={() => {
                              deleteQuestion(index)
                            }}
                            title={t('actions.remove')}
                          >
                            <DeleteForeverOutlined />
                          </QuestionAction>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddQuestionButton
        addQuestionFromScratch={addQuestion}
        addQuestionFromQuestionBank={handleOpenQuestionsBank}
      />
      {errors.questions && !Array.isArray(errors.questions) && (
        <FormHelperText error>{getFieldProps('questions').helperText}</FormHelperText>
      )}
      <div className={styles.saveContainer}>
        <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
          {t('save')}
        </LoadingButton>
      </div>
    </form>
  )
}

export default SurveyForm
