import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { Authcontext } from "./Context/AuthProvider";

// import useToken from "../../useHooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, signinGoogle, user } = useContext(Authcontext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  //   const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  //   if (token) {
  //     navigate(from, { replace: true });
  //   }

  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signinGoogle()
      .then((result) => {
        console.log(result.user);
        swal("Google Log in Successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        swal(error.message);
      });
  };
  return (
    <div>
      <div className="h-[800px] flex justify-center items-center ">
        <div className="w-96 p-10 border border-accent rounded-md ring-4">
          <h2 className="text-xl text-center">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                placeholder="Enter Your Email"
                type="text"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
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
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {" "}
                <span className="label-text">Forget Password?</span>
              </label>
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>
            <input
              className="btn btn-accent w-full"
              value="Login"
              type="submit"
            />
            <div>
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </form>
          <p>
            New here?{" "}
            <Link className="text-secondary" to="/register">
              Create new Account
            </Link>
          </p>
          <div className="divider">OR</div>
          <label className="label">
            {" "}
            <span className="label-text">Login with Google</span>
          </label>
          <button
            onClick={handleGoogleSignIn}
            className=" btn btn-outline w-full"
          >
            GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
