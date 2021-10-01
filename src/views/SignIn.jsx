import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import Logo from '../assets/img/Logo.png'
import '../styles/global_styles.css';
import '../styles/SignIn/signIn_styles.css';
// import SideBar from '../components/GLOBAL/SideBar';
import { DataStore } from '@aws-amplify/datastore';
import { Product } from '../models/index.js';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';
import { Hub } from '@aws-amplify/core';
import { useHistory } from 'react-router';



const SignIn = () => {
  const  history = useHistory();

  const {User, setUser} = useContext(UserContext);

  console.log(User);

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
  // useEffect(() => {
  //   try {
  //     async function saveProduct(){
  //       await DataStore.save(
  //         new Product({
  //           Description: "Coca cola 600 ml",
  //           Units: "600",
  //           Presentation: "ml",
  //           Stock: 1
  //         })
  //       );
  //       console.log("Product saved successfully!");
  //     }
  //     saveProduct();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  
  useEffect(() => {
    try {
      async function fetchProducts(){
        const models = await DataStore.query(Product);
        console.log(models);
      }
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="views-main-container">
      <img src={Logo} alt="Logo img" className="signin-logo"/>
      <div className="authenticator-container" >
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
      </div>
    </div>
  )
}

export default SignIn

