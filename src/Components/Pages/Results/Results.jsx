import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./reuslts.module.css";
import ProductUrl from "../../../Api/ednpoints";
import { useEffect } from "react";
import ProductsCard from "../../Products/ProductsCard";
import Loader from "../../Loader/Loader";
function Results() {
  const [results, setResults] = useState([]);

  const [isLoding, setisLoading] = useState(false);
  const { categoryName } = useParams();

  // console.log(categoryName);
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${ProductUrl}/products/category/${categoryName}`)
      .then((res) => {
        // console.log(res.data);
        setResults(res.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.warn("Hello you have error in here", error);

        setisLoading(false);
      });
  }, []);

  return (
    <Layout>
      <>
        {isLoding ? (
          <Loader />
        ) : (
          <section>
            <h1 style={{ padding: "30px" }}>Results</h1>
            <p style={{ padding: "30px" }}>Category / {categoryName}</p>
            <hr />
            <div className={styles.Product_wrapper}>
              {results?.map((singleProducts) => {
                return (
                  <ProductsCard
                    key={singleProducts.id}
                    product={singleProducts}
                    renderAdd={true}
                  />
                );
              })}
            </div>
          </section>
        )}
      </>
    </Layout>
  );
}

export default Results;
