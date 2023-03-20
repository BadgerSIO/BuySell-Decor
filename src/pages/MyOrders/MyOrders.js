import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";

import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await axios(`/myBookings?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <Loader></Loader>;
  } else if (products?.length > 0) {
    return (
      <section>
        <div>
          <Titles>My Orders</Titles>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Seller Contact</th>
                  <th>Product Status</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={product._id}>
                    <th>{i + 1}</th>
                    <td className="flex items-center ">
                      <div className="avatar mr-2">
                        <div className="w-10 lg:w-16 rounded">
                          <img
                            src={product?.productImage}
                            alt={product?.productImage}
                          />
                        </div>
                      </div>
                      <div>
                        <p>{product?.productName}</p>
                        <p>
                          <small>booked at- {product?.bookingTime}</small>
                        </p>
                      </div>
                    </td>
                    <td>${product?.price}</td>
                    <td>{product?.sellerContact}</td>
                    <td>{product?.sold ? "sold" : "available"}</td>

                    <td>
                      <Link
                        to={`/dashboard/payment/${product._id}`}
                        htmlFor="confirmation-modal"
                        disabled={product?.sold ? true : false}
                        className={`btn btn-xs ${
                          product?.sold ? "bg-green-500 " : "bg-accent"
                        }   hover:bg-green-500 border-0 text-black hover:text-white mr-2`}
                      >
                        {product?.sold ? "paid" : "make payment"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <Titles>No orders yet</Titles>
      </div>
    );
  }
};

export default MyOrders;
