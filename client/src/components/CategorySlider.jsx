/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { CategorySliderSkeleton } from "../skeletons";

const CategorySlider = ({ categories, isLoading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="my-10">
      {isLoading ? (
      <CategorySliderSkeleton />
      ) : (
        <Swiper
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: "#left",
            nextEl: "#right",
          }}
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 2 },
            400: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            991: { slidesPerView: 5 },
          }}
          className="relative"
        >
          <div className="flex justify-between items-center gap-4 my-2">
            <FaArrowAltCircleLeft
              id="left"
              size={25}
              className="text-theme-500 cursor-pointer"
            />
            <FaArrowAltCircleRight
              id="right"
              size={25}
              className="text-theme-500 cursor-pointer"
            />
          </div>
          {categories.map(({ _id, category, imgUrl }) => (
            <SwiperSlide
              key={_id}
              className="bg-gray-300 rounded-md flex flex-col gap-2 items-center p-3"
            >
              <div className="w-[100px] h-[100px]">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={imgUrl}
                  alt={category}
                />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-sm text-theme-500">
                  {category}
                </h1>
                <Link
                  className="text-[10px] py-1 px-3 rounded-sm bg-theme-500 text-white hover:bg-theme-600"
                  to={`categories/${category}/${_id}`}
                >
                  SHOP
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CategorySlider;
