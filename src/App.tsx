import type { ReactElement } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import Routes from './Routes'
import { Provider } from './providers/bee'
import { theme } from './theme'

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Provider>
        <>
          <CssBaseline />
          <Routes />
        </>
      </Provider>
    </ThemeProvider>
  )
}

export default App
