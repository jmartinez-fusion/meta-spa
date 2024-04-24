import React, { type FC, useState } from 'react'
import { Button, ListItemText, Menu, MenuItem, SvgIcon } from '@mui/material'
import { DifferenceOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import Gated from 'components/Gated'
import { LIST_QUESTIONS_BANK } from 'permissions'

const AddQuestionButton: FC<{
  addQuestionFromScratch: () => void
  addQuestionFromQuestionBank: () => void
}> = ({ addQuestionFromScratch, addQuestionFromQuestionBank }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        color="secondary"
        aria-label="hide"
        size="small"
        id={`basic-button}`}
        aria-controls={`basic-menu}`}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          marginBottom: '20px !important',
          alignSelf: 'flex-start !important',
          borderRadius: '10px !important',
          minHeight: '28px !important',
          maxWidth: '155px !important',
          height: '28px !important',
          maxHeight: '28px !important',
        }}
        startIcon={
          <SvgIcon>
            <DifferenceOutlined />
          </SvgIcon>
        }
      >
        {t('addQuestion')}
      </Button>
      <Menu
        id={`basic-menu}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
        MenuListProps={{
          'aria-labelledby': `basic-button`,
        }}
      >
        <MenuItem
          onClick={() => {
            addQuestionFromScratch()
            handleClose()
          }}
        >
          <ListItemText> {t('fromScratch')}</ListItemText>
        </MenuItem>
        <Gated permissions={LIST_QUESTIONS_BANK}>
          <MenuItem
            onClick={() => {
              addQuestionFromQuestionBank()
              handleClose()
            }}
          >
            <ListItemText>{t('fromQuestionBank')}</ListItemText>
          </MenuItem>
        </Gated>
      </Menu>
    </>
  )
}

export default AddQuestionButton
