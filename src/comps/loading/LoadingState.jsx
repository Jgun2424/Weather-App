import React from 'react'
import { NewtonsCradle } from '@uiball/loaders'


export default function LoadingState() {
  return (
    <div style={{
        display:"flex",
        width:"100%",
        height:"100vh",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        gap:"10px"
    }}>
        <NewtonsCradle size={40} speed={1.4} color="black"/>
        <h1>Fetching Data</h1>
    </div>
  )
}
