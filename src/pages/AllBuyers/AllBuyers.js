import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";

const AllBuyers = () => {
  const [current, setCurrent] = useState(null);
  const {
    data: buyers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getbuyers"],
    queryFn: async () => {
      const res = await fetch(
        "https://buysell-decor-server.vercel.app/getbuyers?role=buyer",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const deleteCurrent = (ctuser) => {
    fetch(`https://buysell-decor-server.vercel.app/deleteuser/${ctuser._id}`, {
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
      {buyers.length > 0 ? (
        <>
          <Titles>All buyers</Titles>
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
                {buyers.map((buyer, i) => (
                  <tr key={buyer._id}>
                    <th>{i + 1}</th>
                    <td>{buyer?.name}</td>
                    <td>{buyer?.email}</td>
                    <td>{buyer?.role}</td>

                    <td>
                      <label
                        onClick={() => setCurrent(buyer)}
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
                current={current}
                deleteCurrent={deleteCurrent}
              ></ConfirmationModal>
            )}
          </div>
        </>
      ) : (
        <>
          <Titles>No Buyer found</Titles>
        </>
      )}
    </div>
  );
};

export default AllBuyers;
