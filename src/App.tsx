import { SnackbarProvider } from 'notistack'
import type { ReactElement } from 'react'
import './App.css'
import BasePage from './pages'

function App(): ReactElement {
  return (
    <div className="App">
      <SnackbarProvider>
        <BasePage />
      </SnackbarProvider>
    </div>
  )
}

export default App
