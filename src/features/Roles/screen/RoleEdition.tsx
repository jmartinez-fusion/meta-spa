import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import RolesForm from 'src/features/Roles/components/RolesForm'
import ContentBox from 'components/ContentBox'
import { roleEdition } from '../transformers'
import useRoleEdition from '../hooks/useRoleEdition.tsx'
import LoadingRing from 'components/LoadingRing'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Typography } from '@mui/material'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import { ROLES_PATHS } from '../routes.tsx'
import FormBox from 'components/FormBox'

const RoleEdition: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Roles' })
  const { onSubmit, role, loading, isSubmitting } = useRoleEdition()

  const itemsBreadcrumbs = [
    {
      title: t('security'),
      path: ROLES_PATHS.LIST,
      active: false,
    },
  ]

  if (loading) {
    return <LoadingRing center small />
  }

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('roles')} goBackPath={ROLES_PATHS.LIST} />
      <Typography variant="h2">{t('edit.title')}</Typography>
      <ContentBox>
        <FormBox>
          <RolesForm
            mode="edit"
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            initialValues={roleEdition(role)}
          />
        </FormBox>
      </ContentBox>
    </div>
  )
}

export default RoleEdition
