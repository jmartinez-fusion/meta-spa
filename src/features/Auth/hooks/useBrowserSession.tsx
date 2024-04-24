import Session from 'src/features/Auth/models/Session'
import useBrowserStorage from 'src/hooks/useBrowserStorage'

export interface BrowserSessionType {
  activeSession: () => Session | null
  hasActiveSession: () => boolean
  persistSession: (session: Session) => void
  clearSession: () => void
}

export default function useBrowserSession(identifierKey = 'session'): BrowserSessionType {
  const browserStorage = useBrowserStorage(identifierKey)

  const hasActiveSession = (): boolean => {
    return !!browserStorage.get()
  }

  const activeSession = (): Session | null => {
    if (hasActiveSession()) {
      return Session.fromBrowser(browserStorage.get())
    }

    return null
  }

  const persistSession = (session: Session): void => {
    browserStorage.persist(session.asJson)
  }

  const clearSession = (): void => {
    browserStorage.clear()
  }

  return { activeSession, hasActiveSession, persistSession, clearSession }
}
