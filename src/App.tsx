import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { ReactElement } from 'react'

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
