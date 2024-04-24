import React, { type FC, useState } from 'react'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { MoreVertOutlined } from '@mui/icons-material'
import { type Action } from 'components/Table/components/withActions/TableWithActions.tsx'
import { type TableRowData } from 'components/Table'

const MenuActions: FC<{ actions: Action[]; row: TableRowData }> = ({ row, actions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  if (!(actions.length > 0)) {
    return null
  }

  return (
    <>
      {actions.length > 0 && (
        <IconButton
          color="secondary"
          aria-label="hide"
          size="small"
          id={`basic-button}`}
          aria-controls={`basic-menu}`}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertOutlined sx={{ fontSize: 14 }} />
        </IconButton>
      )}
      <Menu
        id={`basic-menu}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
        MenuListProps={{
          'aria-labelledby': `basic-button`,
        }}
      >
        {actions.map(({ label, icon: Icon, onClick }) => (
          <MenuItem
            key={label}
            onClick={() => {
              onClick(row)
            }}
          >
            <ListItemIcon>
              <Icon sx={{ fontSize: 14 }} />
            </ListItemIcon>
            <ListItemText> {label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MenuActions
