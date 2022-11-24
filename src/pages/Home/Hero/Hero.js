import React from "react";

const Hero = () => {
  return (
    <div className="hero min-h-[93vh] bg-hero-pattern bg-cover bg-bottom">
      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h1 className="mb-5 text-3xl md:text-6xl lg:text-9xl font-semibold text-white font-headings">
            Hello there
          </h1>
          <p className="mb-5 text-white">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
