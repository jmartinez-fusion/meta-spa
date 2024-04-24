import { Button, SvgIcon, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import img401 from 'src/assets/errors/error-401.png'
import img404 from 'src/assets/errors/error-404.png'
import img500 from 'src/assets/errors/error-500.png'
import { DASHBOARD } from 'src/utils/constants.ts'
import { useTranslation } from 'react-i18next'
import { type FC } from 'react'
import { ChevronLeftRounded } from '@mui/icons-material'
import styles from './errors.module.scss'

interface ErrorPageProps {
  status: string
  reloadDocument?: boolean
  showGoBack?: boolean
}

const IMAGE_MAP: Record<string, string> = {
  '401': img401,
  '403': img404,
  '404': img404,
  '410': img404,
  '500': img500,
}

const ErrorPage: FC<ErrorPageProps> = ({ status, reloadDocument = false, showGoBack = true }) => {
  const img = IMAGE_MAP[status]
  const { t } = useTranslation('errors', { keyPrefix: status })

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img
          alt="Under development"
          src={img}
          style={{
            maxWidth: '100%',
            width: 400,
          }}
        />
        <Typography align="center" sx={{ mb: 3 }} variant="h3">
          {t('title')}
        </Typography>
        <Typography align="center" color="text.secondary" variant="body1">
          {t('description')}
        </Typography>
        {showGoBack && (
          <Button
            component={Link}
            to={DASHBOARD}
            reloadDocument={reloadDocument}
            startIcon={
              <SvgIcon fontSize="small">
                <ChevronLeftRounded />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            {t('goBackButton')}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ErrorPage
