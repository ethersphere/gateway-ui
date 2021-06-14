import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    appBar: string
  }
}

// Overwriting default components styles
const componentsOverrides = (theme: Theme) => ({
  MuiButton: {
    root: {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
      '&$selected': {
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
      '&$selected': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  },
})

const propsOverrides = {
  MuiButton: {
    disableRipple: true,
    disableFocusRipple: true,
    disableElevation: true,
  },
  MuiIconButton: {
    disableRipple: true,
    disableFocusRipple: true,
    disableElevation: true,
  },
  MuiPaper: {
    elevation: 0,
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
