import React from "react";

const ProductInfo = ({ info }) => {
  const { price, productImage, productName } = info;
  return (
    <div className="bg-white p-5 rounded-md">
      <h2 className="text-xl pb-5 mb-5 border-b">Your Order</h2>
      <div className="flex space-x-5">
        <div>
          <img src={productImage} alt={productName} className="w-28" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{productName}</h3>
          <h4 className="font-medium text-2xl">${price}</h4>
        </div>
      </div>
      <div className="my-5 py-5 border-y">
        <h4>Delivery:</h4>
        <h4>Discount:</h4>
      </div>
      <h4 className="text-2xl font-semibold">Total: ${price}</h4>
    </div>
  );
};

export default ProductInfo;
