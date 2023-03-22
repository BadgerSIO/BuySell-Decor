import React, { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";
import { AuthContext } from "../../../context/AuthProvider";
import Titles from "../../../utilities/Titles";
import ProductAdvertCard from "./ProductAdvertCard";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const ProductSection = ({ products }) => {
  const { user } = useContext(AuthContext);
  const SlideRef = useRef();
  const handlePrev = () => {
    SlideRef.current.swiper.slidePrev();
  };
  const handleNext = () => {
    SlideRef.current.swiper.slideNext();
  };
  const btnStyle =
    "inline-block sm:p-3 sm:border border-gray-300 hover:bg-primary hover:text-white text-xl rounded transition-colors duration-300";
  return (
    <section className="pb-8 md:pb-16 lg:pb-20">
      <div className="container">
        <div className="flex justify-between">
          <Titles>Best from sellers</Titles>
          <div className="flex justify-end space-x-3 sm:mb-3">
            <button onClick={handlePrev} className={btnStyle}>
              <MdNavigateBefore />
            </button>
            <button onClick={handleNext} className={btnStyle}>
              <MdNavigateNext />
            </button>
          </div>
        </div>

        <div className="py-5 ">
          <Swiper
            ref={SlideRef}
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            loop
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Autoplay]}
          >
            {products?.map((product) => (
              <SwiperSlide key={product?._id}>
                <ProductAdvertCard
                  product={product}
                  userIsLogged={user}
                ></ProductAdvertCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
