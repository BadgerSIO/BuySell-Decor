import React from "react";

const Hero = () => {
  return (
    <div className="hero min-h-[93vh] bg-hero-pattern bg-cover bg-bottom">
      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h3 className="text-lg md:text-2xl text-white font-semibold">
            Second Hand
          </h3>
          <h1 className="mb-5 text-3xl md:text-6xl lg:text-9xl font-semibold text-white font-headings">
            Buy & Sell
          </h1>
          <p className="mb-5 text-white">
            You have come to the best place for your product or with it !
          </p>
          <a href="#categories" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
