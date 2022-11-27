import React from "react";
import BlogSection from "./Blogs/BlogSection";
import Categories from "./Categories/Categories";
import Hero from "./Hero/Hero";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <div className="container">
        <Categories></Categories>
        <BlogSection></BlogSection>
      </div>
    </>
  );
};

export default Home;
