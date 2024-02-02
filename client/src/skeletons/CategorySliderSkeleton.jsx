import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

/** swiper css */
import "swiper/css";
import "swiper/css/navigation";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const CategorySliderSkeleton = () => {
  return (
    <Swiper
      className={`${shimmer}`}
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
        0: { slidesPerView: 1 },
        400: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        991: { slidesPerView: 5 },
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <SwiperSlide key={index} className="rounded-md shadow-md flex flex-col justify-center items-center gap-2 p-3">
          <div className="bg-gray-200 w-[200px] h-[100px] shadow-md rounded-sm"></div>
          <div className="h-5 w-full rounded-sm bg-gray-200"></div>
          <div className="h-5 w-full rounded-sm bg-gray-200"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySliderSkeleton;
