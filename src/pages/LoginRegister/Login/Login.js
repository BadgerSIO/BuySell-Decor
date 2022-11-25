import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleLogin = (data) => {
    console.log(data);
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
            className="input input-bordered w-full mt-1 rounded-none"
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
            className="input input-bordered w-full mt-1 rounded-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">
              <small>{errors?.password.message}</small>
            </p>
          )}
        </div>
        <button className="text-lg capitalize w-full  border border-gray-100 py-2 bg-accent hover:bg-accent/50 inline-block mt-5">
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
