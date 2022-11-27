import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../shared/Loader/Loader";
import BlogCard from "./BlogCard";

const Blog = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/blogs`);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="container">
      <div className="w-full lg:w-2/4 mx-auto py-10">
        <p className="text-center">
          Home\<span className="text-primary">Blogs</span>
        </p>
        <h1 className="text-5xl font-semibold py-5 text-center">
          Blogs{blogs.length}
        </h1>
        <div className="">
          {blogs.map((blog) => {
            return <BlogCard key={blog._id} blog={blog}></BlogCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
