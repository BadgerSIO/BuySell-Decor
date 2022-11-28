import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useVerified from "../../customHooks/useVerified";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";

const Addproduct = () => {
  const { user, loading, logout } = useContext(AuthContext);

  const [isVerified] = useVerified(user?.email);

  const [selectedCat, setSelectedCat] = useState(null);

  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/categories`);
      const data = await res.json();
      return data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addProduct = (data) => {
    data["postedOn"] = new Date().toDateString();
    data["sellerName"] = user?.displayName;
    data["sellerEmail"] = user?.email;
    data["sellerVerified"] = isVerified;
    data["categoryId"] = selectedCat;
    data["sold"] = false;
    data["advert"] = false;
    fetch(`http://localhost:5000/product`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          return logout();
        }
        res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product successfully Added");
          reset();
          navigate("/dashboard/myProducts");
        }
      })
      .catch((err) => console.log(err));
    console.log(data);
  };
  if (isLoading || loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <Titles>Add Product</Titles>
      <div className="bg-white p-5 lg:p-10 border border-gray-200">
        <form onSubmit={handleSubmit(addProduct)}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Product Name
              </label>

              <input
                type="text"
                {...register("name", { required: "This field is required" })}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              />
              {errors.name && (
                <p className="text-red-500">
                  <small>{errors?.name?.message}</small>
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Product Image Url
              </label>

              <input
                type="url"
                {...register("productPhoto", {
                  required: "This field is required",
                })}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              />
              {errors.productPhoto && (
                <p className="text-red-500">
                  <small>{errors?.productPhoto?.message}</small>
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Product Category
              </label>

              <select
                {...register("category", {
                  required: "This field is required",
                  onChange: (e) => {
                    const index = e.target.selectedIndex;
                    const el = e.target.childNodes[index];
                    const option = el.getAttribute("id");
                    setSelectedCat(option);
                  },
                })}
                required
                className="p-2 w-full border border-gray-200 outline-none focus:outline-none rounded   "
              >
                <option className="capitalize" value="">
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option
                    className="capitalize"
                    id={cat?._id}
                    key={cat?._id}
                    value={cat?._name}
                  >
                    {cat?.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">
                  <small>{errors?.category?.message}</small>
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Orginal Price
              </label>

              <input
                type="number"
                {...register("orginalPrice", {
                  required: "This field is required",
                })}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              />
              {errors.orginalPrice && (
                <p className="text-red-500">
                  <small>{errors?.orginalPrice?.message}</small>
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Resale Price
              </label>

              <input
                type="number"
                {...register("resalePrice", {
                  required: "This field is required",
                })}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              />
              {errors.resalePrice && (
                <p className="text-red-500">
                  <small>{errors?.resalePrice?.message}</small>
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Years of Use
              </label>

              <input
                type="number"
                placeholder="less than _ year"
                {...register("usageTime", {
                  required: "This field is required",
                  min: { value: 1, message: "invalid time input" },
                })}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              />
              {errors.usageTime && (
                <p className="text-red-500">
                  <small>{errors?.usageTime?.message}</small>
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Product Location
              </label>

              <input
                type="text"
                {...register("location", {
                  required: "This field is required",
                })}
                placeholder="dhaka"
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              />
              {errors.location && (
                <p className="text-red-500">
                  <small>{errors?.location?.message}</small>
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-sm lg:text-base">
                Your phone number
              </label>
              <input
                type="tel"
                placeholder="017......11"
                {...register("contactInfo", {
                  required: "This field is required",
                  pattern: {
                    value: /^(\+\d{1,2})?\(?\d{3}\)?\d{3}\d{5}$/,
                    message: "invalid number",
                  },
                })}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              />
              {errors.contactInfo && (
                <p className="text-red-500">
                  <small>{errors?.contactInfo?.message}</small>
                </p>
              )}
            </div>
            <div className="col-span-full xl:col-span-1">
              <label className="font-semibold text-sm lg:text-base">
                Product Condition
              </label>

              <select
                {...register("condition", {
                  required: "This field is required",
                })}
                required
                className="p-2 w-full border border-gray-200 outline-none focus:outline-none rounded   "
              >
                <option className="capitalize" value="">
                  Select condition
                </option>
                <option className="capitalize" value="excellent">
                  excellent
                </option>
                <option className="capitalize" value="good">
                  good
                </option>
                <option className="capitalize" value="fair">
                  fair
                </option>
              </select>
              {errors.condition && (
                <p className="text-red-500">
                  <small>{errors?.condition?.message}</small>
                </p>
              )}
            </div>
            <div className="col-span-full">
              <label className="font-semibold text-sm lg:text-base">
                Product Description
              </label>

              <textarea
                rows="4"
                {...register("description", {
                  required: "This field is required",
                })}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              ></textarea>
              {errors.description && (
                <p className="text-red-500">
                  <small>{errors?.description?.message}</small>
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center py-2 px-3 border capitalize bg-primary text-white rounded hover:scale-95 mt-5"
          >
            <FaPlus className="mr-3"></FaPlus> Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
