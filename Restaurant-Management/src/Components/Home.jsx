import React from "react";
import { Helmet } from "react-helmet";
import CardsHome from "./CardsHome";
import Review from "./Review.jsx";
import Slider from "./Slider";
import GoogleMappp from "./GoogleMap.jsx";
import CardReview from "./CardReview.jsx";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Resturent || Home</title>
      </Helmet>
      <Slider></Slider>
      <CardsHome></CardsHome>
      <CardReview></CardReview>
      <Review></Review>
      <GoogleMappp></GoogleMappp>

    </div>
  );
};

export default Home;
