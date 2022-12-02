import React from "react";
import pic1 from "../assets/pic1.gif";
import pic2 from "../assets/pic2.gif";
import Pic3 from "../assets/Pic3.gif";

const Banner = () => {
  return (
    <div>
      <div className="carousel h-80">
        <div id="item1" className="carousel-item w-full">
          <img src={pic1} alt="" className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src={pic2} alt="" className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src={Pic3} alt="" className="w-full" />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
      </div>
    </div>
  );
};

export default Banner;
