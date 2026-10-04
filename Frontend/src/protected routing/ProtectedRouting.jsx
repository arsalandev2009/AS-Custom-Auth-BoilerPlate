import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

export function ProtectLogin({children}) {
    const token = localStorage.getItem('token')
    if(!token){
        return children
    }
        return <Navigate to={'/'} replace/>
}

export function ProtectUpdatePassword({children}){
    const otp = sessionStorage.getItem('otp')
    if(!otp){
        return <Navigate to={'/'} replace/>
    }
        return children
}
