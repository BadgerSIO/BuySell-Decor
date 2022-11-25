import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Titles from "../../utilities/Titles";

const Addproduct = () => {
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
    console.log(data);
  };
  return (
    <div>
      <Titles>Add Product</Titles>
      <div className="bg-white p-5 lg:p-10 border border-gray-200">
        <form
          onSubmit={handleSubmit(addProduct)}
          // onSubmit={handleSubmit}
          className="  "
        >
          <div className="grid xl:grid-cols-2 xl:gap-5">
            <div>
              <label className="font-semibold">Product Name</label>
              <br />
              <input
                type="text"
                {...register("name")}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full mt-3 mb-5 p-3"
              />
            </div>
            <div>
              <label className="font-semibold">Product Image Url</label>
              <br />
              <input
                type="url"
                {...register("productPhoto")}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full mt-3 mb-5 p-3"
              />
            </div>
            <div>
              <label className="font-semibold">Product Category</label>
              <br />
              <select
                // onChange={handleChange}

                {...register("category", { required: true })}
                required
                className="select w-full border border-gray-200 outline-none focus:outline-none focus:border-theme rounded  mt-3 mb-5 p-3 "
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option id={cat._id} key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span>
                  <small>This is required</small>
                </span>
              )}
            </div>
            <div>
              <label className="font-semibold">Product Price</label>
              <br />
              <input
                name="price"
                type="number"
                {...register("price")}
                className="border border-gray-200 outline-none focus:border-theme rounded w-full mt-3 mb-5 p-3"
              />
            </div>
          </div>
          <br />
          <label className="font-semibold">Product Description</label>
          <br />
          <textarea
            name="description"
            rows="4"
            {...register("description")}
            className="border border-gray-200 outline-none focus:border-theme rounded w-full mt-3 mb-5 p-3"
          ></textarea>
          <br />
          <button
            type="submit"
            className="flex justify-center items-center py-2 px-3 border capitalize border-theme bg-theme text-neutral rounded hover:scale-95 "
          >
            <FaPlus className="mr-3"></FaPlus> Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
