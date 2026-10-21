import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'
import DashboardPage from './pages/DashboardPage/DashboardPage.tsx'
import ServicePage from './pages/ServicePage/ServicePage.tsx'
import PolicyPage from './pages/PolicyPage/PolicyPage.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/policy" element={<PolicyPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
