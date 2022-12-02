import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const { data: bikes = [], refetch } = useQuery({
    queryKey: ["bikes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/bikes");
      const data = await res.json();
      return data.slice(0, 3);
    },
  });

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Categories</h1>
      <div className="m-16 grid gap-5 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {bikes.map((bike, i) => (
          <div key={i}>
            <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden border-primary  rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
              <div className="ring-2 rounded p-3">
                <img
                  src={bike.picture}
                  alt=""
                  className="object-cover ring-1 rounded w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                />
                <h2 className="mb-1 content-center text-3xl font-semibold">
                  {bike.category_name}
                </h2>
                <div class="gridjustify-center mt-3 item-center">
                  <Link to={`/bikes/${bike.category_id}`}>
                    <button class="px-5 w-full text-xl py-4  font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                      See Products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
