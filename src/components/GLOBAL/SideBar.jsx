import React, { useContext, useEffect, useState } from 'react';
import '../../styles/GLOBAL/SideBar.css';
import { Hub } from '@aws-amplify/core';
import { UserContext } from '../../contexts/UserContext';
import { useHistory } from 'react-router';
import Auth from '@aws-amplify/auth';
import Avatar from '../../assets/img/avatar.png'
import Salida from '../../assets/img/salida.png'

const SideBar = () => {
  const [StatusSideBar, setStatusSideBar] = useState(false);
  const {User, setUser} = useContext(UserContext);
  const history = useHistory();

  
  useEffect(() => {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      setUser({Email:user.attributes.email})
      console.log(user);
    })
    .catch(err => {
      console.log(err);
      history.push("./");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  Hub.listen('auth', (data) => {
    // console.log(data);
    switch (data.payload.event) {
      case 'signIn':
          setUser(data.payload.data.attributes.email);
          history.push("./Home");
        break;
      case 'signOut':
          setUser();
          history.push("./");
        break;
      default:
        break;
    }
  });

  function handleStatusSideBar(){
    setStatusSideBar(!StatusSideBar);
  }

  async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

  const SideBarClassName = StatusSideBar ? 'main-container open' : 'main-container';
  return (
    <div className={SideBarClassName}>
      <div className="floating-img-main-container" onClick={handleStatusSideBar}>
        <div className="floating-img-secondary-container" />
      </div>
      <img src={Salida} alt="SingOut img" className="signOut" onClick={signOut}/>
      <div className="content-main-container">
        <img src={Avatar} alt="Avatar img" className="avatar"/>
        {
          User ? (<p className="margin-top-xs color-white font-weight-bold font-size-sm">{User.Email}</p>) : <></>
        }
        <div className="cart-main-container">
          <p className="font-weight-bold  font-size-sm margin-top-xs" >Cart List</p>
          <div className="cart-items-container">

          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
