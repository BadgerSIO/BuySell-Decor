import React from "react";
import { useLoaderData } from "react-router-dom";
import Titles from "../../utilities/Titles";

const Payment = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <Titles>Make payment</Titles>
    </div>
  );
};

export default Payment;
