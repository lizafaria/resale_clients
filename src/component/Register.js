import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useTokens from "../UseHooks/UseTokens/UseTokens";
import { Authcontext } from "./Context/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, signinGoogle, setLoading } =
    useContext(Authcontext);
  const [signUpError, setSignUPError] = useState("");
  const navigate = useNavigate();
  const [cratedUseremail, setCratedUseremail] = useState("");
  const [token] = useTokens(cratedUseremail);

  if (token) {
    navigate("/");
  }

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleSignUp = (data) => {
    console.log(data);
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        swal("User Created Successfully.");
        const userInfo = {
          displayName: data.name,
        };
        updateUserProfile(userInfo)
          .then(() => {
            savedUser(data.name, data.email, data.role);
          })

          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
      });
  };

  const savedUser = (name, email, role) => {
    const user = { name, email, role };
    fetch("https://bike-mart-server-rouge.vercel.app/allusers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCratedUseremail(email);
      });
  };

  const handleGoogleSignin = () => {
    signinGoogle().then((result) => {
      console.log(result.user);
      setLoading(false);
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 rounded-lg border border-accent ring-4">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">
                Want to Join as a Buyer or a Seller?
              </span>
            </label>
            <select
              className="input input-bordered w-full max-w-xs"
              {...register("role")}
            >
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          You already have an account?{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <label className="label">
          {" "}
          <span className="label-text">Register with Google</span>
        </label>
        <button onClick={handleGoogleSignin} className="btn btn-outline w-full">
          GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Register;
