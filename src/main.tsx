import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import Routing from './app/Routing'
import { ToastContainer, Zoom } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routing />
    <ToastContainer 
    position="bottom-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Zoom}
    />
  </StrictMode>,
)