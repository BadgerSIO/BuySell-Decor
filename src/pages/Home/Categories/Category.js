import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const Category = ({ category }) => {
  const { name, image } = category;
  return (
    <div className="card w-full bg-base-100 shadow-xl image-full group">
      <figure className="overflow-hidden">
        <img
          src={image}
          alt="Shoes"
          className="group-hover:scale-110 transition-all"
        />
      </figure>
      <div className="card-body items-center justify-center ">
        <h2 className="card-title text-2xl md:text-4xl lg:text-5xl font-semibold capitalize text-white mb-5">
          {name}
        </h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            See More <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
