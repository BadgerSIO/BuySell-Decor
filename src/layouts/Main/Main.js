import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";
import Header from "../../shared/Header/Header";
import HeaderTop from "../../shared/HeaderTop/HeaderTop";

const Main = () => {
  return (
    <div>
      <HeaderTop />
      <div className="container">
        <Header></Header>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
