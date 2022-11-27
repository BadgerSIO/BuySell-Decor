import React from "react";
import BlogSection from "./Blogs/BlogSection";
import Categories from "./Categories/Categories";
import Hero from "./Hero/Hero";
import ProductSection from "./ProductSection/ProductSection";

const Home = () => {
  return (
    <>
      <Hero></Hero>

      <Categories></Categories>
      <ProductSection></ProductSection>
      <BlogSection></BlogSection>
    </>
  );
};

export default Home;
