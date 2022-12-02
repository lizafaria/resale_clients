import { useQuery } from "@tanstack/react-query";

import React, { useContext } from "react";
import swal from "sweetalert";

const AllUsers = () => {
  const URL = `http://localhost:5000/users`;
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["users"],
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
  const handleDelete = (user) => {
    console.log(user);
    fetch(`http://localhost:5000/users/${user}`, {
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
          swal("The user/seller has been deleted successfully");
        }
      });
  };
  return (
    <div>
      <h2 className="text-4xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-secondary btn-xs"
                    >
                      Delete
                    </button>
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

export default AllUsers;
