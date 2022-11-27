import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Category = ({ category }) => {
  const { name, image, _id } = category;
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
          <Link
            to={`/category/${_id}`}
            className="md:btn md:btn-primary text-sm md:text-base flex items-center bg-primary p-2  rounded "
          >
            See More <FaLongArrowAltRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
