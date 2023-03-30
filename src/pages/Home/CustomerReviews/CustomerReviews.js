import React, { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../../shared/Loader/Loader";
import Titles from "../../../utilities/Titles";
import ReviewCard from "./ReviewCard";
import { AiOutlineSwapLeft, AiOutlineSwapRight } from "react-icons/ai";
const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const ReviewRef = useRef();
  useEffect(() => {
    fetch("test.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);
  const handlePrev = () => {
    ReviewRef.current.swiper.slidePrev();
  };
  const handleNext = () => {
    ReviewRef.current.swiper.slideNext();
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <section id="reviews" className="py-8 md:py-16 lg:py-20 ">
      <div className="container">
        <Titles>Customer Reviews</Titles>
        <div className=" mt-10 relative">
          <AiOutlineSwapLeft
            onClick={handlePrev}
            className="text-3xl absolute -left-10 top-2/4 -translate-y-2/4 cursor-pointer hidden lg:block"
          />
          <AiOutlineSwapRight
            onClick={handleNext}
            className="text-3xl absolute -right-10 top-2/4 -translate-y-2/4 cursor-pointer hidden lg:block"
          />
          <Swiper
            ref={ReviewRef}
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
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
          >
            {reviews?.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
