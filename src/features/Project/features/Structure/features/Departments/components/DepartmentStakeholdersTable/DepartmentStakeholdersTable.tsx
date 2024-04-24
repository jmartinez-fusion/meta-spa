import { type FC, type ReactNode, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'hooks/useFilters.ts'
import useFetchStakeholders from 'Project/features/Structure/features/Stakeholders/hooks/useFetchStakeholders.tsx'
import { type Stakeholder } from 'Project/features/Structure/features/Stakeholders/types'
import { STAKEHOLDERS_PATHS } from 'Project/features/Structure/features/Stakeholders/routes.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import ContentBox from 'components/ContentBox'
import StakeholdersFilters from 'Project/features/Structure/features/Stakeholders/components/StakeholdersFilters'
import StakeholdersTable from 'Project/features/Structure/features/Stakeholders/components/StakeholdersTable'
import TableListItem from 'components/TableListItem'
import dateFormat from 'utils/dateFormat.ts'
import styles from './departmentStakeholdersTable.module.scss'

interface DepartmentStakeholdersTableProps {
  departmentId: string
}

const DepartmentStakeholdersTable: FC<DepartmentStakeholdersTableProps> = ({ departmentId }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Stakeholders' })
  const { onCancel, onApply, filters } = useFilters()
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { stakeholders, paginator, sorter, setSorter, loading } = useFetchStakeholders({
    filters: { ...filters, departments: departmentId },
  })
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const columns = useMemo(
    () => [
      {
        header: t('fields.name'),
        fieldName: 'name',
        sortable: true,
      },
      {
        header: t('fields.email'),
        fieldName: 'email',
        sortable: true,
      },
      {
        header: t('fields.code'),
        fieldName: 'code',
        sortable: true,
      },
      {
        header: t('fields.positions'),
        fieldName: 'positions',
        sortable: false,
        dataModifier: (stakeholder: Stakeholder): ReactNode => (
          <TableListItem items={stakeholder?.positions} />
        ),
      },
      {
        header: t('fields.updatedAt'),
        fieldName: 'updatedAt',
        sortable: false,
        dataModifier: (stakeholder: Stakeholder): string =>
          dateFormat(stakeholder.updatedAt, 'MM/DD/YYYY HH:mm'),
      },
    ],
    [t]
  )

  const handleClickView = useCallback(
    ({ id }: Stakeholder) => {
      navigate(
        STAKEHOLDERS_PATHS.DETAILS.replace(':projectId', projectId ?? '').replace(
          ':stakeholderId',
          id
        )
      )
    },
    [navigate, projectId]
  )

  return (
    <ContentBox>
      <div className={styles.stakeholders}>{t('plural')}</div>
      <StakeholdersFilters
        onCancel={onCancel}
        onApply={onApply}
        showDepartmentsFilter={false}
        initialFilters={{
          stakeholder: '',
          positions: [],
          departments: [{ value: departmentId }],
          isManager: '',
          hasDepartment: '',
          updatedAtFrom: null,
          updatedAtTo: null,
          projectRole: '',
        }}
      />
      <StakeholdersTable
        columns={columns}
        rows={stakeholders}
        loading={loading}
        onSort={setSorter}
        onClickView={handleClickView}
        count={lastPage}
        page={page}
        sorter={sorter}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
      />
    </ContentBox>
  )
}

export default DepartmentStakeholdersTable
