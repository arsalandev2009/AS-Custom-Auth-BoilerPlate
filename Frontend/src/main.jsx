import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './protected routing/Routing'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing/>
  </StrictMode>
)
