import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

// Overwriting default components styles
const componentsOverrides = (theme: Theme) => ({
  MuiButton: {
    root: {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
    textSizeLarge: {
      padding: theme.spacing(2),
    },
  },
  MuiIconButton: {
    root: {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
      '&:focus': {
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
  },
  typography: {
    button: {
      fontFamily: '"IBM Plex Mono", monospace',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
    },
    fontFamily: ['Work Sans', 'Montserrat', 'Nunito', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
})

theme.overrides = componentsOverrides(theme)
theme.props = propsOverrides
