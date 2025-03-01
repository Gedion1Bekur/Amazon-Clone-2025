import React from "react";

import styles from "./product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyForamt from "../CurrencyFomat/CurrencyForamt";
function ProductsCard({ product }) {
  const { title, price, image, rating } = product;
  {
    console.log(product);
  }

  const truncat = function (str, n) {
    if (str.length > n) {
      return str.slice(0, n) + "..";
    } else {
      return str;
    }
  };

  return (
    <div className={styles.Card_container}>
      <a href="">
        {/* card image here */}
        <img src={image} alt="" />
      </a>

      <div className={styles.Card_content}>
        <h3>{truncat(`${title}`, 50)}</h3>
        {/* {renderDesc && <div style={{maxWidth:"700px"}}>{description}</div>} */}

        <div className={styles.Card_rating}>
          {/* rating */}
          <Rating precision={0.5} value={rating.rate} />
          {/* count */}

          <small>{product.rating.count}</small>
        </div>
        <div className={styles.Card_price}>
          <p>
            <CurrencyForamt amount={price} />
          </p>
        </div>

        <div>
          <button>add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
