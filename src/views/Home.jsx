import React, { useContext, useEffect, useState } from 'react';
import '../styles/global_styles.css';
import '../styles/Home/home_styles.css';
import Sidebar from '../components/GLOBAL/SideBar'
import { UserContext } from '../contexts/UserContext';
import WarehouseIcon from '../assets/img/warehouse.png';
import POSIcon from '../assets/img/shops.png';
import Outofstock from '../assets/img/out-of-stock.png';
import TopBar from '../components/GLOBAL/TopBar';
import { CartContext } from '../contexts/CartContext';
import { InventoryContext } from '../contexts/InventoryContext';
import {AmplifyS3Image} from "@aws-amplify/ui-react";
import { DataStore } from 'aws-amplify';
import { Product } from '../models';
import { useHistory } from 'react-router';

// import {Storage} from 'aws-amplify';


const Home = () => {
  const {User} = useContext(UserContext);
  const {dispatchCart} = useContext(CartContext);
  const {Inventory} = useContext(InventoryContext);
  const [ProductToAdd, setProductToAdd] = useState();
  const history = useHistory();

  // console.log(Inventory);

  useEffect(() => {
    if(ProductToAdd!==undefined){
      async function addProduct(item){
        const original = await DataStore.query(Product, item.id);

        if(original.Stock>0){
          await DataStore.save(
            Product.copyOf(original, updated => {
              updated.Stock = original.Stock - 1;
            })
          );
      
          dispatchCart({
            type:"ADD_PRODUCT",
            payload: {
              id:item.id,
              Description: item.Description,
              Price: item.Price,
              Amount: 1,
              Img: item.Img
            }
          })  
        }
    
      }
      addProduct(ProductToAdd)  
    }
  }, [ProductToAdd]);

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
        ) : (
          <div className="products-cards-main-container">
            {
              Inventory && Inventory.map((item)=>{
                return(
                  <div className="product-card" key={item.id}>
                    <AmplifyS3Image imgKey={item.Img} className='product-img'/>
                    <p className="font-weight-bold font-size-sm margin-top-sm">{item.Description}</p>
                    <p className='font-weight-thin font-size-sm margin-top-sm'>${item.Price}</p>
                    <button 
                      className='padding-xs width-80percent bg-yellow font-size-sm margin-top-sm margin-bottom-sm box-shadow-normal font-weight-bold border-radious-5px'
                      onClick={()=>{
                        setProductToAdd(item)
                      }}>Add to cart</button>
                    {
                      (item.Stock === 0) ? <img src={Outofstock} alt="OutofStock img" className="out-stock-img" /> : <></>
                    }
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Home
