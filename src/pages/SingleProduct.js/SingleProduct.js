import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Titles from "../../utilities/Titles";
import { BiCurrentLocation } from "react-icons/bi";
import { BsUiChecks } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import BookingModal from "../../shared/BookingModal/BookingModal";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import Loader from "../../shared/Loader/Loader";
import ProductAdvertCard from "../Home/ProductSection/ProductAdvertCard";
const SingleProduct = () => {
  const { user, logout } = useContext(AuthContext);
  const product = useLoaderData().data;
  const {
    category,
    categoryId,
    condition,
    description,
    location,
    name,
    orginalPrice,
    postedOn,
    productPhoto,
    resalePrice,
    sellerVerified,
    _id,
  } = product;
  const [current, setCurrent] = useState();
  const { data: relatedProducts, isLoading } = useQuery({
    queryKey: ["productsByCategory", categoryId],
    queryFn: async () => {
      const { data } = await axios.get(`/productsByCategory/${categoryId}`);
      return data;
    },
  });
  const reportItem = (item) => {
    fetch(`https://buysell-decor-server.vercel.app/reportProduct/${item._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Reported");
      })
      .catch((err) => console.log(err));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <section>
        <div className="container py-5 lg:py-10">
          <div className="flex space-x-3 flex-wrap justify-between">
            <div className="lg:w-[45%] w-full">
              <img src={productPhoto} alt={name} className="w-full" />
            </div>
            <div className="lg:w-[45%] w-full space-y-5">
              <Titles>{name}</Titles>
              <p>
                <span className="text-xl lg:text-3xl font-bold">
                  ${resalePrice} /
                </span>
                <span className="line-through text-md lg:text-2xl">
                  ${orginalPrice}{" "}
                </span>
              </p>
              <p>{description}</p>
              <p>
                <span className="font-semibold">Posted On:</span>{" "}
                <span className="text-primary">{postedOn}</span>
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                <span className="text-primary">{category}</span>
              </p>
              <div className="grid grid-cols-3  border-y border-gray-300 ">
                <div className="hover:bg-accent p-3 text-center hover:border-x border-gray-300">
                  <BiCurrentLocation className="text-3xl mx-auto  mb-3" />
                  Location: {location}
                </div>
                <div className="hover:bg-accent p-3 text-center hover:border-x border-gray-300">
                  <MdVerified className="text-3xl mx-auto  mb-3" />
                  Seller: {sellerVerified ? "verified" : "General"}
                </div>
                <div className="hover:bg-accent p-3 text-center hover:border-x border-gray-300">
                  <BsUiChecks className="text-3xl mx-auto  mb-3" />
                  Condition: {condition}
                </div>
              </div>
              <label
                onClick={() => setCurrent(product)}
                htmlFor="bookingModal"
                className="btn btn-sm btn-primary"
              >
                Book Now
              </label>
            </div>
          </div>
        </div>
        {current && (
          <BookingModal
            user={user}
            current={current}
            setCurrent={setCurrent}
            logout={logout}
            reportItem={reportItem}
          ></BookingModal>
        )}
      </section>
      <section className="bg-accent py-5 lg:py-10">
        <div className="container">
          <Titles>Related Products</Titles>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-10 mt-5">
            {relatedProducts?.map((product) => {
              if (product._id !== _id) {
                return (
                  <ProductAdvertCard
                    key={product?._id}
                    product={product}
                    userIsLogged={user}
                  ></ProductAdvertCard>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
