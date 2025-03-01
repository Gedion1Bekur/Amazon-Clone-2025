import React from "react";
import CarouselEffect from "../../Carousel/CarouselEffect";
import Category from "../../Category/Category";
import Prodcut from "../../Products/Product";
import Layout from '../../Layout/Layout'
function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Prodcut />
    </Layout>
  );
}

export default Landing;
