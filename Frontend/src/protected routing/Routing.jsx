import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { ProtectLogin,ProtectUpdatePassword } from './ProtectedRouting'
import { ForgetPassword, LandingPage, Login, Signup, UpdatePassword } from '../screens/screens'
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={
          <ProtectLogin>
            <Login/>
          </ProtectLogin>
        }/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/updatepassword' element={
          <ProtectUpdatePassword>
            <UpdatePassword/>
          </ProtectUpdatePassword>
        }/>
      </Routes>
    </BrowserRouter>
      
    
  )
}

export default Routing