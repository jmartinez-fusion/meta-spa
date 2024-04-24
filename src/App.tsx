import AuthProvider from './features/Auth/contexts/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AuthConsumer from './features/Auth/contexts/AuthConsumer.ts'
import 'src/styles/globalStyles.module.scss'
import Routes from './routes.tsx'
import Interceptors from './utils/Interceptors.tsx'
import { enUS, type Localization } from '@mui/material/locale'
import LoadingRing from 'components/LoadingRing'
import { CacheProvider } from '@emotion/react'
import 'simplebar-react/dist/simplebar.min.css'
import { createEmotionCache } from './utils/create-emotion-cache.ts'
import { useTranslation } from 'react-i18next'
import { createTheme } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import config from './config.tsx'
import { ConfirmProvider } from 'material-ui-confirm'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './features/Errors'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enUS as en, es } from 'date-fns/locale'
import CapturingToolProvider from './contexts/CapturingToolProvider.tsx'

const themeLangMap: Record<string, Localization> = {
  en: enUS,
}

const LOCALE_MAP = { es, en }

// eslint-disable-next-line no-undef
const App = (): JSX.Element => {
  const emotionCache = createEmotionCache()
  const { i18n } = useTranslation()
  const themeLang = themeLangMap[i18n.language]
  const theme = createTheme(themeLang)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const adapterLocale = LOCALE_MAP[i18n.language]

  return (
    <BrowserRouter>
      <CacheProvider value={emotionCache}>
        <Interceptors>
          <CapturingToolProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
              <AuthProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <SnackbarProvider maxSnack={config.snackbar.maxSnack}>
                    <ErrorBoundary fallback={<ErrorPage status="500" reloadDocument />}>
                      <ConfirmProvider>
                        <AuthConsumer>
                          {(auth) => (auth.isLoading ? <LoadingRing center /> : <Routes />)}
                        </AuthConsumer>
                      </ConfirmProvider>
                    </ErrorBoundary>
                  </SnackbarProvider>
                </ThemeProvider>
              </AuthProvider>
            </LocalizationProvider>
          </CapturingToolProvider>
        </Interceptors>
      </CacheProvider>
    </BrowserRouter>
  )
}

export default App
