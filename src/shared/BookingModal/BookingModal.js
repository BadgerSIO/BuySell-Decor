import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdBookmarkAdd, MdClose } from "react-icons/md";
import useCurrentDate from "../../customHooks/useCurrentDate";

const BookingModal = ({ current, setCurrent, user, logout, reportItem }) => {
  const { displayName, email } = user;
  const currentTime = useCurrentDate();
  const {
    _id,
    name,
    resalePrice,
    orginalPrice,
    productPhoto,
    contactInfo,
    sellerVerified,
    condition,
    location,
    usageTime,
    postedOn,
    sellerName,
    sellerEmail,
    description,
  } = current;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleBooking = (data) => {
    data["productName"] = name;
    data["productImage"] = productPhoto;
    data["productId"] = _id;
    data["bookingTime"] = currentTime;
    data["price"] = resalePrice;
    data["sellerEmail"] = sellerEmail;
    data["sellerContact"] = contactInfo;
    fetch(`https://buysell-decor-server.vercel.app/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          toast.error("Failed to add booking");
          return logout();
        }
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product Booked !");
          setCurrent(null);
        }
      })
      .catch((err) => console.log(err));
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
              <form onSubmit={handleSubmit(handleBooking)} className="lg:mt-5">
                <div>
                  <input
                    type="text"
                    defaultValue={displayName}
                    readOnly
                    {...register("customerName")}
                    className="input input-bordered w-full rounded-sm focus:outline-none read-only:bg-accent"
                  />
                  {errors.customerName && (
                    <p>
                      <small>Field is required</small>
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <input
                    type="email"
                    defaultValue={email}
                    readOnly
                    {...register("customerEmail", { required: true })}
                    className="input input-bordered w-full rounded-sm focus:outline-none read-only:bg-accent"
                  />
                  {errors.customerEmail && (
                    <p>
                      <small>Field is required</small>
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="input input-bordered w-full rounded-sm"
                    {...register("contactInfo", {
                      required: "This field is required",
                      pattern: {
                        value: /^(\+\d{1,2})?\(?\d{3}\)?\d{3}\d{5}$/,
                        message: "invalid number",
                      },
                    })}
                  />
                  {errors.contactInfo && (
                    <p className="text-red-500">
                      <small>{errors?.contactInfo?.message}</small>
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    placeholder="Enter meeting location"
                    className="input input-bordered w-full rounded-sm"
                    {...register("location", {
                      required: "This field is required",
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-500">
                      <small>{errors?.location?.message}</small>
                    </p>
                  )}
                </div>
                <div className="card-actions mt-5">
                  <button className="btn btn-primary w-full rounded-sm">
                    Book now{" "}
                    <MdBookmarkAdd className="text-white ml-2 text-lg" />
                  </button>
                </div>
              </form>
              <button
                onClick={() => reportItem(current)}
                className="  text-gray-300 hover:text-red-500"
              >
                <small>Report Item</small>
              </button>
            </div>
            <button
              onClick={() => setCurrent(null)}
              className="absolute top-2 right-2 text-black text-2xl "
            >
              <MdClose />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
