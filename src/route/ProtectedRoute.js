import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute =({children})=>{
     const auth =window.localStorage.getItem('token')
     return auth ? children:<Navigate to='/'/>
}


export default ProtectedRoute