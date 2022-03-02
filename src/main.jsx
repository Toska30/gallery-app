import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import AuthContextProvider from './contexts/AuthContext'
import "./assets/scss/App.scss"
import { QueryClient, QueryClientProvider } from 'react-query'
import SimpleReactLightbox from 'simple-react-lightbox'
import PhotoContextProvider from './contexts/PhotoContext'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 2, // 2 minutes
			cacheTime: 1000 * 60 * 60 * 4, // 4 hours
		},
	},
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
        <BrowserRouter>
            <AuthContextProvider>
                <PhotoContextProvider>
                    <SimpleReactLightbox>
                        <App />
                    </SimpleReactLightbox>
                </PhotoContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)