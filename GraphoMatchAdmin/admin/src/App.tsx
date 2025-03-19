import { Provider } from 'react-redux'
import './App.css'
// import RootLayout from './Layout'
import { Router } from './Router'
import { RouterProvider } from 'react-router'
import { store } from './store/store'

function App() {

  return (
    <>
      {/* <RootLayout/> */}
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </>
  )
}

export default App
