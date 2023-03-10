import PropTypes from 'prop-types'
import { useMemo } from 'react'

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// project import
import useConfig from '../hooks/useConfig'
import Palette from './palette'
import Typography from './typography'

import componentStyleOverrides from './compStyleOverride'
import customShadows from './shadows'

// assets
import colors from '../styles/_themes-vars.module.scss'
import theme1 from '../styles/_theme1.module.scss'
import theme2 from '../styles/_theme2.module.scss'
import theme3 from '../styles/_theme3.module.scss'
import theme4 from '../styles/_theme4.module.scss'
import theme5 from '../styles/_theme5.module.scss'
import theme6 from '../styles/_theme6.module.scss'
import { ruRU } from '@mui/x-data-grid'
import { ruRU as pickersRuRU } from '@mui/x-date-pickers'
import { ruRU as coreRuRU } from '@mui/material/locale'
export default function ThemeCustomization({ children }: { children: any }) {
  const config = useConfig()
  const {
    borderRadius,
    fontFamily,
    navType,
    outlinedFilled,
    presetColor,
    rtlLayout,
  } = useConfig()

  const theme = useMemo(
    () => Palette(navType, presetColor),
    [navType, presetColor]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = useMemo(
    () => Typography(theme, borderRadius, fontFamily),
    [theme, borderRadius, fontFamily]
  )
  const themeCustomShadows = useMemo(
    () => customShadows(navType, theme),
    [navType, theme]
  )

  let color
  switch (config.presetColor) {
    case 'theme1':
      color = theme1
      break
    case 'theme2':
      color = theme2
      break
    case 'theme3':
      color = theme3
      break
    case 'theme4':
      color = theme4
      break
    case 'theme5':
      color = theme5
      break
    case 'theme6':
      color = theme6
      break
    case 'default':
    default:
      color = colors
  }

  const themeOption = {
    colors: color,
    heading: '',
    paper: '',
    backgroundDefault: '',
    background: '',
    darkTextPrimary: '',
    darkTextSecondary: '',
    textDark: '',
    menuSelected: '',
    menuSelectedBack: '',
    divider: '',
    customization: config,
  }

  switch (config.navType) {
    case 'dark':
      themeOption.paper = color.darkLevel2
      themeOption.backgroundDefault = color.darkPaper
      themeOption.background = color.darkBackground
      themeOption.darkTextPrimary = color.darkTextPrimary
      themeOption.darkTextSecondary = color.darkTextSecondary
      themeOption.textDark = color.darkTextPrimary
      themeOption.menuSelected = color.darkSecondaryMain
      themeOption.menuSelectedBack = color.darkSecondaryMain + 15
      themeOption.divider = color.darkTextPrimary
      themeOption.heading = color.darkTextTitle
      break
    case 'light':
    default:
      themeOption.paper = color.paper
      themeOption.backgroundDefault = color.paper
      themeOption.background = color.primaryLight
      themeOption.darkTextPrimary = color.grey700
      themeOption.darkTextSecondary = color.grey500
      themeOption.textDark = color.grey900
      themeOption.menuSelected = color.secondaryDark
      themeOption.menuSelectedBack = color.secondaryLight
      themeOption.divider = color.grey200
      themeOption.heading = color.grey900
      break
  }

  const themeOptions = useMemo(
    () => ({
      direction: rtlLayout ? 'rtl' : 'ltr',
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
    }),
    [rtlLayout, theme, themeCustomShadows, themeTypography]
  )

  const themes = createTheme(themeOptions as any, ruRU, pickersRuRU, coreRuRU)
  themes.components = useMemo(
    () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
    [themes, borderRadius, outlinedFilled]
  )

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
