import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TesloAppShop } from './TesloAppShop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TesloAppShop />
  </StrictMode>,
)
