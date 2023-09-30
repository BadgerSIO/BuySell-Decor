import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Category = ({ category }) => {
  const { name, image, _id } = category;
  return (
    <div className="card w-full  shadow-xl image-full group max-h-40">
      <figure className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="group-hover:scale-110 transition-all w-full h-full object-cover"
        />
      </figure>
      <div className="card-body items-center justify-center ">
        <h2 className="card-title text-xl md:text-3xl  font-semibold capitalize text-white md:mb-3">
          {name}
        </h2>
        <div className="card-actions justify-end">
          <Link
            to={`/category/${_id}`}
            className="btn btn-primary btn-xs md:btn-sm "
          >
            See More <FaLongArrowAltRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
