import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParentContext } from '../DataProvider/DataProvider'



function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(ParentContext);
    useEffect(()=>{
if(!user){
    navigate("/auth",{state:{msg,redirect}})
}
    },[user])
  return children
}

export default ProtectedRoute


