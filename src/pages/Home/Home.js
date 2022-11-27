import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React from "react";
import Loader from "../../shared/Loader/Loader";
import BlogSection from "./Blogs/BlogSection";
import Categories from "./Categories/Categories";
import Hero from "./Hero/Hero";
import ProductSection from "./ProductSection/ProductSection";

const Home = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/productsAdvert");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <Hero></Hero>
      <Categories></Categories>
      {products?.length > 0 ? (
        <ProductSection products={products}></ProductSection>
      ) : (
        <></>
      )}

      <BlogSection></BlogSection>
    </>
  );
};

export default Home;
