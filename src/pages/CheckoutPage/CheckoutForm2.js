import React from "react";
import { useForm } from "react-hook-form";

const CheckoutForm2 = ({ info }) => {
  const {
    _id,
    bookingTime,
    contactInfo,
    customerEmail,
    customerName,
    location,
    price,
    productId,
    productImage,
    productName,
    sellerContact,
    sellerEmail,
  } = info;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const makePayment = (data) => {
    const orderinfo = {
      _id,
      bookingTime,
      contactInfo,
      customerEmail,
      customerName,
      customerLocation: data.cus_add1,
      price,
      productId,
      productImage,
      productName,
      sellerContact,
      sellerEmail,
      postalCode: data.cus_postcode,
    };
    fetch(`https://buysell-decor-server.vercel.app/makepayment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(orderinfo),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data.url);
      });
  };
  return (
    <div className=" p-5 bg-white rounded-md">
      <form className="space-y-5" onSubmit={handleSubmit(makePayment)}>
        <div className="grid grid-cols-1  xl:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold text-sm lg:text-base">
              Customer Name
            </label>

            <input
              type="text"
              defaultValue={customerName}
              disabled
              className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
            />
          </div>
          <div>
            <label className="font-semibold text-sm lg:text-base">
              Customer Email
            </label>

            <input
              type="text"
              className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              defaultValue={customerEmail}
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 ">
            <label className="font-semibold text-sm lg:text-base">
              Customer Address
            </label>

            <input
              type="text"
              className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              defaultValue={location}
              {...register("cus_add1", { required: true })}
            />
          </div>
          <div className="col-span-1 ">
            <label className="font-semibold text-sm lg:text-base">
              Postal Code
            </label>

            <input
              type="text"
              className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
              {...register("cus_postcode", { required: true })}
            />
            {errors.postalCode && (
              <p>
                <small>Field is required</small>
              </p>
            )}
          </div>
        </div>

        <div className="col-span-1 ">
          <label className="font-semibold text-sm lg:text-base">
            Phone Number
          </label>

          <input
            type="text"
            className="border border-gray-200 outline-none focus:border-theme rounded w-full  p-2"
            defaultValue={contactInfo}
          />
        </div>
        <button className="btn btn-primary w-full">Make Payment</button>
      </form>
    </div>
  );
};

export default CheckoutForm2;
