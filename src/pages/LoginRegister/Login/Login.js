import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useToken from "../../../customHooks/useToken";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const { error, setError, login } = useContext(AuthContext);
  const [token] = useToken(userEmail);
  let location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    login(data.email, data.password)
      .then((res) => {
        if (res) {
          toast.success(
            `Welcome Back ${res?.user?.displayName?.split(" ")[0]}`
          );
          setError("");
          return setUserEmail(res.user.email);
        }
      })
      .catch((err) => setError(err));
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="w-full ">
        <h1 className="text-2xl mb-5 font-semibold">Login</h1>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full mt-1 focus:outline-primary/30 focus:border-primary/30 rounded-none"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">
              <small>{errors?.email.message}</small>
            </p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full mt-1 focus:outline-primary/30 focus:border-primary/30 rounded-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">
              <small>{errors?.password.message}</small>
            </p>
          )}
        </div>
        <button className="text-lg capitalize w-full text-white  border border-gray-100 py-2 bg-primary hover:bg-primary/90 inline-block mt-5">
          Login
        </button>
      </form>
      {error ? (
        <p className="text-center text-red-500">
          <small>{error.message}</small>
        </p>
      ) : (
        ""
      )}
      <p className="text-center text-xs mt-5">
        New to BuySell Decor?{" "}
        <Link to="register" className="text-secondary">
          Create New Account
        </Link>
      </p>
    </>
  );
};

export default Login;
