import React from "react";

const ConfirmationModal = ({ user, deleteCurrent }) => {
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to remove
            <span className="block text-primary">{user.name}</span>
          </h3>
          <p className="py-4 text-red-500">
            Be aware. This action is ireversable
          </p>
          <div className="modal-action justify-start">
            <label
              htmlFor="confirmation-modal"
              className="btn btn-success btn-sm"
            >
              No
            </label>
            <button
              onClick={() => deleteCurrent(user)}
              className="btn  btn-sm btn-error"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
