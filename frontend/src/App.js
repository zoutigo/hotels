import React from 'react'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { ThemeProvider } from '@mui/material/styles'

import './index.css'
import Home from './components/Home'
import theme from './components/utils/theme'
import { AppStateProvider } from './components/utils/Store'

moment.locale('fr')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
      retryDelay: 500,
    },
  },
})

function App() {
  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <QueryClientProvider client={queryClient}>
        <AppStateProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Home />
            </SnackbarProvider>
          </ThemeProvider>
        </AppStateProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  )
}

export default App
