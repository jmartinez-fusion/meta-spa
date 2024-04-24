import { type ReactNode, type FC } from 'react'
import axios from 'axios'
// import { useTranslation } from 'react-i18next'
import useBrowserSession from 'src/features/Auth/hooks/useBrowserSession'

interface InterceptorProps {
  children?: ReactNode
}

const Interceptors: FC<InterceptorProps> = ({ children }) => {
  const { activeSession } = useBrowserSession()
  // const { i18n } = useTranslation()

  axios.interceptors.request.use(
    (config) => {
      const session = activeSession()

      if (!config.headers.Authorization) {
        if (session) {
          config.headers.Authorization = `Bearer ${session.accessToken}`
        } else {
          config.headers.Authorization = undefined
        }
      }

      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
      }

      // if (!config.headers['Accept-Language']) {
      //   config.headers['Accept-Language'] = LANG_MAP[i18n.language]
      // }

      return config
    },
    async (error) => await Promise.reject(error)
  )

  return children
}

export default Interceptors
