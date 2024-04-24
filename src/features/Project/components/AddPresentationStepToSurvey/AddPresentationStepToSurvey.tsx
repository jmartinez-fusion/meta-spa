import React from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type AddPresentationStepToSurveyProps } from 'Project/components/AddPresentationStepToSurvey/types'
import useModal from 'hooks/useModal.tsx'
import AddPresentationStepToSurveyModal from 'Project/components/AddPresentationStepToSurvey/AddPresentationStepToSurveyModal'
import Gated from 'components/Gated'
import { CREATE_SURVEY, GENERIC_UPDATE_SURVEY, LIST_SURVEYS } from 'permissions'

const AddPresentationStepToSurvey: React.FC<AddPresentationStepToSurveyProps> = ({
  module,
  step,
  effectiveProcessId,
}) => {
  const { t } = useTranslation('common')
  const { Modal, close: onClose, open, handleOpen } = useModal()

  return (
    <>
      <Gated permissions={[LIST_SURVEYS, CREATE_SURVEY, GENERIC_UPDATE_SURVEY]}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          sx={{
            borderRadius: '10px !important',
            minHeight: '28px !important',
            minWidth: 'unset !important',
            height: '28px !important',
            maxHeight: '28px !important',
          }}
        >
          {t('addQuestion')}
        </Button>
      </Gated>

      <Modal open={open} onClose={onClose}>
        <AddPresentationStepToSurveyModal
          onClose={onClose}
          step={step}
          module={module}
          effectiveProcessId={effectiveProcessId}
        />
      </Modal>
    </>
  )
}

export default AddPresentationStepToSurvey
