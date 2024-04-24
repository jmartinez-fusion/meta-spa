import { type FC } from 'react'
import useAuth from 'features/Auth/hooks/useAuth'
import styles from './userInfo.module.scss'
import dateTimeFormat from 'utils/dateTimeFormat'
import dayjs, { type Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'

interface UserInfoProps {
  createdBy?: string | null
  createdAt?: string | null | Dayjs
  updatedBy?: string | null
  updatedAt?: string | null | Dayjs
}

const UserInfo: FC<UserInfoProps> = ({ createdBy, createdAt, updatedBy, updatedAt }) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks.form' })
  const { session } = useAuth()
  const { user } = session ?? {}

  const getCurrentDateTime = (): string | undefined => dateTimeFormat(dayjs().toISOString())

  return (
    <div className={styles.userInfo}>
      <div className={styles.userColumn}>
        <p>
          <strong>{t('created')}</strong>
        </p>
        <p className={styles.date}>
          {createdBy ?? user?.name} | {dateTimeFormat(createdAt) ?? getCurrentDateTime()}
        </p>
      </div>
      <div className={styles.userColumn}>
        <p>
          <strong>{t('updated')}</strong>
        </p>
        <p className={styles.date}>
          {updatedBy ?? user?.name} | {dateTimeFormat(updatedAt) ?? getCurrentDateTime()}
        </p>
      </div>
    </div>
  )
}

export default UserInfo
