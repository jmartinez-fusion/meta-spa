import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import RolesForm from 'src/features/Roles/components/RolesForm'
import ContentBox from 'components/ContentBox'
import useFetchRoleDetail from '../hooks/useFetchRoleDetail.tsx'
import { useParams } from 'react-router-dom'
import { roleEdition } from '../transformers'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import { ROLES_PATHS } from 'src/features/Roles/routes.tsx'
import { Typography } from '@mui/material'
import FormBox from 'components/FormBox'

const RoleDetails: FC = () => {
  const { id } = useParams()
  const { t } = useTranslation('features', { keyPrefix: 'Roles' })
  const { role } = useFetchRoleDetail(id)

  const itemsBreadcrumbs = [
    {
      title: t('security'),
      path: ROLES_PATHS.LIST,
      active: false,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('roles')} goBackPath={ROLES_PATHS.LIST} />
      <Typography variant="h2">{t('details.title')}</Typography>
      <ContentBox>
        <FormBox>
          <RolesForm
            onSubmit={() => {
              console.log('a')
            }}
            mode="view"
            isSubmitting={false}
            initialValues={roleEdition(role)}
          />
        </FormBox>
      </ContentBox>
    </div>
  )
}

export default RoleDetails
