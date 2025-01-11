import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Swiper 8+ modules
import "swiper/css";
import "swiper/css/pagination";
import { NavLink } from "react-router-dom";

const slidesData = [
  {
    id: 1,
    image:
      "https://i.ibb.co.com/jJVBwfB/istockphoto-1456918406-612x612.jpg",
    header: "Freshly Cooked, Just for You",
    sort: "Every meal is prepared with love and delivered fresh to your doorstep",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co.com/JyB6DFm/istockphoto-1474203885-612x612.webp",
    header: "antalizing Flavors, Anytime Anywhere",
    sort: "Experience gourmet dishes with the convenience of online ordering",
  },
  {
    id: 3,
    image:
      "https://i.ibb.co.com/LRTvSMD/istockphoto-2165003462-612x612.jpg",
    header: "Special Offers for Food Lovers",
    sort: "Explore a wide range of freshly prepared dishes, ready to satisfy your cravings",
  },
];

const Slider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full"
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="hero h-[280px] md:h-[500px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="hero-overlay bg-opacity-65"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 md:text-5xl text-2xl font-bold text-white">
                  {slide.header}
                </h1>
                <p className="mb-5 text-white">{slide.sort}</p>
                <button className="py-3 px-6 bg-[rgb(246,140,60)] text-white font-semibold rounded-lg shadow-md hover:bg-brow transition duration-300 ease-in-out">
                  <NavLink
                    to="/allFoods"
                    className="block w-full h-full text-center"
                  >
                    All Foods
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
