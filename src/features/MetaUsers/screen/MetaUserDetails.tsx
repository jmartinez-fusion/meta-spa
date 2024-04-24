import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { META_USERS } from 'utils/constants'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import ContentBox from 'components/ContentBox'
import FormBox from 'components/FormBox'
import useMetaUserEdition from 'MetaUsers/hooks/useMetaUserEdition'
import MetaUserForm from 'MetaUsers/components/MetaUserForm/MetaUserForm'
import { metaUserToInitialValues } from 'MetaUsers/transformers'

export default function MetaUserDetails(): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers' })
  const { onSubmit, isSubmitting, metaUser } = useMetaUserEdition()
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
      <PrivateScreenTitle title={t('singular')} goBackPath={META_USERS} />
      <Typography variant="h2">{t('details.title')}</Typography>
      <ContentBox>
        <FormBox>
          {metaUser && (
            <MetaUserForm
              initialValues={metaUserToInitialValues(metaUser)}
              mode="view"
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </FormBox>
      </ContentBox>
    </div>
  )
}
