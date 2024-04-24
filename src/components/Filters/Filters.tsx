import { type FC } from 'react'
import { SvgIcon, IconButton } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'
import { type FilterProps } from 'components/Filters/types'
import { DeleteOutline } from '@mui/icons-material'
import styles from './filters.module.scss'

const Filters: FC<FilterProps> = ({
  onApply,
  onClear,
  topFilters,
  bottomFilters,
  isSearching = false,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'filters' })

  return (
    <form noValidate onSubmit={onApply} className={styles.wrapper}>
      <div className={styles.filters}>
        {topFilters}
        {bottomFilters}
      </div>
      <div className={styles.actions}>
        <LoadingButton
          variant="outlined"
          fullWidth
          type="submit"
          size="small"
          loading={isSearching}
        >
          {t('search')}
        </LoadingButton>
        <IconButton>
          <SvgIcon titleAccess={t('clear')} onClick={onClear}>
            <DeleteOutline />
          </SvgIcon>
        </IconButton>
      </div>
    </form>
  )
}

export default Filters
