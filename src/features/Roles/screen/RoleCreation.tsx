import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import RolesForm from '../components/RolesForm'
import useRoleCreation from '../hooks/useRoleCreation.tsx'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Typography } from '@mui/material'
import FormBox from 'components/FormBox'
import { ROLES_PATHS } from 'src/features/Roles/routes.tsx'
import PathBreadcrumbs from 'components/PathBreadcrumbs'

const RoleCreation: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Roles' })
  const { onSubmit, isSubmitting } = useRoleCreation()

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
      <Typography variant="h2">{t('create.title')}</Typography>
      <ContentBox>
        <FormBox>
          <RolesForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </FormBox>
      </ContentBox>
    </div>
  )
}

export default RoleCreation
