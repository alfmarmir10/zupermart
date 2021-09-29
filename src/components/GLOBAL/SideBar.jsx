import React, { useState } from 'react';
import '../../styles/GLOBAL/SideBar.css';

const SideBar = () => {
  const [StatusSideBar, setStatusSideBar] = useState(false);

  function handleStatusSideBar(){
    setStatusSideBar(!StatusSideBar);
  }

  const SideBarClassName = StatusSideBar ? 'main-container open' : 'main-container';
  return (
    <div className={SideBarClassName}>
      <div className="floating-img-main-container" onClick={handleStatusSideBar}>
        <div className="floating-img-secondary-container" />
      </div>
    </div>
  )
}

export default SideBar
