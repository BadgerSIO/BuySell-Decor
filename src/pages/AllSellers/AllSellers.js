import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";

const AllSellers = () => {
  const [current, setCurrent] = useState(null);
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
  if (isLoading) {
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

                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, i) => (
                  <tr key={seller._id}>
                    <th>{i + 1}</th>
                    <td>{seller?.name}</td>
                    <td>{seller?.email}</td>
                    <td>{seller?.role}</td>

                    <td>
                      <label
                        onClick={() => setCurrent(seller)}
                        htmlFor="confirmation-modal"
                        className="btn btn-xs md:btn-sm bg-[#F1F5F9] hover:bg-red-500 border-0 text-black hover:text-white"
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
                user={current}
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
