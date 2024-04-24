import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from './locale/en.json'
// Features
import enAuthJSON from 'src/features/Auth/locale/en.json'
import enProjectsJSON from 'src/features/Projects/locale/en.json'
import enRolesJSON from 'Roles/locale/en.json'
import enIndustriesJSON from 'Industries/locale/en.json'
import enMetaUsersJSON from 'MetaUsers/locale/en.json'
import enFutureProcessesJSON from 'Project/features/FutureProcesses/locale/en.json'
import enCurrentProcessesJSON from 'Project/features/CurrentProcesses/locale/en.json'
import enProcessMappingJSON from 'Project/features/ProcessMapping/locale/en.json'
import enTextBlocksJSON from 'Project/features/TextBlocks/locale/en.json'
import { i18nResources as i18nProjectResources } from './features/Project/i18nResources.ts'

void i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
  }, // Where we're gonna put translations' files
  fallbackLng: 'en', // Default language

  // have a common namespace used around the full app
  defaultNS: 'common',
  fallbackNS: 'common',

  interpolation: {
    escapeValue: false, // false prevents to html escape for special characters
  },
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
i18n.services.formatter.add('lowercase', (value: string) => {
  return value.toLowerCase()
})

i18n.addResourceBundle('en', 'features', {
  Auth: enAuthJSON,
  Projects: enProjectsJSON,
  Roles: enRolesJSON,
  Industries: enIndustriesJSON,
  MetaUsers: enMetaUsersJSON,
  FutureProcesses: enFutureProcessesJSON,
  CurrentProcesses: enCurrentProcessesJSON,
  ProcessMapping: enProcessMappingJSON,
  TextBlocks: enTextBlocksJSON,
  ...i18nProjectResources,
})

export default i18n
