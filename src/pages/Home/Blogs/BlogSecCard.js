import React from "react";
import { Link } from "react-router-dom";

const BlogSecCard = ({ blog, goto }) => {
  const { question, image, ans } = blog;
  return (
    <div className="card card-compact w-full bg-base-100 rounded border">
      <figure>
        <img
          src={image}
          alt={ans}
          className="w-full h-72 lg:h-80 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{question}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <Link to={`/blog`} className="btn btn-primary btn-outline">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSecCard;
