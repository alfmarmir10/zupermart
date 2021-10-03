import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Logo from '../assets/img/Logo.png'
import '../styles/global_styles.css';
import '../styles/SignIn/signIn_styles.css';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';
import { Hub } from '@aws-amplify/core';
import { useHistory } from 'react-router';
import Auth from '@aws-amplify/auth';
import Customer from '../assets/img/customer.png';
import Business from '../assets/img/teamwork.png';



const SignIn = () => {
  const  history = useHistory();
  const {User, setUser} = useContext(UserContext);
  const [TypeUser, setTypeUser] = useState();

  const logoClassName = (TypeUser!==undefined) ? 'signin-logo-small' : 'signin-logo-big';
  const customerClassName = (TypeUser==="Customer") ? 'customer-main-container-small bg-dark-blue flex-column-center' : 'customer-main-container-big flex-column-center';
  const businessClassName = (TypeUser==="Business") ? 'customer-main-container-small bg-dark-blue flex-column-center' : 'customer-main-container-big flex-column-center';
  const typeUserContainerClassName = (TypeUser!==undefined) ? 'type-user-container flex-row-center' : 'type-user-container flex-column-center';

  function selectCustomer(){
    setTypeUser("Customer");
  }
  
  function selectBusiness(){
    setTypeUser("Business");
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      setUser({Email:user.attributes.email})
      history.push("./home");
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
      default:
        break;
    }
  });

  return (
    <div className="views-main-container">
      <img src={Logo} alt="Logo img" className={logoClassName}/>
      <div className="authenticator-container">
        {
          (TypeUser!==undefined)?(
            <AmplifyAuthenticator usernameAlias="email" className="amplify-authenticator">
              <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                  {
                    type: "email",
                    label: "Custom Email Label",
                    placeholder: "Custom email placeholder",
                    inputProps: { required: true, autocomplete: "username" },
                  },
                  {
                    type: "password",
                    label: "Custom Password Label",
                    placeholder: "Custom password placeholder",
                    inputProps: { required: true, autocomplete: "new-password" },
                  },
                  {
                    type: "phone_number",
                    label: "Custom Phone Label",
                    placeholder: "Custom phone placeholder",
                  },
                ]}
                className='amplify-signup'
                />
              <AmplifySignIn slot="sign-in" usernameAlias="email" className='amplify-signin'/>
              </AmplifyAuthenticator>
          ) : (
            <></>
          )
        }
        <div className={typeUserContainerClassName}>
          <div className='flex-column-center margin-top-md'>
            <div className={customerClassName} onClick={selectCustomer}>
              <div className="type-user-img-container flex-column-center">
                <img src={Customer} alt="Customer img" className="type-user-img"/>
              </div>
            </div>
            <p className="font-size-sm font-weight-bold">Customer</p>
          </div>
          <div className='flex-column-center margin-top-md'>
            <div className={businessClassName} onClick={selectBusiness}>
              <div className="type-user-img-container flex-column-center">
                <img src={Business} alt="Customer img" className="type-user-img"/>
              </div>
            </div>
            <p className="font-size-sm font-weight-bold">Business</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn

