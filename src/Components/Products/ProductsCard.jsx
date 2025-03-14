import styles from "./product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyForamt from "../CurrencyFomat/CurrencyForamt";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ParentContext } from "../DataProvider/DataProvider";

import { Type } from "../../Utils/action.type";
function ProductsCard({ product, renderDesc, flex,renderAdd }) {
  const [state, dispatch] = useContext(ParentContext);

  //  console.log('Product:', product);
  //   console.log('RenderDesc:', renderDesc);
  //   console.log('Flex:', flex);

  const { title, price, id, description, image, rating } = product;

  const addToCart = () => {
    if (dispatch) {
      dispatch({
        type: Type.ADD_TO_BASKET,
        item: {
          title,
          price,
          id,
          description,
          image,
          rating,
        },
      });
    }

  };
  const turncate = function (str, n) {
    if (str.length > n) {
      return str.slice(0, n) + "...";
    } else {
      return str;
    }
  };

  return (
    <section className={`${styles.Card_container} ${flex ? styles.Product_flex:''}`}>
      
   
      <Link to={`/products/${id}`}>
        {/* card image here */}
        <img src={image} alt={`product image for ${title} `} loading="eager" />
      </Link>

      <div className={styles.Card_contsent}>
        <h4>{turncate(`${title}`, 50)}</h4>
        {renderDesc && <h5 style={{ maxWidth: "700px" }}>{description}</h5>}

        <div className={styles.Card_rating}>
          {rating && (
            <>
              {/* <Rating addToCartprecision={0.5} value={rating.rate} /> */}
              <Rating precision={0.5} value={rating.rate} />
              <small>{rating.count}</small>
            </>
          )}
        </div>
        <span className={styles.Card_price}>
          <p>
            <CurrencyForamt amount={price} />
          </p>
        </span>
   {renderAdd &&<button onClick={addToCart}>add to cart</button> }
        
      </div>
    
    </section>
  );
}

export default ProductsCard;
