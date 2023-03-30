import React from "react";
import { FaFacebookSquare, FaTelegram, FaWhatsappSquare } from "react-icons/fa";

const HeaderTop = () => {
  return (
    <div className="bg-primary py-2">
      <div className="container flex justify-between items-center">
        <div className="socials flex space-x-2">
          <FaFacebookSquare className="text-white cursor-pointer hover:text-white/70" />
          <FaTelegram className="text-white cursor-pointer hover:text-white/70" />
          <FaWhatsappSquare className="text-white cursor-pointer hover:text-white/70" />
        </div>
        <p className="text-xs uppercase text-white">
          Free shipping on all orders !!!
        </p>
      </div>
    </div>
  );
};

export default HeaderTop;
