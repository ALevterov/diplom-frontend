import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/router'
import { store } from './store'
import AuthProvider from './components/AuthProvider'
import Snackbar from './components/Snackbar'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Snackbar />
    </Provider>
  )
}

export default App
