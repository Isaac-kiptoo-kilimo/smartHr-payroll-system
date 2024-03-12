import React from 'react';
import './LoadingApp.scss';
import Logo from '../../assets/logo.png'
import LoadingDot from './LoadingDot';


const LoadingApp = () => {
  return (
    <div className="loading">
        <div className="loading-logo">
        <img style={{width: "150px"}} src={Logo} alt="hiphonic App" />
        </div>
        
    <LoadingDot/>
    {/* <p>Loading your chats (1/5)</p> */}
  </div>
  )
}

export default LoadingApp
