import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

// Overwriting default components styles
const componentsOverrides = (theme: Theme) => ({
  MuiButton: {
    textSizeLarge: {
      padding: theme.spacing(2),
    },
    containedSizeLarge: {
      padding: theme.spacing(2),
    },
    contained: {
      backgroundColor: 'white',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          boxShadow: 'none',
        },
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
      '&:active': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  },

  MuiIconButton: {
    root: {
      backgroundColor: 'white',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          boxShadow: 'none',
        },
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
      '&:active': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  },
  MuiTab: {
    root: {
      backgroundColor: 'white',
      borderLeft: `4px solid ${theme.palette.background.default}`,
      borderRight: `4px solid ${theme.palette.background.default}`,
      opacity: 1,
      color: `${theme.palette.text.primary} !important`,
      '&:hover': {},
      '&$selected': {
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: theme.palette.secondary,
      },
    },
  },
  MuiTabs: {
    root: {
      backgroundColor: 'white',
      borderBottom: 'none',
    },
    indicator: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: 4,
      paddingRight: 4,
    },
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: '#242424',
      padding: theme.spacing(2),
      fontSize: theme.typography.body2.fontSize,
      fontStyle: 'italic',
      maxWidth: '100%',
    },
    arrow: {
      color: '#242424',
    },
  },
  MuiInputBase: {
    root: {
      padding: theme.spacing(2),
      margin: 0,
      '&:hover': { backgroundColor: theme.palette.primary.main, fontStyle: 'white' },
    },
    multiline: {
      padding: theme.spacing(2),
      margin: 0,
      '&:hover': { color: 'white', backgroundColor: `${theme.palette.primary.main} !important`, fontStyle: 'white' },
    },
    focused: {
      color: 'white',
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
})

const propsOverrides = {
  MuiButtonBase: {
    disableRipple: true,
  },
}

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#efefef',
    },
    primary: {
      light: orange.A200,
      main: '#dd7200',
      dark: orange[800],
    },
    secondary: {
      main: '#242424',
    },
    text: {
      primary: '#242424',
      secondary: '#999999',
    },
  },
  typography: {
    button: {
      fontFamily: '"IBM Plex Mono", monospace',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      color: '#242424',
    },
    caption: {
      fontFamily: '"IBM Plex Mono", monospace',
      fontWeight: 500,
      fontSize: '1rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
    },
    body1: {
      color: '#242424',
    },
    body2: {
      color: '#999999',
    },
    subtitle1: {
      color: '#242424',
    },
    fontFamily: ['Work Sans', 'Montserrat', 'Nunito', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
})

theme.overrides = componentsOverrides(theme)
theme.props = propsOverrides
