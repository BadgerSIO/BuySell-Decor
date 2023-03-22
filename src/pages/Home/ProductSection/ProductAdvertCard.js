import React from "react";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductAdvertCard = ({ product, userIsLogged }) => {
  const {
    _id,
    name,
    resalePrice,
    orginalPrice,
    productPhoto,
    sellerVerified,
    condition,
  } = product;
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (userIsLogged) {
      return navigate(`/product/${_id}`);
    }
    navigate("/login");
    console.log(name);
  };
  return (
    <div className="card card-compact w-full bg-base-100 rounded border  group">
      <figure className="overflow-hidden">
        <img
          src={productPhoto}
          alt={name}
          className="w-full h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform"
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
            Condition: <span className="font-bold capitalize">{condition}</span>
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
        <button
          onClick={handleNavigate}
          className="btn btn-outline btn-sm w-max  "
        >
          See details
        </button>
      </div>
    </div>
  );
};

export default ProductAdvertCard;
