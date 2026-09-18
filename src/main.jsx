import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './app.css'
import './enhancements.css'
import './premium-pages.css'
import './small-upgrades.css'

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
