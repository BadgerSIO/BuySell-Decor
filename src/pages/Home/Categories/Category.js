import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const Category = ({ category }) => {
  const { name, image } = category;
  return (
    <div className="card w-full  shadow-xl image-full group">
      <figure className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="group-hover:scale-110 transition-all"
        />
      </figure>
      <div className="card-body items-center justify-center ">
        <h2 className="card-title text-xl md:text-3xl xl:text-5xl font-semibold capitalize text-white md:mb-5">
          {name}
        </h2>
        <div className="card-actions justify-end">
          <button className="md:btn md:btn-primary text-sm md:text-base flex items-center bg-primary p-2  rounded ">
            See More <FaLongArrowAltRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
