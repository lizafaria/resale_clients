import React, { useContext, useState } from "react";
import swal from "sweetalert";
import useSeller from "../../UseHooks/UseSeller/UseSeller";
import { Authcontext } from "../Context/AuthProvider";

const Bikedetails = ({ singlebike, setBike }) => {
  const [wishes, setWishes] = useState("");
  const { user } = useContext(Authcontext);
  const [isSeller] = useSeller(user?.email);
  const date = new Date().toLocaleString();
  const {
    category_id,
    category_name,
    title,
    picture,
    Address,
    resale_price,
    buying_price,
    Year_purchase,
    uses_year,
    time,
    Seller_name,
    condition,
    number,
    order_id,
    Verified,
    details,
  } = singlebike;

  const handleWish = (data) => {
    const wishlist = {
      wishlistedTime: date,
      BikeName: data.title,
      buyer: user?.displayName,
      email: user?.email,
      price: data.resale_price,
      wishlistedID: data.bookindId,
      picture: data.picture,
    };

    fetch("http://localhost:5000/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishlist),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          swal("The Item has been wishlisted");
        } else {
          swal(data.message);
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-1">
            <p
              rel="noopener noreferrer"
              href="#"
              className="text-3xl font-semibold"
            >
              {title}
            </p>
          </div>
        </div>
        <div>
          <img
            src={picture}
            alt=""
            className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
          />
          <h2 className="mb-1 text-2xl font-semibold">
            Sell Price: {resale_price}
          </h2>
          <div>
            <h1>
              <span className="font-bold">Category:</span> {category_name}
            </h1>
            <h1>
              <span className="font-bold">Details:</span> {details}
            </h1>
            <h1>
              <span className="font-bold">Seller Name:</span> {Seller_name}
            </h1>
            <h1>
              <span className="font-bold">Condition:</span> {condition}
            </h1>
            <h1>
              <span className="font-bold">Buying Price:</span> {buying_price}
            </h1>
            <h1>
              <span className="font-bold">Sale Price: </span>
              {resale_price}
            </h1>
            <h1>
              <span className="font-bold">Posted Time:</span> {time}
            </h1>
            <h1>
              <span className="font-bold">Year of Purchase:</span>{" "}
              {Year_purchase}{" "}
            </h1>
            <h1>
              <span className="font-bold">Uses:</span> {uses_year}{" "}
            </h1>
            <h1>
              <span className="font-bold">Address:</span> {Address}{" "}
            </h1>
            <h1>
              <span className="font-bold">Number:</span> {number}{" "}
            </h1>
            <h1>
              <span className="font-bold">Seller:</span> {Verified}{" "}
            </h1>
            <h1>
              <span className="font-bold">Order ID:</span> {order_id}{" "}
            </h1>
          </div>
        </div>
        <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {!isSeller && (
            <label
              disabled={singlebike.length === 0}
              htmlFor="booking-modal"
              className="btn  btn-accent text-white"
              onClick={() => setBike(singlebike)}
            >
              Book{" "}
            </label>
          )}
          {!isSeller && (
            <label
              disabled={singlebike.length === 0}
              htmlFor="booking-modal"
              className="btn  btn-accent   text-white"
              onClick={() => handleWish(singlebike)}
            >
              Add To Wishlist{" "}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bikedetails;
