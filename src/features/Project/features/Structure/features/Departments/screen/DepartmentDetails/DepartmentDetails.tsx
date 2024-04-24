import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useFetchDepartmentDetail from 'Project/features/Structure/features/Departments/hooks/useFetchDepartmentDetail.tsx'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material'
import StructureHeader from 'components/StructureHeader'
import { DEPARTMENTS_PATHS } from 'Project/features/Structure/features/Departments/routes.tsx'
import DepartmentInfo from 'Project/features/Structure/features/Departments/components/DepartmentInfo/DepartmentInfo.tsx'
import styles from './departmentDetails.module.scss'
import Subtitle from 'components/Subtitle'
import UploadDepartments from 'Project/features/Structure/features/Departments/components/UploadDepartments'
import useModal from 'hooks/useModal.tsx'
import LoadingRing from 'components/LoadingRing'
import Gated from 'components/Gated'
import { LIST_STAKEHOLDERS, UPLOAD_DEPARTMENTS } from 'permissions'
import DepartmentStakeholdersTable from 'Project/features/Structure/features/Departments/components/DepartmentStakeholdersTable'

const DepartmentDetails: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Departments' })
  const { departmentId, projectId } = useParams()
  const {
    Modal: ModalUploadDepartments,
    close: closeUploadDepartments,
    open,
    handleOpen,
  } = useModal()
  const { department, loading } = useFetchDepartmentDetail({ id: departmentId })

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: DEPARTMENTS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: false,
    },
    {
      title: t('plural'),
      path: DEPARTMENTS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: false,
    },
    {
      title: t('singular'),
      path: DEPARTMENTS_PATHS.DETAILS.replace(':projectId', projectId ?? '').replace(
        ':departmentId',
        departmentId ?? ''
      ),
      active: true,
    },
  ]

  const handleClickAdd = useCallback(() => {
    handleOpen()
  }, [])

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        rightContent={
          <Gated permissions={UPLOAD_DEPARTMENTS}>
            <Button onClick={handleClickAdd} endIcon={<FileUploadOutlined />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <StructureHeader active="departments" />
      <Subtitle
        subtitle={t('plural')}
        goBackPath={DEPARTMENTS_PATHS.LIST.replace(':projectId', projectId ?? '')}
      />
      {loading ? (
        <LoadingRing center small />
      ) : (
        <>
          <div className={styles.departmentInfo}>
            <DepartmentInfo department={department} />
          </div>
          <Gated permissions={LIST_STAKEHOLDERS}>
            <DepartmentStakeholdersTable departmentId={department?.id ?? ''} />
          </Gated>
          <ModalUploadDepartments open={open && !loading} onClose={closeUploadDepartments}>
            <UploadDepartments handleClose={closeUploadDepartments} />
          </ModalUploadDepartments>
        </>
      )}
    </div>
  )
}

export default DepartmentDetails
