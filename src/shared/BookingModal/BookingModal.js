import React from "react";
import { useForm } from "react-hook-form";
import { MdBookmarkAdd } from "react-icons/md";

const BookingModal = ({ current, setCurrent, user }) => {
  const { displayName, email } = user;
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
    description,
  } = current;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box sm:w-2/4 md:w-2/4 lg:w-3/4 max-w-4xl p-0 rounded-none">
          <div className="card w-full lg:card-side bg-base-100 p-0 rounded-none ">
            <figure className="w-full lg:w-2/4">
              <img
                src={productPhoto}
                alt={name}
                className="w-full h-60 lg:h-full object-cover"
              />
            </figure>
            <div className="w-full lg:w-2/4 p-5 lg:p-10">
              <h2 className="card-title text-xl lg:text-3xl">{current.name}</h2>
              <h3>
                <span className="text-2xl text-neutral font-bold">
                  ${resalePrice}
                </span>
                <span className="line-through ml-2 text-lg">
                  ${orginalPrice}
                </span>
              </h3>
              <p>{description}</p>
              <form className="lg:mt-5">
                <div>
                  <input
                    type="text"
                    defaultValue={displayName}
                    readOnly
                    className="input input-bordered w-full rounded-sm focus:outline-none read-only:bg-accent"
                  />
                </div>
                <div className="my-3">
                  <input
                    type="email"
                    defaultValue={email}
                    readOnly
                    className="input input-bordered w-full rounded-sm focus:outline-none read-only:bg-accent"
                  />
                </div>
                <div className="my-3">
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="input input-bordered w-full rounded-sm"
                  />
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    placeholder="Enter meeting location"
                    className="input input-bordered w-full rounded-sm"
                  />
                </div>
              </form>
              <div className="card-actions mt-5">
                <button
                  onClick={() => setCurrent(null)}
                  className="btn btn-primary w-full rounded-sm"
                >
                  Book now <MdBookmarkAdd className="text-white ml-2 text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* */}
      </div>
    </>
  );
};

export default BookingModal;
