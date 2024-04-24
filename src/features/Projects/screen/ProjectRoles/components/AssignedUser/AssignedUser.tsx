import { type ChangeEvent, type ReactNode, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Select from 'components/Select'
import * as Yup from 'yup'
import entitiesToOptions from 'utils/entityToOptions.ts'
import { type ProjectUser } from 'Projects/types'
import styles from './assignedUser.module.scss'
import { IconButton, SvgIcon } from '@mui/material'
import { DeleteForever, PersonRounded } from '@mui/icons-material'

interface ProjectFormProps {
  onChangeRole: (data: any) => void
  projectUser: ProjectUser
  isLoading?: boolean
  roleOptions: Array<{ id: string; name: string }>
  handleRemove: () => void
}

type FormData = 'projectRole'

const AssignedUser = ({
  onChangeRole,
  projectUser,
  handleRemove,
  roleOptions,
}: ProjectFormProps): ReactNode => {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })

  const { handleChange, handleSubmit, handleBlur, touched, errors, values, setFieldValue } =
    useFormik({
      initialValues: {
        projectRole: projectUser?.projectRole?.id,
      },
      validateOnChange: false,
      validationSchema: Yup.object().shape({
        user: Yup.string().required('validations:required'),
      }),
      onSubmit: (data) => {
        onChangeRole(data ?? '')
      },
    })

  const getFieldProps = useCallback(
    (name: FormData) => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        helperText: hasTouched && error ? t(error) : '',
        onBlur: () => {},
      }
    },
    [touched, errors, handleBlur, handleChange, handleSubmit, values]
  )

  useEffect(() => {
    void setFieldValue('projectRole', projectUser?.projectRole?.id)
  }, [projectUser?.projectRole])

  return (
    <form noValidate className={styles.form}>
      <div className={styles.avatar}>
        <SvgIcon fontSize="inherit">
          <PersonRounded fontSize="inherit" />
        </SvgIcon>
      </div>
      <div className={styles.name}>{projectUser?.name}</div>
      <div className={styles.role}>
        <Select
          options={entitiesToOptions(roleOptions)}
          fullWidth
          {...getFieldProps('projectRole')}
          onChange={(e: ChangeEvent<any>) => {
            handleChange(e)
            onChangeRole(e.target.value)
          }}
          // onClear={async () => {
          //   await setFieldValue('projectRole', projectUser ? projectUser.projectRole : null)
          //   onChangeRole(null)
          // }}
        />
      </div>
      <div>
        <IconButton
          className={styles.deleteButton}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleRemove()
          }}
        >
          <SvgIcon>
            <DeleteForever />
          </SvgIcon>
        </IconButton>
      </div>
    </form>
  )
}

export default AssignedUser
