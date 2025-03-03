import React from "react";

import styles from "./product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyForamt from "../CurrencyFomat/CurrencyForamt";
import { Link, data } from "react-router-dom";
function ProductsCard({ product, renderDesc, flex }) {
  if (!product) {
    return <div>Product not found.</div>;
  }
  const { title, price, id, image, rating } = product;

  const truncat = function (str, n) {
    if (str.length > n) {
      return str.slice(0, n) + "..";
    } else {
      return str;
    }
  };

  return (
    <div
      className={`${styles.Card_container} ${flex && styles.product_flex }`}
    >
        <div className={styles.Card_Image}>
      <Link to={`/products/${id}`}>
        {/* card image here */}
        <img src={image} alt={`product image for ${title} `} loading="eager" />
      </Link>

      </div>
      
      <div className={styles.Card_contsent}>
        <h3>{truncat(`${title}`, 50)}</h3>
        {/* {renderDesc && <div style={{maxWidth:"700px"}}>{description}</div>} */}

        <div className={styles.Card_rating}>
          {rating && (
            <>
              <Rating precision={0.5} value={rating.rate} />

              <small>{rating.count}</small>
            </>
          )}
        </div>
        <div className={styles.Card_price}>
          <p>
            <CurrencyForamt amount={price} />
          </p>
        </div>

        <button>add to cart</button>
      </div>
    </div>
  );
}

export default ProductsCard;
