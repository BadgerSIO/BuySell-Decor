import React from "react";
import CategoriesF from "./components/CategoriesF";

import FollowUs from "./components/FollowUs";
import Newsletter from "./components/Newsletter";
import QuickLinks from "./components/QuickLinks";

const Footer = () => {
  return (
    <section className="">
      <div className="py-10  ">
        <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <FollowUs />
          <CategoriesF />
          <QuickLinks />
          <Newsletter />
        </div>
      </div>
      <div className="bg-accent">
        <div className="container ">
          <h6 className="text-center text-xs md:text-base py-2">
            COPYRIGHT © 2023 _ SAAD IBNE OMAR
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Footer;
