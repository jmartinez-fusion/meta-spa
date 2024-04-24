import { type FC, useEffect } from 'react'
import config from '../../config.tsx'
import { type CaptureExtensionProps } from './types'
import installExtensionIcon from './installExtensionIcon.svg'
import useCapturingTool from 'hooks/useCapturingTool.ts'
import { useTranslation } from 'react-i18next'
import styles from './captureExtension.module.scss'
import useFetchGenerateSignedUrl from 'hooks/useFetchGenerateSignedUrl.tsx'
import LoadingRing from 'components/LoadingRing'
import { type ProcessModule } from 'types/processModule'
import useProject from 'Project/hooks/useProject.ts'

const getCaptureExtensionMetadata = (
  processModule: ProcessModule,
  processId: string,
  projectId: string,
  projectTitle: string,
  redirect?: string
): any => {
  let requestCurrentDataUrl
  let updateUrl
  const uploadImageUrl = `${config.api.msProcesses.baseUrl}/image`

  if (processModule === 'current_state_process') {
    requestCurrentDataUrl = `${config.api.msProcesses.baseUrl}/projects/${projectId}/current-process-presentations/${processId}`
    updateUrl = `${config.api.msProcesses.baseUrl}/projects/${projectId}/current-process-presentations/${processId}`
  }

  if (processModule === 'future_state_process') {
    requestCurrentDataUrl = `${config.api.msProcesses.baseUrl}/projects/${projectId}/future-process-presentations/${processId}`
    updateUrl = `${config.api.msProcesses.baseUrl}/projects/${projectId}/future-process-presentations/${processId}`
  }

  return {
    requestCurrentDataUrl,
    processId,
    title: projectTitle,
    uploadImageUrl,
    updateUrl,
    redirect: redirect ?? window.location.href,
  }
}

const CaptureExtension: FC<CaptureExtensionProps> = ({ children, module, processId, redirect }) => {
  const { isInstalled } = useCapturingTool()
  const { t } = useTranslation()
  const { project } = useProject()
  const { generateSignedUrl, signedUrl } = useFetchGenerateSignedUrl(
    getCaptureExtensionMetadata(module, processId, project?.id ?? '', project?.name ?? '', redirect)
  )

  useEffect(() => {
    void generateSignedUrl()
  }, [isInstalled])

  if (!signedUrl) {
    return <LoadingRing center small />
  }

  return (
    <div className={styles.mainContainer}>
      {isInstalled ? (
        <div
          className={styles.installedContainer}
          data-mcm-extension-init
          data-mcm-extension-api-signed-url={signedUrl}
        >
          {children}
        </div>
      ) : (
        <div className={styles.notInstalledContainer}>
          <img
            src={installExtensionIcon}
            alt="installExtensionIcon"
            className={styles.extensionIcon}
          />
          <div>{t('needToInstallCaptureExtension')}</div>
          <a
            className={styles.installButton}
            href={import.meta.env.VITE_CAPTURE_EXTENSION_INSTALL_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t('install')}
          </a>
        </div>
      )}
    </div>
  )
}

export default CaptureExtension
