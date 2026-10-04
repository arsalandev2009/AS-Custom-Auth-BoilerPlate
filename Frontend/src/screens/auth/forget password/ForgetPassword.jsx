import React, { useState } from 'react'
import { API_URL } from '../../../../url'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {
    const [email,setEmail]=useState('')
    const [otp,setOtp]=useState('')
    const [otpInput,setOtpInput]=useState(false)
    const [sendingEmail,setSendingEmail]=useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setSendingEmail(true)
        sessionStorage.setItem('email',email)
        sessionStorage.setItem('otp',otp)
        if(!otpInput){
            const response = await fetch(`${API_URL}/forgetpassword`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email})
        })
        const data = await response.json()
        if(!response.ok){
            alert(data.message)
            return
        }
        if(data.message === 'Reset Password Otp Send to your email'){
            alert(data.message)
            setOtpInput(true)
            return
        }
        alert(data.message)
        return
        }
        const response = await fetch(`${API_URL}/otp`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,otp})
        })
        if(!response.ok){
            alert('Server Error')
            return
        }
        const data =await response.json()
        if(data.message === 'All done plz Update Your password'){
            alert('Otp Verify Successfully!')
            navigate('/updatepassword')
            return
        }
        alert(data.message);
        // navigate('/updatepassword')
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Forget Password</h1>
            <label>Email</label>
            <input type="email" placeholder='Enter Your Email' value={email}  onChange={(e)=>{setEmail(e.target.value)}} required disabled={otpInput}/>
            {otpInput ? 
                <>
                    <input type="number" placeholder='Enter Your otp' value={otp} onChange={(e)=>{setOtp(e.target.value)}} required/>
                    <button type='submit'>Verify Otp</button>
                </>:
                <button type='submit' disabled={sendingEmail}>{sendingEmail ? 'Sending OTP...':'Send Otp'}</button>
            }
        </form>
    </div>
  )
}

export default ForgetPassword