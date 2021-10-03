import { DataStore, API, graphqlOperation, Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import SideBar from '../components/GLOBAL/SideBar'
import { Product } from '../models';
import { createProduct } from "../graphql/mutations";
import { AmplifyPhotoPicker, AmplifyS3ImagePicker } from '@aws-amplify/ui-react';

const Home = () => {
  const [ProductImg, setProductImg] = useState();
  const [ProductImgKey, setProductImgKey] = useState();

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

  // useEffect(() => {
  //   async function createNewProduct() {
  //     const productObj = {
  //       Stock: 0,
  //       Description: 'Fabuloso Lavanda 1 lt',
  //       Units: "1",
  //       Presentation : "lt"
  //     };
    
  //     return await API.graphql(graphqlOperation(createProduct, { input: productObj }));
  //   }
  //   createNewProduct();
  // }, []);
  function handleChange(event) {
    setProductImg(URL.createObjectURL(event.target.files[0]))
  }

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const imgUploadKey = await Storage.put(file.name, file, {
        contentType: 'image/png' // contentType is optional
      });
      setProductImgKey(imgUploadKey);
      console.log(imgUploadKey);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  return (
    <div className="views-main-container">
      <SideBar />
      <p>Home</p>
      {/* <AmplifyPhotoPicker preview="hidden" onLoad={dataURL => console.log(dataURL)} /> */}
      {/* <AmplifyS3ImagePicker track picker onChange={data => console.log(data)} /> */}
      {/* <input type="file" onChange={handleChange}/>
      <img src={ProductImg} alt="Product img"/> */}
      <input
        type="file"
        onChange={onChange}
      />
    </div>
  )
}

export default Home
