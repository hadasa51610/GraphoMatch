import { Provider } from 'react-redux'
import './App.css'
import { Router } from './Router'
import { RouterProvider } from 'react-router'
import { store } from './store/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </>
  )
}

export default App
