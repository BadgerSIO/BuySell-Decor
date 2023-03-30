import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FollowUs = () => {
  return (
    <div>
      <Link to="/" className="font-bold text-sm lg:text-xl ">
        <span className="text-primary">BuySell</span> Decor
      </Link>
      <p className="max-w-sm text-sm">
        This is a second-hand buy-sell website where you can buy and sell
        second-hand products
      </p>
      <h3 className="mt-5 uppercase font-bold mb-3  after:-bottom-1 after:w-10 after:h-[2px] after:absolute after:bg-primary relative after:left-0">
        Follow Us
      </h3>
      <div className="flex items-center justify-start space-x-3 text-2xl  cursor-pointer text-primary">
        <FaFacebookSquare className="hover:translate-y-1 hover:text-primary/80 transition-transform" />
        <FaInstagramSquare className="hover:translate-y-1 hover:text-primary/80 transition-transform" />
        <FaTwitterSquare className="hover:translate-y-1 hover:text-primary/80 transition-transform" />
      </div>
    </div>
  );
};

export default FollowUs;
