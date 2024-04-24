import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import config from 'config'

interface UseInfluencerUpdateReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useInfluencerUpdate = (
  influencerId: string,
  handleBack: () => void
): UseInfluencerUpdateReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/influencers/${influencerId}`,
    {
      method: 'PUT',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data: any) => {
      void doFetch({ data }).then(() => {
        handleBack()
      })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    const message = t('editedSuccessfully', {
      name: response.data.name,
      type: t('features:ProcessMapping:influencer'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, navigate, enqueueSnackbar])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      action: (
        <div
          onClick={() => {
            retry()
            closeSnackbar()
          }}
        >
          {t('retry')}
        </div>
      ),
    })
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return { onSubmit, isSubmitting: loading }
}

export default useInfluencerUpdate
