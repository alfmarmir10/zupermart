import React from 'react';
import '../../styles/global_styles.css';
import LostImg from '../../assets/img/lost.png';
import { useHistory } from 'react-router';

const Lost = () => {
  const history = useHistory();
  return (
    <div className="lost-main-container">
      <img src={LostImg} alt="Lost icon" className="lost-icon"/>
      <button onClick={()=>history.push('./home')} className="margin-top-md bg-yellow padding-sm border-radious-10px box-shadow-normal width-80percent font-weight-bold font-size-sm">Home</button>
    </div>
  )
}

export default Lost
