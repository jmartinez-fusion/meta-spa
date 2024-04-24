import { type FC } from 'react'
import { type TableListItemProps } from 'components/TableListItem/types'
import styles from './tableListItem.module.scss'
import { Tooltip } from '@mui/material'

const TableListItem: FC<TableListItemProps> = ({ quantityOfItemsToDisplay = 1, items = [] }) => {
  const showMore = items.length > quantityOfItemsToDisplay

  const displayedItems = items.slice(0, quantityOfItemsToDisplay)

  const additionalItemsText = items.slice(quantityOfItemsToDisplay).join(', ')

  return (
    <div>
      {displayedItems.map((item, index) => (
        <span key={index} className={styles.item}>
          {item}
          {index < quantityOfItemsToDisplay && showMore && ','}
        </span>
      ))}
      {showMore && (
        <Tooltip title={additionalItemsText}>
          <span className={styles.showMore}>{` +${items.length - quantityOfItemsToDisplay}`} </span>
        </Tooltip>
      )}
    </div>
  )
}

export default TableListItem
