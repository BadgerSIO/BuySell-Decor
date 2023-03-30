import { useQuery } from "@tanstack/react-query";
import axios from "../../../axios";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const CategoriesF = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/categories");
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h3 className="uppercase font-bold mb-3  after:-bottom-1 after:w-10 after:h-[2px] after:absolute after:bg-primary relative after:left-0">
        Categories
      </h3>
      <div className="flex flex-col space-y-2">
        {categories?.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category?._id}`}
            className="capitalize hover:text-primary"
          >
            {category?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesF;
