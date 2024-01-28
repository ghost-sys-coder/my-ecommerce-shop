import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { HeaderProductSkeleton } from "../skeletons";

/** swiper css */
import 'swiper/css';
import 'swiper/css/navigation';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(products);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /** Swiper */


  return (
    <div className="flex-1 rounded-md p-3 overflow-x-auto">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <HeaderProductSkeleton key={index} />
          ))}
        </div>
      ) : (
          <Swiper
            className="h-[400px] relative"
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              prevEl: '#left',
              nextEl: '#right'
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
            }}
          >
            {products.map(({ _id, title, description,images }) => (
              <SwiperSlide key={_id} className="relative">
                <div className="h-full flex-1 flex justify-center items-center gap-2">
                <img className="w-full h-[350px] object-cover rounded-md" src={images[0]} alt={title} />
                <div className="flex-1 flex flex-col justify-center gap-4 absolute top-0 right-0 left-0 bottom-0 p-2">
                  <h1 className="text-white font-bold text-[1.3rem]">{title}</h1>
                  <div className="text-white font-poppins text-sm" dangerouslySetInnerHTML={{ __html: description.slice(0, 150) }} />
                  <Link className="mt-4 py-2 px-4 rounded-sm text-white bg-theme-500 uppercase text-sm text-center sm:w-[80%] w-full hover:bg-theme-600" to={`products/${title}/${_id}`}>Check Product</Link>
                </div>
                </div>
              </SwiperSlide>
            ))}
            <FaArrowAltCircleLeft id="left" size={30} className="absolute left-0 top-[50%] cursor-pointer z-10 text-theme-500" />
            <FaArrowAltCircleRight id="right" size={30} className="absolute right-0 top-[50%] cursor-pointer z-10 text-theme-500" />
        </Swiper>
      )}
    </div>
  );
};

export default ProductSlider;
