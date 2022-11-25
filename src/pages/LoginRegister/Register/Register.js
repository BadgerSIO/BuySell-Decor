import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Register = () => {
  const { signup, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    console.log(data);
    const profile = {
      displayName: data.name,
      photoURL: data.photoURL,
    };
    const infoForDb = { ...data };
    delete infoForDb.password;
    signup(data.email, data.password, profile)
      .then(async (res) => {
        console.log(res);
        setError("");
        addUserToDB(infoForDb);
      })
      .catch((err) => setError(err));

    const addUserToDB = (userInfo) => {
      fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("User added succesfully");
          navigate("/");
        });
    };
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)} className="w-full ">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl mb-5 font-semibold">Register</h1>
          <div>
            <label htmlFor="role">Account Type: </label>
            <select {...register("role")} className="focus:outline-none ">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            className="input input-bordered w-full focus:outline-primary/30 focus:border-primary/30 mt-1 rounded-none"
            {...register("name", { required: "name is required" })}
          />
          {errors.email && (
            <p className="text-red-500">
              <small>{errors?.email.message}</small>
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full focus:outline-primary/30 focus:border-primary/30 mt-1 rounded-none"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">
              <small>{errors?.email.message}</small>
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full focus:outline-primary/30 focus:border-primary/30 mt-1 rounded-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">
              <small>{errors?.password.message}</small>
            </p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="photoURL">photoURL</label>
          <input
            type="photoURL"
            id="photoURL"
            className="input input-bordered w-full focus:outline-primary/30 focus:border-primary/30 mt-1 rounded-none"
            {...register("photoURL", { required: "photoURL is required" })}
          />
          {errors.photoURL && (
            <p className="text-red-500">
              <small>{errors?.photoURL.message}</small>
            </p>
          )}
        </div>
        <button className="text-lg capitalize w-full text-white  border border-gray-100 py-2 bg-primary hover:bg-primary/90 inline-block mt-5">
          Register
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
        Already Registered?{" "}
        <Link to="/login" className="text-secondary">
          Login Here
        </Link>
      </p>
    </>
  );
};

export default Register;
