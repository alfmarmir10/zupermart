import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import Logo from '../assets/img/Logo.png'
import '../styles/global_styles.css';
import '../styles/SignIn/signIn_styles.css';
import SideBar from '../components/GLOBAL/SideBar';
import { startFirebaseUI } from '../firebase/config';


const SignIn = () => {
  const {User, setUser} = useContext(UserContext);
  console.log(User);

  useEffect(() => {
    startFirebaseUI('#firebaseui');
  }, [])

  return (
    <div className="views-main-container">
      <SideBar />
      <img src={Logo} alt="Logo img" className="signin-logo"/>
      <div id="firebaseui"></div>
    </div>
  )
}

export default SignIn
