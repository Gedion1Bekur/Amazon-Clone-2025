import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import ProductUrl from "../../../Api/ednpoints";

import styles from "./productdetail.module.css";
import axios from "axios";
import ProductsCard from "../../Products/ProductsCard";
import Loader from "../../Loader/Loader";
function ProductDetail() {
  const [items, SetItems] = useState({});

  const [isLoding,setisLoading]=useState(false);
  const { productsID } = useParams();
  useEffect(() => {
    try {
      setisLoading(true)
      axios.get(`${ProductUrl}/products/${productsID}`).then((res) => {
        console.log(res.data);
        SetItems(res.data);
        setisLoading(false)
      });
    } catch (error) {
      console.log("i got error ", error);
      setisLoading(false)
    }
  }, []);

  return (
    <Layout>

{isLoding ?(<Loader/>):(

<div className={styles.DetailPage_Container}>

       
<div className={styles.Card_container}>
   <ProductsCard product={items} 
        renderDesc={true}
        flex={true}
  />
</div>

</div>

)}
     
    </Layout>
  );
}

export default ProductDetail;
