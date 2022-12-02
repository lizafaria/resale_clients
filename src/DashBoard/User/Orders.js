import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../../component/Context/AuthProvider";

const Orders = () => {
  const { user } = useContext(Authcontext);
  const url = `http://localhost:5000/orders?email=${user?.email}`;
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-36 h-36 m-auto border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    );
  }
  return (
    <div className="mx-5">
      <h1 className="text-3xl">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {" "}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Product Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders?.map((order, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <img className="w-24" src={order.picture} alt="" />
                  </td>
                  <td>{order.BikeName}</td>
                  <td>{order.price}</td>
                  <td>
                    {order.price && !order.paid && (
                      <Link to={`/dashboard/payment/${order._id}`}>
                        <button className="btn btn-primary btn-xs">Pay</button>
                      </Link>
                    )}
                    {order.price && order.paid && (
                      <span className="text-md">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
