import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { price, customerEmail, customerName, _id, productId, contactInfo } =
    booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch("https://buysell-decor-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }
    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      });
    if (confirmationError) {
      setCardError(confirmationError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        bookingId: _id,
        productId,
        contactInfo,
        customerEmail,
        price,
        transactionId: paymentIntent.id,
      };
      fetch(`https://buysell-decor-server.vercel.app/payment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(paymentData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("payment successful !");
          setTransactionId(paymentIntent.id);
          navigate("/dashboard");
        });
    }
  };
  if (loader) {
    return <Loader></Loader>;
  }
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm hover:bg-green-500 bg-sky-500 border-0 text-white mt-5"
          type="submit"
          disabled={!stripe || !clientSecret || loader}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">
        <small>{cardError}</small>
      </p>
      {}
    </>
  );
};

export default CheckoutForm;
