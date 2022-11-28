import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";

const AllSellers = () => {
  const [current, setCurrent] = useState(null);
  const { user, loading } = useContext(AuthContext);
  const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getuser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/getuser?role=seller", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
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
  const handleVerify = (id) => {
    fetch(`http://localhost:5000/user/${id}?email=${user?.email}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
  if (isLoading || loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      {sellers.length > 0 ? (
        <>
          <Titles>All Sellers</Titles>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, i) => (
                  <tr key={seller._id}>
                    <th>{i + 1}</th>
                    <td className="flex items-center">
                      {seller?.verified ? (
                        <MdVerified className="text-sky-500" />
                      ) : (
                        ""
                      )}
                      {seller?.name}
                    </td>
                    <td>{seller?.email}</td>
                    <td>
                      <button
                        onClick={() => handleVerify(seller?._id)}
                        className={`btn ${
                          seller?.verified
                            ? "bg-blue-500 text-white border-none hover:bg-red-500"
                            : "bg-green-500 text-white border-none hover:bg-green-400"
                        } btn-xs `}
                      >
                        {seller?.verified ? " verfied" : " verfiy"}
                      </button>
                    </td>

                    <td>
                      <label
                        onClick={() => setCurrent(seller)}
                        htmlFor="confirmation-modal"
                        className="btn btn-xs bg-accent hover:bg-red-500 border-0 text-black hover:text-white mr-2"
                      >
                        delete
                      </label>
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
        </>
      ) : (
        <>
          <Titles>No seller found</Titles>
        </>
      )}
    </div>
  );
};

export default AllSellers;
