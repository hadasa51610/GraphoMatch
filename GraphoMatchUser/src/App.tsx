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
      .catch(err => console.error('Ping Python failed: ', err));
      fetch('https://graphomatchserver.onrender.com/api/Auth/ping')
      .then(() => console.log('Ping sent to C# server'))
      .catch(err => console.error('Ping C# failed: ', err));
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
