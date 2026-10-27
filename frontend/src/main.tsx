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
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { Toaster } from "@/components/ui/toast";
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx'
import RerouteAll from './components/auth/RerouteAll.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<RerouteAll/>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/service" element={<ServicePage />} />
                <Route path="/policy" element={<PolicyPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
