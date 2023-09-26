import { Router } from './Router.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global.ts'
import { defaultTheme } from './styles/themes/default.ts'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App