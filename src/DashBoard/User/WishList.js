import React, { useContext, useState } from "react";
import axios from "axios";
import { Authcontext } from "../../component/Context/AuthProvider";
import useSeller from "../../UseHooks/UseSeller/UseSeller";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const WishList = () => {
  const { user } = useContext(Authcontext);
  const URL = `https://bike-mart-server-rouge.vercel.app/wishlist?email=${user?.email}`;
  const [wishlist, setWishlist] = React.useState(null);
  const [wish, setWish] = useState("");

  React.useEffect(() => {
    axios.get(URL).then((response) => {
      setWishlist(response.data);
    });
  }, []);

  console.log(wishlist);

  const handleOrder = (data) => {
    console.log(data);

    fetch("https://bike-mart-server-rouge.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWish(data);
        console.log(wish);
        if (data.acknowledged) {
          swal("Order Confirmed");
        } else {
          swal(data.message);
        }
      });
  };

  return (
    <div className="mx-5">
      <h1 className="text-3xl">My Wishlist</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {" "}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Product Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {wishlist &&
              wishlist?.map((SingleWish, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <img className="w-24" src={SingleWish.picture} alt="" />
                  </td>
                  <td>{SingleWish.BikeName}</td>
                  <td>{SingleWish.price}</td>
                  <td>
                    {
                      <button
                        onClick={() => handleOrder(SingleWish)}
                        class="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                      >
                        Order
                      </button>
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
