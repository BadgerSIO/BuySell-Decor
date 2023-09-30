import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../shared/Loader/Loader";
import Titles from "../../../utilities/Titles";
import Category from "./Category";

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `https://buysell-decor-server.vercel.app/categories`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <section id="categories" className="py-8 md:py-16 lg:py-20">
      <div className=" container text-center">
        <Titles>Categories</Titles>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-5">
          {categories.map((category) => (
            <Category key={category._id} category={category}></Category>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
