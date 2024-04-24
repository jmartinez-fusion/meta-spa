import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import ContentBox from 'components/ContentBox'
import FormBox from 'components/FormBox'
import { META_USERS } from 'utils/constants'
import { metaUserToInitialValues } from 'MetaUsers/transformers'
import MetaUserForm from 'MetaUsers/components/MetaUserForm/MetaUserForm'
import useMetaUserEdition from 'MetaUsers/hooks/useMetaUserEdition'

export default function MetaUserEdition(): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers' })
  const { onSubmit, isSubmitting, metaUser } = useMetaUserEdition()
  const itemsBreadcrumbs = [
    {
      title: t('security'),
      path: META_USERS,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('singular')} goBackPath={META_USERS} />
      <Typography variant="h2">{t('edit.title')}</Typography>
      <ContentBox>
        <FormBox>
          {metaUser && (
            <MetaUserForm
              initialValues={metaUserToInitialValues(metaUser)}
              mode="edit"
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </FormBox>
      </ContentBox>
    </div>
  )
}
