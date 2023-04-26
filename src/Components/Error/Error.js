import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
        <h1 style={{textAlign:"center",fontSize:"60px" , marginTop:"100px"}}>Error 404</h1>
        <h2 style={{textAlign:"center", fontSize:"24px"}}>Page Not Found</h2>
        <p style={{textAlign:"center", fontSize:"20px", color:"#333",marginTop:"20px", textDecoration:"none",}}><Link to="/shop">Return to Shop</Link> </p>
    </div>
  )
}

export default Error