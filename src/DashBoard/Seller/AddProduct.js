import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Authcontext } from "../../component/Context/AuthProvider";
import useTokens from "../../UseHooks/UseTokens/UseTokens";

const AddProduct = () => {
  const { user } = useContext(Authcontext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [cratedUseremail, setCratedUseremail] = useState("");
  //   const [token] = useTokens(cratedUseremail);
  const date = new Date().toLocaleString();
  //   if (token) {
  //     navigate(from, { replace: true });
  //   }

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //   const imagekey = "5e9d622f2af7a9a25454b40e0e992056";

  const handleAddProdut = (data) => {
    console.log(data);
    const img = data.picture[0];
    console.log(img);
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=5e9d622f2af7a9a25454b40e0e992056`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          console.log(imageData.data.url);
          const newAddedBike = {
            category_id: data.category_id,
            category_name: data.category_name,
            title: data.title,
            picture: imageData.data.url,
            Address: data.Address,
            resale_price: data.resale_price,
            buying_price: data.buying_price,
            Year_purchase: data.Year_purchase,
            uses_year: data.uses_year,
            time: date,
            Seller_name: data.Seller_name,
            condition: data.condition,
            number: data.number,
            details: data.details,
            order_id: data.order_id,
            email: user.email,
          };

          fetch("http://localhost:5000/sellerbikes", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(newAddedBike),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.acknowledged) {
                swal("Bike has been added");
                navigate(from, { replace: true });
              }
            });
        }
      });
  };

  return (
    <div className="m-10">
      <div className="h-1/2 flex justify-center items-center">
        <div className="w-2/3 lg:w-1/2 p-7 rounded-lg border">
          <h2 className="text-xl text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(handleAddProdut)}>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Product Name is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Brand</span>
              </label>
              <select
                className="input input-bordered w-full "
                {...register("category_name")}
              >
                <option disabled>Choose one of the category</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Suzuki">Suzuki</option>
                <option value="TVS">TVS</option>
              </select>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Category ID:</span>
              </label>
              <select
                className="input input-bordered w-full "
                {...register("category_id")}
              >
                <option disabled>Choose one of the category</option>
                <option value="01">Yamaha </option>
                <option value="02">Suzuki</option>
                <option value="03">TVS</option>
              </select>
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Picture</span>
              </label>
              <input
                type="file"
                {...register("picture", {
                  required: "Picture is Required",
                })}
                className="input  w-full file-input file-input-bordered file-input-md  "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                {...register("Address", {
                  required: "Address is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Shop Name</span>
              </label>
              <input
                type="text"
                {...register("Seller_name", {
                  required: "Seller_name is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Booking ID</span>
              </label>
              <input
                type="text"
                {...register("order_id", {
                  required: "order_id is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Sale Price</span>
              </label>
              <input
                type="text"
                {...register("resale_price", {
                  required: "Sale Price is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Buying Price</span>
              </label>
              <input
                type="text"
                {...register("buying_price", {
                  required: "Buying Price is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Purchase Year</span>
              </label>
              <input
                type="text"
                {...register("Year_purchase", {
                  required: "Year_purchase is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">
                  How many years you have used?
                </span>
              </label>
              <input
                type="text"
                {...register("uses_year", {
                  required: "uses_year is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Condition</span>
              </label>
              <input
                type="text"
                {...register("condition", {
                  required: "condition is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Number</span>
              </label>
              <input
                type="text"
                {...register("number", {
                  required: "Number is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-">
              <label className="label">
                {" "}
                <span className="label-text">Details</span>
              </label>
              <input
                type="text"
                {...register("details", {
                  required: "Details is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <input
              className="btn btn-accent w-full mt-4"
              value="Add Product"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
