import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }
  const { productImage, productName, price, location } = data;

  return (
    <div>
      <Titles>Make payment</Titles>
      <div className="w-full   bg-white p-5 lg:p-10 grid grid-cols-1 md:grid-cols-3  gap-3 md:gap-5">
        <div className="col-span-1">
          <img
            src={productImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-lg md:text-xl font-semibold capitalize">
            Product Name: {productName}
          </h1>
          <h3 className="text-lg  font-semibold ">Product Price: ${price}</h3>
          <h4>Pick up location {location}</h4>
          <div className="w-full md:w-full max-w-lg bg-accent p-5 md:p-10 mt-5">
            <h1 className="text-xl capitalize text-neutral mb-5">
              Stripe Payment
            </h1>
            <Elements stripe={stripePromise}>
              <CheckoutForm booking={data} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
