import { createTheme as createMuiTheme, type Theme } from '@mui/material'
import { createPalette } from './create-palette'
import { createComponents } from './create-components'
import { createShadows } from './create-shadows'
import { createTypography } from './create-typography'
import { type Localization } from '@mui/material/locale'

export function createTheme(lang: Localization): Theme {
  const palette = createPalette()
  const components = createComponents()
  const shadows = createShadows()
  const typography = createTypography()

  return createMuiTheme(
    {
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1440,
        },
      },
      components,
      palette,
      shadows,
      shape: {
        borderRadius: 8,
      },
      typography,
    },
    lang
  )
}
