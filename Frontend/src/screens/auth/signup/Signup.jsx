import React, { useState } from 'react'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { API_URL } from '../../../../url';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

    const navigate  = useNavigate()

    const [signupData,setSignupData]=useState({name:'',email:'',password:''})
    const [seePassword,setSeePassword] = useState(true)

    function handleChange(e){
        let value = e.target.value;
        let name = e.target.name;
        setSignupData((prev)=>({...prev,[name]:value}))
    }
    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch(`${API_URL}/signup`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(signupData)
        })
    //    console.log(response)
        const data = await response.json()
        if(!response.ok){
            alert(data.message)
            return
        }
        if(data.message.toLowerCase() === 'user created successfully'){
            alert(data.message)    
            setSignupData({name:'',email:'',password:''})
            navigate('/login')
            return
        }
        alert(data.message)    
    }
  return (
    <>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <div><input type="text" onChange={handleChange} name='name' placeholder='Enter Your name' required/></div>

            <label>Email</label>
            <div><input type="email" onChange={handleChange} name='email' placeholder='Enter Your Email' required/></div>

            <label>Password</label>
            <div><input type={seePassword?'password':'text'} onChange={handleChange} name='password' placeholder='Enter Your Password' required/> {seePassword ?  <FaEye onClick={()=>{setSeePassword(!seePassword)}}/> :<FaEyeSlash  onClick={()=>{setSeePassword(!seePassword)}}/>} </div>
            
            <div><Link to={'/login'}>Login</Link></div>

            <button type='submit'>Signup</button>
        </form>
    </>
  )
}

export default Signup