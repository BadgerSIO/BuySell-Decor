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
    location,
    usageTime,
    postedOn,
    sellerName,
  } = product;
  // picture, name, location, resale price, original price, years of use, the time when it got posted, the seller's name; if the seller is verified, there will be a blue tick next to their name and a Book now button. Please note, category:/id will be a private route.
  return (
    <div>
      <div className="card card-compact w-full bg-base-100 rounded border group">
        <figure className="w-full overflow-hidden">
          <img
            src={productPhoto}
            alt={name}
            className="w-full h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-75"
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
            <p className={sellerVerified ? "text-right" : "text-left"}>
              Condition:{" "}
              <span className="font-bold capitalize">{condition}</span>
            </p>
          </div>
          <div className="flex justify-between space-x-5">
            <p className="capitalize">Seller: {sellerName}</p>
            <p className="text-right capitalize">
              used less than {usageTime} year
            </p>
          </div>
          <h6>Posted on: {postedOn}</h6>
          <div className="card-actions justify-between items-center">
            <h3>
              <span className="text-2xl text-neutral font-bold">
                ${resalePrice}
              </span>
              <span className="line-through ml-2 text-lg">${orginalPrice}</span>
            </h3>
            <div>
              <h6>Location: {location}</h6>
            </div>
            <button className="btn btn-xs btn-accent">book now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
