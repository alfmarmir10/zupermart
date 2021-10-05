import React, { useContext, useEffect, useState } from 'react';
import '../../styles/GLOBAL/SideBar.css';
import { Hub } from '@aws-amplify/core';
import { UserContext } from '../../contexts/UserContext';
import { useHistory } from 'react-router';
import Auth from '@aws-amplify/auth';
import Avatar from '../../assets/img/avatar.png'
import Salida from '../../assets/img/salida.png'
import Mas from '../../assets/img/mas.png'
import Negative from '../../assets/img/negative.png'
import { CartContext } from '../../contexts/CartContext';
import {AmplifyS3Image} from "@aws-amplify/ui-react";

const SideBar = () => {
  const [StatusSideBar, setStatusSideBar] = useState(false);
  const [Products, setProducts] = useState();
  const {User, setUser} = useContext(UserContext);
  const {cartState, dispatchCart} = useContext(CartContext);
  const history = useHistory();

  // console.log(Products);

  useEffect(() => {
    // setProducts();
    let prodsArray = [];
    const keys = Object.keys(cartState.Products);
    for(let i = 0; i < keys.length; i++){
      prodsArray.push(cartState.Products[keys[i]]);
    }
    setProducts(prodsArray);
  }, [cartState]);

  console.log("Products: "+JSON.stringify(Products));

  useEffect(() => {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      // console.log(user);
      const localUser = JSON.parse(localStorage.getItem("User"));
      if(localUser.Email===user.attributes.email){
        setUser({Email:localUser.Email, TypeUser: localUser.TypeUser});
      }
    })
    .catch(err => {
      console.log(err);
      history.push("./");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
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
        {
          cartState.Amount > 0 ? (
            <div className="floating-cart-amount-badge-container">
              <p className="color-white">{cartState.Amount}</p>
            </div>
          ) : (<></>)
        }
      </div>
      <img src={Salida} alt="SingOut img" className="signOut" onClick={signOut}/>
      <div className="content-main-container">
        <img src={Avatar} alt="Avatar img" className="avatar"/>
        {
          User ? (<p className="margin-top-xs color-white font-weight-bold font-size-sm">{User.Email}</p>) : <></>
        }
        {User && User.TypeUser === "Customer" ? (
          <div className="cart-main-container">
            <p className="font-weight-bold  font-size-sm margin-top-xs" >Cart List</p>
            <div className="cart-items-container">
              {
                Products.map((item)=>{
                  // console.log(item);
                  return (
                    <div className="cart-product-card" key={item.Id}>
                      <AmplifyS3Image imgKey={item.Img} className="cart-product-img"/>
                      <div className="cart-product-info-container">
                        <p className="text-align-center font-weight-bold margin-top-sm">{item.Description}</p>
                        <div className="cart-product-totals-container">
                          <div className="cart-product-total-item-container">
                            <p className="font-weight-thin">{item.Amount}</p>
                            <p className="font-weight-bold">Amount</p>
                          </div>
                          <div className="cart-product-total-item-container">
                            <p className="font-weight-thin">${item.Price}</p>
                            <p className="font-weight-bold">Price</p>
                          </div>
                          <div className="cart-product-total-item-container">
                            <p className="font-weight-thin">${item.Total}</p>
                            <p className="font-weight-bold">Total</p>
                          </div>
                        </div>
                        <div className="add-remove-buttons-container">
                          <img src={Mas}
                            alt="Add item"
                            className='add-remove-button-img'
                            onClick={()=>dispatchCart({
                              type:"ADD_PRODUCT",
                              payload: {
                                id:item.Id,
                                Description: item.Description,
                                Price: item.Price,
                                Amount: 1,
                                Img: item.Img
                              }
                            })}/>
                          <img src={Negative} alt="Remove itemm" className='add-remove-button-img' />
                        </div>
                      </div>
                    </div>
                  )
                })
                // console.log(Products)
              }
            </div>
            <div className="totals-main-container">
              {
                cartState ? (
                  <>
                  <div className="totals-item-container">
                    <p className="font-weight-bold font-size-md">${cartState.Total}</p>
                    <p className="font-weight-bold font-size-sm">Total</p>
                  </div>
                  <div className="totals-item-container">
                    <p className="font-weight-bold font-size-md">{cartState.Amount}</p>
                    <p className="font-weight-bold font-size-sm">Items</p>
                  </div>
                  </>
                ) : (<></>)
              }
              
            </div>
          </div>
        ) : (
          <></>
        )
        }
      </div>
    </div>
  )
}

export default SideBar
