import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
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
import GuestRoute from './components/auth/GuestRoute.tsx'
import InterviewPage from './pages/InterviewPage/InterviewPage.tsx'
import ReviewPage from './pages/ReviewPage/ReviewPage.tsx'
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
            <Route element={<RerouteAll />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/service" element={<ServicePage />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/interview/:id" element={<InterviewPage />} />
              <Route path="/review/:id" element={<ReviewPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
          </Routes>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
