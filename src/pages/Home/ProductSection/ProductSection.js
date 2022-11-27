import React from "react";

import Titles from "../../../utilities/Titles";
import ProductAdvertCard from "./ProductAdvertCard";

const ProductSection = ({ products }) => {
  return (
    <section className="pb-8 md:pb-16 lg:pb-20">
      <div className="container">
        <Titles>Products on sell{products.length}</Titles>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-10 mt-5">
          {products?.map((product) => (
            <ProductAdvertCard
              key={product?._id}
              product={product}
            ></ProductAdvertCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
