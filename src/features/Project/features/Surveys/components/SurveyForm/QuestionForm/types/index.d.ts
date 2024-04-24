export interface QuestionFormProps {
  type: 'dropdown'
  initialValues?: string[]
  getFieldProps: (field) => any
  setFieldValue: (field, value) => any
}
