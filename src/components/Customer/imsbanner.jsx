import React, { useRef, useState } from "react";
import { ims1, ims2, ims3, ims4, ims5 } from "../../assets/assets.js";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./imsbanner.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Imsbanner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={ims4} alt="Banner" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ims3} alt="Banner" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ims5} alt="Banner" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
