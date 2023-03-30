import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const ReviewCard = ({ review }) => {
  const { customerImage, customerName, customerReview, productName } = review;
  return (
    <div className="p-5 border border-gray-200 rounded-md relative h-full bg-white">
      <div className="text-center">
        <div className="avatar ">
          <div className="w-24 mask mask-squircle ">
            <img src={customerImage} alt={customerName} />
          </div>
        </div>
      </div>
      <h3 className="text-center font-semibold text-2xl">{customerName} </h3>
      <div className="flex space-x-1 justify-center items-center">
        <MdVerified className="text-sky-500" />
        <h3 className="text-xs font-medium">Verified Customer</h3>
      </div>
      <p className="text-center px-5 py-5 text-gray-500">"{customerReview}"</p>
      <FaQuoteLeft className="text-7xl absolute top-5 left-5 text-primary/5" />
      <FaQuoteRight className="text-7xl absolute bottom-5 right-5 text-primary/5" />
      <h4 className="text-sm text-center">
        <span className="text-primary">Product:</span> {productName}
      </h4>
    </div>
  );
};

export default ReviewCard;
