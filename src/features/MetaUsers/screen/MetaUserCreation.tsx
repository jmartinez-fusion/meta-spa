import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { META_USERS } from 'utils/constants'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import FormBox from 'components/FormBox'
import ContentBox from 'components/ContentBox'
import MetaUserCreationForm from 'MetaUsers/components/MetaUserForm/MetaUserForm'
import useMetaUserCreation from 'MetaUsers/hooks/useMetaUserCreation'

export default function MetaUserCreation(): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers' })
  const { onSubmit, isSubmitting } = useMetaUserCreation()
  const itemsBreadcrumbs = [
    {
      title: t('metaUsers'),
      path: META_USERS,
      active: false,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('metaUsers')} goBackPath={META_USERS} />
      <Typography variant="h2">{t('create.title')}</Typography>
      <ContentBox>
        <FormBox>
          <MetaUserCreationForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </FormBox>
      </ContentBox>
    </div>
  )
}
