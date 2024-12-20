import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  
  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute/>}>
      <Route path='/Room' element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>
      </Route>
      <Route path='/' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path={'/*'} element={<>
      <div className='flex flex-col gap-y-5 justify-center items-center h-screen bg-black text-white'>
      <h1 className='font-extrabold text-9xl'>4<span className=' top-80 text-8xl'>😓</span>4</h1>
        <span className='text-xl font-semibold'>page not found</span>
        <Link to={'/Room'} className='bg-white text-black px-5 py-1 font-semibold'>Go back...</Link>
      </div>
        </>}/>
    </Routes>
    </>
  )
}

export default App