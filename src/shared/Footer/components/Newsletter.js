import React from "react";
import { toast } from "react-hot-toast";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast.success("Successfully Submitted");
  };
  return (
    <div>
      <h3 className="uppercase font-bold mb-3  after:-bottom-1 after:w-10 after:h-[2px] after:absolute after:bg-primary relative after:left-0">
        Stay Tuned
      </h3>
      <p>Subscribe to out newsletter to get the hottest deals</p>
      <form className="mt-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="border-y border-l w-3/4 p-2 outline-none focus:border-primary"
          required
        />
        <button className="bg-primary p-2 w-1/4 text-white border border-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
