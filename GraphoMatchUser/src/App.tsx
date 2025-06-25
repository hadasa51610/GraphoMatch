import { Provider } from 'react-redux'
import './App.css'
import { Router } from './Router'
import { RouterProvider } from 'react-router'
import { store } from './store/store'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetch('https://graphomatchai.onrender.com/ping')
      .then(() => console.log('Ping sent to Python server'))
      .catch(err => console.error('Ping failed: ', err));
  }, []);
  
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </>
  )
}

export default App
