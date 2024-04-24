import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import i18n from 'src/i18n.ts'
import { I18nextProvider } from 'react-i18next'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <Suspense>
        <App />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
)
