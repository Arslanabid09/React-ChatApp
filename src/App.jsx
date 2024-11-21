import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  
  return (
    <>
    <Routes>
      <Route path='/Room' element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>
      <Route path='/' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default App