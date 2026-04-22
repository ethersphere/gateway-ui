import { orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
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
      fontWeight: 400,
    },
    subtitle1: {
      color: '#242424',
    },
    subtitle2: {
      color: '#999999',
      fontWeight: 400,
    },
    fontFamily: ['Work Sans', 'Montserrat', 'Nunito', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        textSizeLarge: ({ theme }) => ({
          padding: theme.spacing(2),
        }),
        containedSizeLarge: ({ theme }) => ({
          padding: theme.spacing(2),
        }),
        contained: ({ theme }) => ({
          backgroundColor: 'white',
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: 'none',
          '& svg': {
            stroke: theme.palette.primary.main,
            transition: '0.1s',
          },
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            boxShadow: 'none',
            '@media (hover: none)': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              boxShadow: 'none',
            },
            '& svg': {
              stroke: '#fff',
              transition: '0.1s',
            },
          },
          '&:active': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            boxShadow: 'none',
            '& svg': {
              stroke: '#fff',
              transition: '0.1s',
            },
          },
          '&:focus': {
            backgroundColor: 'white',
            color: theme.palette.text.primary,
            boxShadow: 'none',
            '& svg': {
              stroke: theme.palette.primary.main,
              transition: '0.1s',
            },
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'white',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            boxShadow: 'none',
            '@media (hover: none)': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              boxShadow: 'none',
            },
          },
          '&:focus': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            boxShadow: 'none',
          },
          '&:active': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            boxShadow: 'none',
          },
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'white',
          borderLeft: `4px solid ${theme.palette.background.default}`,
          borderRight: `4px solid ${theme.palette.background.default}`,
          opacity: 1,
          color: `${theme.palette.text.primary} !important`,
          '&.Mui-selected': {
            fontWeight: theme.typography.fontWeightMedium,
          },
          '&:focus': {
            color: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderBottom: 'none',
        },
        indicator: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          paddingLeft: 4,
          paddingRight: 4,
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: '#242424',
          padding: theme.spacing(2),
          fontSize: theme.typography.body2.fontSize,
          fontStyle: 'italic',
          maxWidth: '100%',
        }),
        arrow: {
          color: '#242424',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
          margin: 0,
          '&:hover': { backgroundColor: theme.palette.primary.main },
          '&.Mui-focused': {
            color: 'white',
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
        }),
        multiline: ({ theme }) => ({
          padding: theme.spacing(2),
          margin: 0,
          '&:hover': { color: 'white', backgroundColor: `${theme.palette.primary.main} !important` },
        }),
      },
    },
  },
})
