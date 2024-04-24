import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useFilters from 'hooks/useFilters.js'
import DepartmentsFilters from 'Project/features/Structure/features/Departments/components/DepartmentsFilters'
import DepartmentsTable from 'Project/features/Structure/features/Departments/components/DepartmentsTable'
import useFetchDepartments from 'Project/features/Structure/features/Departments/hooks/useFetchDepartments.tsx'
import { DEPARTMENTS_PATHS } from 'Project/features/Structure/features/Departments/routes.tsx'
import { type Department } from 'Project/features/Structure/features/Departments/types'
import dateFormat from 'utils/dateFormat.ts'
import StructureHeader from 'components/StructureHeader'
import styles from './departmentsList.module.scss'
import useModal from 'hooks/useModal.tsx'
import UploadDepartments from 'Project/features/Structure/features/Departments/components/UploadDepartments'
import Gated from 'components/Gated'
import { UPLOAD_DEPARTMENTS } from 'permissions'
const DepartmentsList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'Departments' })
  const { projectId } = useParams()
  const { onCancel, onApply, filters } = useFilters()
  const { departments, paginator, sorter, setSorter, loading, refresh } = useFetchDepartments({
    filters,
  })
  const {
    Modal: ModalUploadDepartments,
    close: closeUploadDepartments,
    open,
    handleOpen,
  } = useModal()
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: DEPARTMENTS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: false,
    },
    {
      title: t('plural'),
      path: DEPARTMENTS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: true,
    },
  ]

  const columns = useMemo(
    () => [
      {
        header: t('fields.name'),
        fieldName: 'name',
        sortable: true,
      },
      {
        header: t('fields.departmentCode'),
        fieldName: 'code',
        sortable: true,
      },
      {
        header: t('fields.parentDepartment'),
        fieldName: 'parent',
        sortable: true,
        dataModifier: (department: Department): any => department.parent?.name || '',
      },
      {
        header: t('fields.updatedAt'),
        fieldName: 'updatedAt',
        sortable: true,
        dataModifier: (department: Department): string => dateFormat(department.updatedAt),
      },
    ],
    [t]
  )

  const handleClickView = useCallback(
    ({ id }: { id: string }) => {
      navigate(`${id}/view`)
    },
    [navigate]
  )

  const handleClickAdd = useCallback(() => {
    handleOpen()
  }, [navigate])

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
      <div className={styles.subtitle}>{t('plural')}</div>
      <ContentBox>
        <DepartmentsFilters onCancel={onCancel} onApply={onApply} />
        <DepartmentsTable
          columns={columns}
          rows={departments}
          loading={loading}
          onClickView={handleClickView}
          onSort={setSorter}
          count={lastPage}
          page={page}
          sorter={sorter}
          onPageChange={setPage}
          displayResultsMessage={displayResultsMessage}
          perPage={perPage}
          onRowsPerPageChange={setPerPage}
        />
      </ContentBox>
      <ModalUploadDepartments open={open && !loading} onClose={closeUploadDepartments}>
        <UploadDepartments handleClose={closeUploadDepartments} onSuccess={refresh} />
      </ModalUploadDepartments>
    </div>
  )
}

export default DepartmentsList
