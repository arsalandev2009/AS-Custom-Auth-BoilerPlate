import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";

function LandingPage() {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=>{navigate('/login')}}>Login</button>
        <button onClick={()=>{navigate('/signup')}}>Signup</button>
    </div>
  )
}

export default LandingPage