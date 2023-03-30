import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div>
      <h3 className="uppercase font-bold mb-3  after:-bottom-1 after:w-10 after:h-[2px] after:absolute after:bg-primary relative after:left-0">
        Quick Links
      </h3>
      <div className="flex flex-col space-y-2 ">
        <Link to={"/"} className="hover:text-primary">
          Home
        </Link>
        <Link to={"/dashboard"} className="hover:text-primary">
          Dashboard
        </Link>
        <Link to={"/blog"} className="hover:text-primary">
          Blog
        </Link>
      </div>
    </div>
  );
};

export default QuickLinks;
