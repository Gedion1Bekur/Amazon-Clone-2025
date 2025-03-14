import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import styles from "./order.module.css";
import { db } from "../../../Utils/firebase";
import { ParentContext } from "../../DataProvider/DataProvider";
import { Container } from "@mui/material";
import { data } from "react-router-dom";
import ProductsCard from "../../Products/ProductsCard";
import CurrencyForamt from "../../CurrencyFomat/CurrencyForamt";

function Orders() {
  const [{ user,basket }, dispatch] = useContext(ParentContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot({
          next: (snapUpdate) => {
            console.log("Snap received", snapUpdate);

            const orderData = snapUpdate.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }));
            setOrder(orderData);
          },

          error: (snapUpdate) => {
            console.log("Error fetching  received", snapUpdate);
          },
        });
    } else {
      setOrder([]);
    }
  }, [user]);
  console.log(order);
    const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <Layout>
      <section className={styles.container}>
        <div className={styles.order_container}>
          <h2>Your Orders</h2>
          {order?.length==0 && 
          <div style={{padding:"10px"}}>You don't have orders yet</div>}
         

          <div>
         
            {order?.map((singleData, id) => {
              return (
                <div className={styles.Order_product } key={id}>
                  <p>Order id: {singleData.id}</p>

                  <small>
                    Total :
                    <CurrencyForamt amount={singleData.data.amount/100} />
                  </small>
                 

                  {singleData?.data?.basket?.map((order) => (
                    <>
                      <ProductsCard product={order} flex={true} />
                     
                    </>
                  ))}
                  <hr />
                </div>
                
              );
            })}
          </div>
          
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
