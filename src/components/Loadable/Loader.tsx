import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import nProgress from 'nprogress'
import { type ReactNode, useEffect, useRef } from 'react'

// styles
const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
})

// ==============================|| LOADER ||============================== //
const Loader = (): ReactNode => {
  const ref = useRef<boolean>(false)

  useEffect(() => {
    if (ref.current) {
      nProgress.configure({ showSpinner: false })
      nProgress.start()
    }

    return () => {
      if (ref.current) {
        nProgress.done()
      }
      ref.current = true
    }
  }, [])

  return (
    <LoaderWrapper>
      <LinearProgress color="primary" />
    </LoaderWrapper>
  )
}

export default Loader
