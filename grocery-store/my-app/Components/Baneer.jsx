import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const banners = [
    {
      id: 1,
      img: "https://img.freepik.com/premium-photo/mixed-nuts-d…-snack-mix-organic-nuts-dry-fruits_329479-115.jpg",
    },
    {
      id: 2,
      img: "https://groca.myshopify.com/cdn/shop/files/slider-1.jpg?v=1614918563",
    },
    {
      id: 3,
      img: "https://img.freepik.com/free-photo/top-view-spices-blue-background_23-2148596814.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-white">
      <div className="relative mb-12 md:mb-[50px]">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <div
                className="relative bg-center h-[550px] bg-cover"
                style={{ backgroundImage: `url(${banner.img})` }}
              >
                <div className="absolute right-10 bottom-0 top-0 m-auto max-w-[450px] my-[110px]">
                  <motion.div
                    initial="hidden"
                    animate={index === activeIndex ? "visible" : "hidden"}
                    variants={{
                      visible: { transition: { staggerChildren: 0.2 } },
                      hidden: {},
                    }}
                    className="max-md:block p-10 mt-8"
                  >
                    <motion.h1
                      variants={textVariants}
                      transition={{ duration: 0.6 }}
                      className="text-4xl mb-[20px] max-md:text-[30px] max-md:flex justify-center"
                    >
                      <div
                        className="tracking-wider"
                        style={{ fontFamily: "EB Garamond" }}
                      >
                        Natural Health Care Ingredients
                      </div>
                    </motion.h1>

                    <motion.p
                      variants={textVariants}
                      transition={{ duration: 0.7 }}
                      className="text-4xl font-bold"
                      style={{ color: "#D08126" }}
                    >
                      Grocery Shopping
                    </motion.p>

                    <motion.p
                      variants={textVariants}
                      transition={{ duration: 0.7 }}
                      className="mt-4 text-2xl"
                    >
                      Save up to 30% off
                    </motion.p>

                    <motion.div
                      variants={textVariants}
                      transition={{ duration: 0.7 }}
                      className="flex-col justify-center md:justify-start mt-6"
                    >
                      {/* <button
                        className="py-3 px-5 border-2 text-nowrap"
                        style={{ borderColor: "#c9ab81" }}
                      >
                        Shop Now
                      </button> */}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
