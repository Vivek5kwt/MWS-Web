import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { token } = useSelector((state: any) => state.auth)
  const localToken = localStorage.getItem('token')

  if (!token && !localToken) return <Navigate to="/" replace />

  return <>{children}</>
}
