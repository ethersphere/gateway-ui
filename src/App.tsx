import { SnackbarProvider } from 'notistack'
import type { ReactElement } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'

import Routes from './Routes'
import { Provider } from './providers/bee'
import DevAlertPostageStamp from './dev/AlertPostageStamp'
import { theme } from './theme'

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Provider>
          <>
            <CssBaseline />
            <Routes />
            <DevAlertPostageStamp />
          </>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
