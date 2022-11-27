import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../shared/Loader/Loader";
import Titles from "../../../utilities/Titles";
import BlogSecCard from "./BlogSecCard";

const BlogSection = () => {
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
    <section>
      <Titles>blogs</Titles>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10 mt-5">
        {blogs.map((blog, i) => (
          <BlogSecCard goto={i} key={blog._id} blog={blog}></BlogSecCard>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
