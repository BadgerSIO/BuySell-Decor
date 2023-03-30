import React from "react";
import { useLoaderData } from "react-router-dom";
import Titles from "../../utilities/Titles";
import CheckoutForm2 from "./CheckoutForm2";
import ProductInfo from "./ProductInfo";

const CheckoutPage = () => {
  const product = useLoaderData();
  const {
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
  } = product;

  return (
    <section>
      <Titles>Checkout page</Titles>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="col-span-2">
          <CheckoutForm2 info={product} />
        </div>
        <ProductInfo info={product} />
      </div>
    </section>
  );
};

export default CheckoutPage;
