import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { API_URL } from '../../../../url';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [seePassword,setSeePassword]=useState(true)
    const [loginData,setLoginData] = useState({email:'',password:''})

    function handleChange(e){
        const tokenFromStorage = localStorage.getItem('token')
        let name = e.target.name;
        let value = e.target.value;
        setLoginData((prev)=>({...prev,[name]:value}))
    }
    async function handleSubmit(e){
        e.preventDefault()
        const response =await fetch(`${API_URL}/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(loginData)
        })
        const data = await response.json()
        if(!response.ok){
            alert(data.message)
            return
        }
        if(data.message.toLowerCase()==='logged in successfully'){
            alert(data.message)
            await localStorage.setItem('token',data.token)
            setLoginData({email:'',password:''})
            navigate('/')
            return
        }
        alert(data.message)
    }

  return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <div><input type="email" onChange={handleChange} name='email' value={loginData.email} placeholder='Enter Your Email' required /></div>

            <label>Password</label>
            <div><input type={seePassword?'password':'text'} onChange={handleChange} name='password' value={loginData.password} placeholder='Enter Your Email' required /> {seePassword ? <FaEye onClick={()=>{setSeePassword(!seePassword)}}/>: <FaEyeSlash onClick={()=>{setSeePassword(!seePassword)}}/>} </div>
            
            <div><Link to={'/forgetpassword'}>Forget Password</Link></div>

            <button type='submit'>Login</button>
            <div><Link to={'/signup'}>Signup</Link></div>
        </form>
    </>
  )
}

export default Login