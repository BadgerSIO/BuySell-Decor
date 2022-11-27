import { useQuery } from "@tanstack/react-query";
import React from "react";
import Titles from "../../../utilities/Titles";

const ProductSection = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch();
    },
  });
  return (
    <section className="pb-8 md:pb-16 lg:pb-20">
      <div className="container">
        <Titles>Products on sell</Titles>
      </div>
    </section>
  );
};

export default ProductSection;
