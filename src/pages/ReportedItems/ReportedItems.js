import { useQuery } from "@tanstack/react-query";

import React, { useContext, useState } from "react";
import Titles from "../../utilities/Titles";
import Loader from "../../shared/Loader/Loader";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import axios from "../../axios";

const ReportedItems = () => {
  const { user, loading } = useContext(AuthContext);
  const [current, setCurrent] = useState(null);
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const res = await axios("/reportedProducts", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return res.data;
    },
  });
  const deleteCurrent = (product) => {
    fetch(
      `https://buysell-decor-server.vercel.app/product/${product._id}?email=${user?.email}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setCurrent(null);
          toast.success(`Successfully removed ${product.name}`);
        }
        refetch();
      });
  };
  const handleAdvert = (id) => {
    fetch(
      `https://buysell-decor-server.vercel.app/product/${id}?email=${user?.email}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
  // relese from report list
  const handleRelease = (id) => {
    fetch(
      `https://buysell-decor-server.vercel.app/releaseProduct/${id}?email=${user?.email}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
  if (isLoading || loading) {
    return <Loader></Loader>;
  } else if (products?.length > 0) {
    return (
      <section>
        <div>
          <Titles>Reported Products{products?.length}</Titles>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Resale Price</th>
                  <th>Seller</th>
                  <th>status</th>
                  <th>Action</th>
                  <th>Advert</th>
                  <th>Report</th>
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
                            src={product?.productPhoto}
                            alt={product?.name}
                          />
                        </div>
                      </div>
                      <div>
                        <p>{product?.name}</p>
                        <p>
                          <small>posted- {product?.postedOn}</small>
                        </p>
                      </div>
                    </td>
                    <td>${product?.resalePrice}</td>
                    <td>{product?.sellerEmail}</td>
                    <td>{product?.sold ? "sold" : "available"}</td>

                    <td>
                      <label
                        onClick={() => setCurrent(product)}
                        htmlFor="confirmation-modal"
                        className="btn btn-xs  bg-accent hover:bg-red-500 border-0 text-black hover:text-white mr-2"
                      >
                        delete
                      </label>
                    </td>
                    <td>
                      {product?.sold ? (
                        <></>
                      ) : (
                        <button
                          onClick={() => handleAdvert(product._id)}
                          className={`btn ${
                            product?.advert
                              ? "btn-primary"
                              : "bg-green-500 text-white border-none hover:bg-green-400"
                          } btn-xs `}
                        >
                          {product?.advert ? "Stop Advert" : "Start Advert"}
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleRelease(product?._id)}
                        className="btn btn-xs btn-accent hover:bg-green-500 hover:text-white"
                      >
                        Release
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {current && (
              <ConfirmationModal
                current={current}
                deleteCurrent={deleteCurrent}
              ></ConfirmationModal>
            )}
          </div>
        </div>
      </section>
    );
  }
  return (
    <div>
      <Titles>No products found</Titles>
    </div>
  );
};

export default ReportedItems;
