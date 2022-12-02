import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import swal from "sweetalert";
import { Authcontext } from "../../component/Context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(Authcontext);
  const url = `http://localhost:5000/sellersaddedBike?email=${user?.email}`;
  const { data: bikes = [], refetch } = useQuery({
    queryKey: ["bikes", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();

      return data;
    },
  });
  console.log(bikes);
  const handleDelete = (data) => {
    fetch(`http://localhost:5000/sellersaddedBike/${data}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          swal("Deleted Successfully");
        }
      });
  };
  const handleAd = (data) => {
    fetch("http://localhost:5000/ad", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged) {
          swal("This item has been Advertized");
        }
      });
  };
  return (
    <div>
      <h1 className="text-4xl">My Product</h1>
      <div className="mx-5">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {" "}
            <thead>
              <tr>
                <th>SN</th>
                <th>Product Image</th>
                <th>Title</th>
                <th>Availablity</th>
                <th>Manage</th>
                <th>Advertise</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike, i) => (
                <>
                  <tr>
                    <th>{i + 1}</th>
                    <td>
                      <img className="w-24" src={bike.picture} alt="" />
                    </td>
                    <td>"{bike.title}"</td>

                    <td>
                      {bike?.paid && <p>Sold</p>}
                      {!bike?.paid && <p>Avaialble</p>}
                    </td>
                    <td>
                      {
                        <button
                          onClick={() => handleDelete(bike._id)}
                          className="btn btn-secondary btn-xs"
                        >
                          Delete
                        </button>
                      }
                    </td>
                    <td>
                      {
                        <button
                          onClick={() => handleAd(bike)}
                          className="btn btn-primary btn-xs"
                        >
                          Advertise
                        </button>
                      }
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
