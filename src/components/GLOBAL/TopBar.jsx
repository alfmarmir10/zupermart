import React from 'react';
import '../../styles/GLOBAL/Topbar.css';
import Logo from '../../assets/img/Logo.png'
import { useHistory } from 'react-router';

const TopBar = () => {
  const history = useHistory();
  return (
    <div className="topbar-main-container">
      <img src={Logo} alt="Topbar Logo icon" className="topbar-logo-icon" onClick={()=>history.push('./home')}/>
    </div>
  )
}

export default TopBar
