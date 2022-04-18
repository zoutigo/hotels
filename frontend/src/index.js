import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { ThemeProvider } from '@mui/material/styles'

import './App.css'
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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LocalizationProvider dateAdapter={MomentUtils}>
    <QueryClientProvider client={queryClient}>
      <AppStateProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <BrowserRouter>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </AppStateProvider>
    </QueryClientProvider>
  </LocalizationProvider>

  // <BrowserRouter>
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// render(
//   <LocalizationProvider dateAdapter={MomentUtils}>
//     <QueryClientProvider client={queryClient}>
//       <AppStateProvider>
//         <ThemeProvider theme={theme}>
//           <SnackbarProvider
//             anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//           >
//             <Router>
//               <Home />
//             </Router>
//           </SnackbarProvider>
//         </ThemeProvider>
//       </AppStateProvider>
//     </QueryClientProvider>
//   </LocalizationProvider>,
//   document.getElementById('root')
// )
