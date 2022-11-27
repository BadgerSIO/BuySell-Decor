import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Titles from "../../utilities/Titles";
import CategoryProduct from "./CategoryProduct";

const CategoryPage = () => {
  const data = useLoaderData().data;
  const [products, setProducts] = useState(data);

  return (
    <section className="py-8 md:py-10 lg:py-10 min-h-[86vh]">
      <div className="container">
        <Titles>
          Category:<span className="text-primary">{products[0].category}</span>
        </Titles>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-10 mt-5">
          {products?.map((product) => (
            <CategoryProduct
              key={product._id}
              product={product}
            ></CategoryProduct>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
