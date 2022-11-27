import React from "react";
import { MdVerified } from "react-icons/md";

const CategoryProduct = ({ product }) => {
  const {
    name,
    resalePrice,
    orginalPrice,
    productPhoto,
    sellerVerified,
    condition,
  } = product;
  // picture, name, location, resale price, original price, years of use, the time when it got posted, the seller's name; if the seller is verified, there will be a blue tick next to their name and a Book now button. Please note, category:/id will be a private route.
  return (
    <div>
      <div className="card card-compact w-full bg-base-100 rounded border">
        <figure>
          <img
            src={productPhoto}
            alt={name}
            className="w-full h-72 lg:h-80 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>

          <div className="flex justify-between">
            {sellerVerified ? (
              <p className="flex items-center capitalize">
                <MdVerified className="mr-2 text-sky-500 " /> verified seller
              </p>
            ) : (
              <></>
            )}
            <p>
              Condition:{" "}
              <span className="font-bold capitalize">{condition}</span>
            </p>
          </div>

          <div className="card-actions justify-start">
            <h3>
              <span className="text-2xl text-neutral font-bold">
                ${resalePrice}
              </span>
              <span className="line-through ml-2 text-lg">${orginalPrice}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
