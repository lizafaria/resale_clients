import React from "react";
import Advertise from "./Advertise";
import Banner from "./Banner";
import Category from "./Category";
import Footer from "./Footer";
import Trusted from "./Trusted";

const Home = () => {
  return (
    <div className="mx-16">
      <Banner></Banner>
      <Category></Category>
      <Advertise></Advertise>
      <Trusted></Trusted>
      <Footer></Footer>
    </div>
  );
};

export default Home;
