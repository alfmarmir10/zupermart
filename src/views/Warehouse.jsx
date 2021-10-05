import { Storage, API,  graphqlOperation } from 'aws-amplify';
import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../components/GLOBAL/SideBar'
import Topbar from '../components/GLOBAL/TopBar'
// import { Product } from '../models';
import '../styles/global_styles.css';
import '../styles/Warehouse/warehouse_styles.css';
import Plus from '../assets/img/plus.png';
import Close from '../assets/img/cancel.png';
import { createProduct } from "../graphql/mutations";
import { UserContext } from '../contexts/UserContext';

import $ from 'jquery';

import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import Lost from '../components/GLOBAL/Lost';
import { InventoryContext } from '../contexts/InventoryContext';

const Warehouse = () => {
  const {User} = useContext(UserContext);
  const {Inventory} = useContext(InventoryContext);
  const [ShowAddProduct, setShowAddProduct] = useState(false);
  const [ProductToAdd, setProductToAdd] = useState();
  const [ProductToAddImg, setProductToAddImg] = useState();

  const AddProductMenuClassName = (ShowAddProduct === true) ? 'add-product-menu-main-container opened' : 'add-product-menu-main-container';

  useEffect(() => {
    if(Inventory !== undefined){
      $('#inventory').DataTable({
        retrieve: true
      });
    }
  }, [Inventory]);

  async function addProduct(){
    const inputs = document.getElementsByClassName('input-add-product');
    for(let i = 0; i<inputs.length; i++){
      if(inputs[i].value === ""){
        alert("All inputs are required.");
        return
      }
    }
    if(ProductToAddImg===undefined){
      alert("The image is required");
      return
    }
    let imgUploadKey;
    try {
      imgUploadKey = await Storage.put(`${document.getElementsByName('prod-description')[0].value}.png`, ProductToAddImg, {
        contentType: 'image/png' // contentType is optional
      });
      // setProductImgKey(imgUploadKey);
      console.log(imgUploadKey);
    } catch (error) {
      alert('Error uploading file: ', error);
      return
    }  

    setProductToAdd({
      Description: document.getElementsByName('prod-description')[0].value,
      Presentation: document.getElementsByName('prod-presentation')[0].value,
      Units: document.getElementsByName('prod-units')[0].value,
      Price: document.getElementsByName('prod-price')[0].value,
      Img: imgUploadKey.key
    });
  }
  // console.log(ProductToAdd);

  useEffect(() => {
    if(ProductToAdd !== undefined){
      async function createNewProduct() {
        let productObj = {
          Stock: 0,
          Description: ProductToAdd.Description,
          Presentation: ProductToAdd.Presentation,
          Units: ProductToAdd.Units,
          Price: ProductToAdd.Price,
          Img: ProductToAdd.Img
        };
      
        await API.graphql(graphqlOperation(createProduct, { input: productObj }));
        closeAddProduct();
        setProductToAdd();
      }
      createNewProduct();
    }
  }, [ProductToAdd]);

  function showAddProduct(){
    setShowAddProduct(true);
  }
  
  function closeAddProduct(){
    setShowAddProduct(false);
    const inputs = document.getElementsByClassName('input-add-product');
    for(let i = 0; i<inputs.length; i++){
      inputs[i].value = "";
    }
    setProductToAddImg();
  }

  async function onChange(e) {
    const file = e.target.files[0];
    console.log(file);
    setProductToAddImg(file);
    return
  }

  return (
    <div className="views-main-container">
      <Topbar />
      <SideBar />
      {
        User && User.TypeUser === "Business" ? (
          <div className='warehouse-content-container'>
            <div className="table-container">
              <table id="inventory" className="display" style={{width: '100%'}}>
                <thead className='margin-top-xs'>
                    <tr className='bg-dark-blue color-white'>
                        <th>Description</th>
                        <th>Presentation</th>
                        <th>Units</th>
                        <th>Stock</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    Inventory && Inventory.map((item)=>{
                      return(
                        <tr key={item.id}>
                          <td className='font-weight-bold font-size-xs'>{item.Description}</td>
                          <td className="font-size-xs text-align-center">{item.Presentation}</td>
                          <td className="font-size-xs text-align-center">{item.Units}</td>
                          <td className="font-size-xs text-align-center">{item.Stock}</td>
                          <td className="font-size-xs text-align-center">${item.Price}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
                <tfoot>
                    <tr className='bg-dark-blue color-white'>
                      <th>Description</th>
                      <th>Presentation</th>
                      <th>Units</th>
                      <th>Stock</th>
                      <th>Price</th>
                    </tr>
                </tfoot>
              </table>
            </div>
            <div className="bottom-menu" onClick={showAddProduct}>
                <img src={Plus} alt="Add icon" className='add-product-icon'/>
                <p className='font-size-sm font-weight-bold'>Add new product</p>
            </div>
            <div className={AddProductMenuClassName}>
              <div className="add-product-menu">
                  <img src={Close} alt="Close icon" className="close-icon" onClick={closeAddProduct}/>
                  <p className="font-weight-bold font-size-md margin-top-sm">Add New Product</p>
                  <form className='form-add-product margin-top-md'>
                    {
                      (ProductToAddImg) ? (
                        <img src={URL.createObjectURL(ProductToAddImg)} alt="Product img" className="product-img"/>
                      ) : (<></>)
                    }
                    <input type="file" onChange={onChange} className='width-80percent'/>
                    <input name="prod-description" type="text" placeholder="Ex: Coca Cola 600 ml" className="font-size-sm margin-top-sm width-80percent text-align-center input-add-product"/>
                    <label htmlFor="prod-description" className="font-weight-bold font-size-xs margin-top-xs">Description</label>
                    <input name="prod-presentation" type="text" placeholder="Ex: 600, 1, 2.5" className="font-size-sm margin-top-sm width-80percent text-align-center input-add-product"/>
                    <label htmlFor="prod-presentation" className="font-weight-bold font-size-xs margin-top-xs">Presentation</label>
                    <input name="prod-units" type="text" placeholder="Ex: ml, lt, pz" className="font-size-sm margin-top-sm width-80percent text-align-center input-add-product"/>
                    <label htmlFor="prod-units" className="font-weight-bold font-size-xs margin-top-xs">Units</label>
                    <input name="prod-price" type="text" placeholder="" className="font-size-sm margin-top-sm width-80percent text-align-center input-add-product"/>
                    <label htmlFor="prod-price" className="font-weight-bold font-size-xs margin-top-xs">Price</label>
                  </form>
                  <button className='add-product-button font-weight-bold font-size-sm color-white' onClick={addProduct}>Add</button>
              </div>
            </div>
          </div>
        ) : (          
          <Lost />            
        )
      }
    </div>
  )
}

export default Warehouse
