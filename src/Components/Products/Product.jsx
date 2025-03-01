import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./ProductsCard";
import styles from './product.module.css'

function Product() {
const [item,setItem]=useState([]);
useEffect(()=>{
  try {
   const Requset =axios.get("https://fakestoreapi.com/products")
 .then((res)=>{
    const allProductsData=res.data;
    setItem(allProductsData);
  
 })
  }catch(error){
 console.log("Hello codder you issue here",error)
  }
},[])


  return (

    <section className={styles.Product_Container}>
    <div className={styles.Product_wrapper}>
{
  item?.map((singleProducts)=>{
    return(
      <ProductsCard
        key={singleProducts.id}

        product={singleProducts}
      />
    )
  })
}
  

   
    </div>
    </section>
  );
}

export default Product;
