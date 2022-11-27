import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";

const MyProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const [current, setCurrent] = useState(null);
  const {
    data: products,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellerProduct"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/sellerProduct?email=${user?.email}`
      );
      const data = res.json();
      return data;
    },
  });
  const deleteCurrent = (ctuser) => {
    fetch(`http://localhost:5000/deleteuser/${ctuser._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setCurrent(null);
          toast.success(`Successfully removed ${ctuser.name}`);
        }
        refetch();
      });
  };
  if (isLoading || loading) {
    return <Loader></Loader>;
  } else if (products?.length > 0) {
    return (
      <section>
        <div>
          <Titles>My Products{products?.length}</Titles>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Resale Price</th>
                  <th>Category</th>
                  <th>status</th>
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
                    <td>{product?.category}</td>
                    <td>{product?.sold ? "sold" : "available"}</td>

                    <td>
                      <label
                        onClick={() => setCurrent(product)}
                        htmlFor="confirmation-modal"
                        className="btn btn-xs md:btn-sm bg-[#F1F5F9] hover:bg-red-500 border-0 text-black hover:text-white mr-2"
                      >
                        delete
                      </label>
                      {product?.advert ? (
                        <button className="btn btn-secondary btn-xs md:btn-sm">
                          Dont Advert
                        </button>
                      ) : (
                        <button className="btn btn-secondary btn-xs md:btn-sm">
                          Advert
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {current && (
              <ConfirmationModal
                user={current}
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

export default MyProducts;
