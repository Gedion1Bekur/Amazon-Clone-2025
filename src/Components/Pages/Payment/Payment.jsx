import React, { useContext, useState } from "react";
import Layout from "../../Layout/Layout";
import styles from "./paymnet.module.css";
import ProductsCard from "../../Products/ProductsCard";
import { ParentContext } from "../../DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import CurrencyForamt from "../../CurrencyFomat/CurrencyForamt";
import { db } from "../../../Utils/firebase";

import { axiosInstance } from "../../../Api/axios";
import { useNavigate } from "react-router-dom";
import { Type } from "../../../Utils/action.type";
function Payment() {
  const [{ user, basket }, dispatch] = useContext(ParentContext);
  const [carderror, setCardError] = useState(null);

  const [processing, SetProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(user);
  //here im writting to controll the error
  const handleChange = (e) => {
    if (e.error) {
      setCardError(e.error.message);
    } else {
      setCardError("");
    }
  };

  //two stpe here in order to accpet paymet

  const handlePayment = async (e) => {
    // e.preventDefault();

    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    try {
      SetProcessing(true);
      //!1 backend or  functions _>contact to client secret
      const response = await axiosInstance({
        method: "POST",
        url: `payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.client_secret;

      if (!clientSecret) {
        //in herre we need to check if they didnot pass the clientSecret
        console.error(" Error: Client secret is undefined!");
        return;
      }
      console.log("Client Secret:", clientSecret);
      //!2.client side confirmation show user paid

      //stripe hook used for confirmation
      // const confirmation = await stripe.confirmPayment(

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // console.log(paymentIntent);
      // if (paymentIntent.error) {
      //     console.error("Payment failed:",error.message);
      //     setCardError(paymentIntent.error.message);
      // } else {
      //     console.log("Payment successful!", paymentIntent);
      // }
      navigate("/orders", { state: { msg: "you have placed new Order" } });
      dispatch({
        type: Type.EMPTY_BASKET,
      });
      // console.warn(basket)

      SetProcessing(false);
    } catch (error) {
      console.error("Payment error:", error.message);
      setCardError(error.message);
      SetProcessing(false);
    }
  };
  return (
    <Layout>
      {/* this div show header for the paymnet  */}
      <div className={styles.payment_header}>
        Secure checkout({totalItem}items)
      </div>

      {/* section below shows paymnet method */}
      <section className={styles.payment}>
        <div className={styles.payment_flex}>
          {/* address */}
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>

            <div> centrum , Budwloana</div>
            <div> Warsaw,Masssovin</div>
          </div>
        </div>

        <hr />
        <div className={styles.payment_flex}>
          {/* choosen product */}
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item, id) => (
              <ProductsCard product={item} flex={true} key={id} />
            ))}
          </div>
        </div>

        <hr />
        <div className={styles.payment_flex}>
          {/* card detail */}

          <h3>Payment Methods </h3>

          {/* i have learned  difrent paymet method i react like stripe ,square */}
          <div className={styles.payment_Card_containetr}>
            <div className={styles.payment_detail}>
              <form onSubmit={handlePayment}>
                {/* errror */}
                {carderror && (
                  <small style={{ color: "red" }}>{carderror}</small>
                )}

                <CardElement onChange={handleChange} />

                {/* price */}

                <div className={styles.payment_price}>
                  <div>
                    <span>
                      Total Order | <CurrencyForamt amount={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div className={styles.Payment_loder}>
                        <ClipLoader size={13} />
                        <p>Please waite...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
