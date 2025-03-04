import React, { useContext } from "react";
import Layout from "../../Layout/Layout";
import { ParentContext } from "../../DataProvider/DataProvider";
import ProductsCard from "../../Products/ProductsCard";
import { Link } from "react-router-dom";
import styles from "./cart.module.css";
import CurrencyForamt from "../../CurrencyFomat/CurrencyForamt";

import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";


import { Type } from "../../../Utils/action.type";

function Cart() {
  const [{ basket }, dispatch] = useContext(ParentContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

   const incremnet=(item)=>{
    dispatch({
     type:Type.ADD_TO_BASKET,
     item
    })
   }
   const decrement=(id)=>{
dispatch({
  type:Type.REMOVE_FROM_BASKET,
  id
})
   }
  console.log(basket);
  return (
    <Layout>
      <section className={styles.container}>
        <div className={styles.cart_container}>
          <h3>My Shop</h3>

          <hr />

          {basket?.length == 0 ? (
            <h2>Your Shop is empty</h2>
          ) : (
            basket?.map((item, id) => {
              return (
                <section  className={styles.cart_product}>
                  <ProductsCard
                    product={item}
                    key={id}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />

              <div className={styles.cart_btn}>
                <button className={styles.btn} onClick={()=>incremnet(item)}><IoIosArrowUp size={25}/></button>

                <span>{item.amount}</span>
                <button  className={styles.btn} onClick={()=>decrement(item.id)}><IoIosArrowDown size={25}/></button>
              </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>subtotal ({basket?.length} items)</p>
              <CurrencyForamt amount={total} />
             
            </div>
            <span><input type="text" placeholder=" Apply Promo code" /></span>
           
            <span>
              <div>
                <input type="checkbox" />
                <small> This order cotains a gift</small>

                
              </div>
             
            </span>

            <Link to="./payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
