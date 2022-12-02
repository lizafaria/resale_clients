import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Bikedetails from "./Bikedetails";
import BikeModal from "./BikeModal";

const Bikes = () => {
  const bikes = useLoaderData();
  const [bike, setBike] = useState(null);
  return (
    <div>
      <div className="grid grid-cols-1 m-5 lg:grid-cols-3 md:grid-cols-2 gap-3">
        {bikes.map((singlebike, i) => (
          <Bikedetails key={i} singlebike={singlebike} setBike={setBike}>
            {" "}
          </Bikedetails>
        ))}

        {bike && <BikeModal bike={bike} setBike={setBike}></BikeModal>}
      </div>
    </div>
  );
};

export default Bikes;
