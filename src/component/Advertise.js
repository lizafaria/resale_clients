import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import swal from "sweetalert";
import useAdmin from "../UseHooks/USeAdmin/UseAdmin";
import useSeller from "../UseHooks/UseSeller/UseSeller";
import { Authcontext } from "./Context/AuthProvider";

const Advertise = () => {
  const { user } = useContext(Authcontext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const URL = `https://bike-mart-server-rouge.vercel.app/ad`;
  const { data: advertise = [] } = useQuery({
    queryKey: ["ad"],
    queryFn: async () => {
      const res = await fetch(URL, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();

      return data;
    },
  });

  const handleWish = (datas) => {
    console.log(datas);
    fetch("https://bike-mart-server-rouge.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datas),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          swal("The Item has been Wishlisted");
        } else {
          swal(data.message);
        }
      });
  };
  return (
    <div>
      <div className="App">
        <h1 className="text-5xl font-bold">Advertisements</h1>
      </div>
      {advertise.map((item, i) => (
        <div key={i}>
          <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-1">
                <p
                  rel="noopener noreferrer"
                  href="#"
                  className="text-3xl font-semibold"
                >
                  {item.title}
                </p>
              </div>
            </div>
            <div>
              <img
                src={item.picture}
                alt=""
                className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
              />
              <h2 className="mb-1 text-2xl font-semibold">
                Sell Price: {item.resale_price}
              </h2>
              <div>
                <h1>
                  <span className="font-bold">Category:</span>{" "}
                  {item.category_name}
                </h1>
                <h1>
                  <span className="font-bold">Details:</span> {item.details}
                </h1>
                <h1>
                  <span className="font-bold">Seller Name:</span>{" "}
                  {item.Seller_name}
                </h1>
                <h1>
                  <span className="font-bold">Condition:</span> {item.condition}
                </h1>
                <h1>
                  <span className="font-bold">Buying Price:</span>{" "}
                  {item.buying_price}
                </h1>
                <h1>
                  <span className="font-bold">Sale Price: </span>
                  {item.resale_price}
                </h1>
                <h1>
                  <span className="font-bold">Posted Time:</span> {item.time}
                </h1>
                <h1>
                  <span className="font-bold">Year of Purchase:</span>{" "}
                  {item.Year_purchase}{" "}
                </h1>
                <h1>
                  <span className="font-bold">Uses:</span> {item.uses_year}{" "}
                </h1>
                <h1>
                  <span className="font-bold">Address:</span> {item.Address}{" "}
                </h1>
                <h1>
                  <span className="font-bold">Number:</span> {item.number}{" "}
                </h1>
                <h1>
                  <span className="font-bold">Seller:</span> {item.Verified}{" "}
                </h1>
                <h1>
                  <span className="font-bold">Order ID:</span> {item.order_id}{" "}
                </h1>
              </div>
            </div>
            <div className="grid justify-center grid-cols-1 ">
              {!isSeller && !isAdmin && (
                <label
                  disabled={item.length === 0}
                  htmlFor="booking-modal"
                  className="btn  btn-accent text-white"
                  onClick={() => handleWish(item)}
                >
                  Add to WishList{" "}
                </label>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Advertise;
