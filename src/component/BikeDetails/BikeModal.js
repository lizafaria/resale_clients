import React, { useContext } from "react";
import swal from "sweetalert";
import { Authcontext } from "../Context/AuthProvider";

const BikeModal = ({ bike, setBike }) => {
  const { user } = useContext(Authcontext);
  const date = new Date().toLocaleString();
  const { title, picture, resale_price, order_id } = bike;

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const order = {
      orderTime: date,
      BikeName: title,
      buyer: name,
      email,
      phone,
      price: resale_price,
      location,
      order_id,
      picture,
    };

    fetch("https://bike-mart-server-rouge.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setBike(null);
          swal("Order Confirmed");
        } else {
          swal(data.message);
        }
      });
  };
  return (
    <div>
      <>
        <input type="checkbox" id="booking-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="booking-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">{title}</h3>
            <form
              onSubmit={handleBooking}
              className="grid grid-cols-1 gap-3 mt-10"
            >
              <input
                name="name"
                type="text"
                defaultValue={user?.displayName}
                disabled
                placeholder="Your Name"
                className="input w-full input-bordered"
              />
              <input
                name="date"
                type="text"
                defaultValue={date}
                disabled
                placeholder="Your Name"
                className="input w-full input-bordered"
              />
              <input
                name="email"
                type="email"
                defaultValue={user?.email}
                disabled
                readOnly
                placeholder="Email Address"
                className="input w-full input-bordered"
              />
              <input
                name="price"
                type="text"
                defaultValue={resale_price}
                disabled
                className="input w-full input-bordered"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="input w-full input-bordered"
              />
              <input
                name="location"
                type="text"
                placeholder="Meeting Location"
                className="input w-full input-bordered"
              />
              <br />
              <input
                className="btn btn-accent w-full"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default BikeModal;
