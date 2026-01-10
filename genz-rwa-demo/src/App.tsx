import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Learning } from './pages/Learning'
import { LearningLevel } from './pages/LearningLevel'
import { Simulator } from './pages/Simulator'
import { Invest } from './pages/Invest'
import { NotFound } from './pages/NotFound'
import { RequireAuth } from './routes/RequireAuth'
import { HomeRedirect } from './routes/HomeRedirect'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/learning"
          element={
            <RequireAuth>
              <Learning />
            </RequireAuth>
          }
        />
        <Route
          path="/learning/:level"
          element={
            <RequireAuth>
              <LearningLevel />
            </RequireAuth>
          }
        />
        <Route
          path="/simulator"
          element={
            <RequireAuth>
              <Simulator />
            </RequireAuth>
          }
        />
        <Route
          path="/invest"
          element={
            <RequireAuth>
              <Invest />
            </RequireAuth>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
