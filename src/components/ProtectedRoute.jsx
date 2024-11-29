import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = () => {
  let {user} = useAuth();
  
  return user ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoute