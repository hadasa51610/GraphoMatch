import './App.css'
// import RootLayout from './Layout'
import { Router } from './Router'
import { RouterProvider } from 'react-router'

function App() {

  return (
    <>
      {/* <RootLayout/> */}
      <RouterProvider router={Router} />
    </>
  )
}

export default App
