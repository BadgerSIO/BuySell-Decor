import { useQuery } from "@tanstack/react-query";
import axios from "../../../axios";
import React from "react";
import Loader from "../../../shared/Loader/Loader";
import Titles from "../../../utilities/Titles";
import BlogSecCard from "./BlogSecCard";

const BlogSection = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      // const res = await fetch(`http://localhost:5000/blogs`);
      const res = await axios.get("/blogs");

      return res.data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <section className="bg-accent py-8 md:py-16 lg:py-20">
      <div className="container">
        <Titles>blogs</Titles>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-10 mt-5">
          {blogs?.map((blog, i) => (
            <BlogSecCard goto={i} key={blog._id} blog={blog}></BlogSecCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
