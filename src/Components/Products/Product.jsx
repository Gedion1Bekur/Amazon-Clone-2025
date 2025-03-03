import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./ProductsCard";
import styles from './product.module.css'
import Loader from "../Loader/Loader";

function Product() {
const [item,setItem]=useState([]);

const [isLoding,setisLoading]=useState(false)
useEffect(()=>{

  
  try {

    setisLoading(true)

   const Requset =axios.get("https://fakestoreapi.com/products")
 .then((res)=>{
    const allProductsData=res.data;
    setItem(allProductsData);
    setisLoading(false)
  
 })
  }catch(error){
 console.log("Hello codder you issue here",error)
 setisLoading(false)
  }
},[])


  return (

  <>
{isLoding ? (<Loader/>):(

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


)}
  
  </>
  );
}

export default Product;
