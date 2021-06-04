import { SnackbarProvider } from 'notistack'
import type { ReactElement } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import BasePage from './pages'
import { Provider } from './providers/bee'
import DevAlertPostageStamp from './dev/AlertPostageStamp'

function App(): ReactElement {
  return (
    <div className="App">
      <SnackbarProvider>
        <Provider>
          <>
            <CssBaseline />
            <DevAlertPostageStamp />
            <BasePage />
          </>
        </Provider>
      </SnackbarProvider>
    </div>
  )
}

export default App
