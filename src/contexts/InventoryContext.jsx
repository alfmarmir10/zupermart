import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { Product } from '../models';

const InventoryContext = React.createContext();

const InventoryContextProvider = ({children}) => {
  const [Inventory, setInventory] = useState();
  const [ChangedProduct, setChangedProduct] = useState();
  
  useEffect(() => {
    try {
      async function fetchProducts(){
        const productsArray = await DataStore.query(Product);
        try {
          setInventory(productsArray);
        } catch (error) {
          console.error(error);
        }
      }
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    try {
      const subscription = DataStore.observe(Product).subscribe(msg => {
        setChangedProduct(msg.element);
      });
      console.log(subscription);
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    let InventoryObj = [];
    if(Inventory!==undefined){
      for(let i = 0; i<Inventory.length;i++){
        if(ChangedProduct.id !== Inventory[i]["id"]){
          InventoryObj.push(Inventory[i]);
        }
      }
      InventoryObj.push(ChangedProduct);
      setInventory(InventoryObj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ChangedProduct]);
  
  const val = {Inventory, setInventory, ChangedProduct, setChangedProduct};
  return (
    <InventoryContext.Provider value={val}>{children}</InventoryContext.Provider>
  )
}

export {InventoryContext};
export default InventoryContextProvider
