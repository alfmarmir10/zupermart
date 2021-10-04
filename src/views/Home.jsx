import React, { useContext } from 'react';
import '../styles/global_styles.css';
import '../styles/Home/home_styles.css';
import Sidebar from '../components/GLOBAL/SideBar'
import { UserContext } from '../contexts/UserContext';
import WarehouseIcon from '../assets/img/warehouse.png';
import POSIcon from '../assets/img/shops.png';
import { useHistory } from 'react-router';
import TopBar from '../components/GLOBAL/TopBar';


const Home = () => {
  const {User} = useContext(UserContext);
  const history = useHistory();


  return (
    <div className='views-main-container'>
      <TopBar />
      <Sidebar />
      {
        User && User.TypeUser === "Business" ? (
          <div className="options-main-container">
            <div className="option-card" onClick={()=>history.push('./Warehouse')}>
              <img src={WarehouseIcon} alt='Wahouse Icon' className='option-icon' />
              <p className='font-size-sm font-weight-bold margin-top-xs'>Warehouse</p>
            </div>
            <div className="option-card" onClick={()=>history.push('./Store')}>
              <img src={POSIcon} alt='POS Icon' className='option-icon' />
              <p className='font-size-sm font-weight-bold margin-top-xs'>Store</p>
            </div>
          </div>
        ) : (<></>)
      }
    </div>
  )
}

export default Home
