import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { API_URL } from '../../../../url'
import {useNavigate } from 'react-router-dom'

function UpdatePassword() {
  const navigate = useNavigate()

  const [updatePassword,setUpdatePassword]=useState({email:'',password:'',confirmPassword:''})
  useEffect(()=>{
    setUpdatePassword((prev)=>({...prev,email:sessionStorage.getItem('email')}))
  },[])
  const handleChange=(e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setUpdatePassword((prev)=>({...prev,[name]:value}))
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(updatePassword.password != updatePassword.confirmPassword){
      alert('Passwords Doesnt match')
      return
    }
    const response = await  fetch(`${API_URL}/updatepassword`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:updatePassword.email,password:updatePassword.password})
    })
    if(!response.ok){
      alert('Server Error')
      return
    }
    const data = await response.json()
    if(data.message === 'Password Updated Successfully'){
      alert(data.message)
      navigate('/login')
      return
    }
    alert(data.message)
    // console.log(updatePassword)
  }
  return (
    <>
        <h1>UpdatePassword</h1>
        <form onSubmit={handleSubmit}>
            <label>Password</label>
            <input type="text" placeholder='Enter Your New password' name='password' value={updatePassword.password} onChange={handleChange} required/>
            <label>Confirm Password</label>
            <input type="text" placeholder='Enter Your New password' name='confirmPassword' value={updatePassword.confirmPassword} onChange={handleChange} required />
            <button type='submit'>Update Password</button>
        </form>
    </>
  )
}

export default UpdatePassword