import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import toast, { Toaster } from "react-hot-toast";
import { ProductBoxSkeleton } from "../skeletons";
import { Navigation, Autoplay } from "swiper/modules";
import { ProductPageSkeleton } from "../skeletons";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/ShoppingCartContext";
import { AddToCartBtn, ProductDescription, ProductDetailsBox, Rating } from "../components";

/** swiper css */
import "swiper/css";
import "swiper/css/navigation";

const Product = () => {
  const navigate = useNavigate();
  const { userProfile, isUserAuthenticated } = useAuthContext();
  const { fetchUserCartProfile, setOpenCartModal, isRateLoading, exchangeRate } = useCartContext();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [mainImgUrl, setMainImgUrl] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isRelatedProductsLoading, setIsRelatedProductsLoading] =
    useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const { pathname } = useLocation();
  const title = pathname.split("/")[2];
  const id = pathname.split("/")[3];


  /** fetch product */
  useEffect(() => {
    const fetchProduct = async () => {
      setIsProductLoading(true);
      try {
        const { data } = await axios.get(`/products/${title}/${id}`);
        setMainImgUrl(data?.images[0]);
        setProduct(data);
        setCategoryId(data?.category._id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProductLoading(false);
      }
    };
    fetchProduct();
  }, [title, id]);

  /** fetch related products */
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setIsRelatedProductsLoading(true);
      try {
        const { data } = await axios.get(`/products/${categoryId}`);
        console.log({ data });
        setRelatedProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsRelatedProductsLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [categoryId]);

  /** handle Main Image */
  const handleMainImage = (imageUrl) => {
    setMainImgUrl(imageUrl);
  };

  /** handle add to cart */
  const handleAddToCart = async (id, productPrice) => {
    setIsAddingToCart(true);
    try {
      const { status } = await axios.post(`/cart/add-to-cart/${id}`, {
        userId: userProfile?._id,
        productId: id,
        sizes: selectedSizes,
        colors: selectedColors,
        quantity,
        price: productPrice,
      });
      await fetchUserCartProfile();
      if (status === 200) {
        toast.success("Product added successfully!", {
          duration: 5000,
          style: {
            backgroundColor: "lightgreen",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        duration: 5000,
        style: {
          backgroundColor: "red",
          color: "white",
          fontSize: 12,
        },
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          navigate(`/login?redirectTo=${pathname}`);
        }, 2000);
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  /** handle buy now button action */
  const handleBuyNow = async (id, productPrice) => {
    setIsBuyingNow(true);
    try {
      const { status } = await axios.post(`/cart/add-to-cart/${id}`, {
        userId: userProfile?._id,
        productId: id,
        sizes: selectedSizes,
        colors: selectedColors,
        quantity,
        price: productPrice,
      });
      if (status === 200) {
        toast.success("Product added successfully!", {
          duration: 5000,
          style: {
            backgroundColor: "lightgreen",
            color: "white",
          },
        });
        await fetchUserCartProfile();
        setTimeout(() => {
          setOpenCartModal(true);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        duration: 5000,
        style: {
          backgroundColor: "red",
          color: "white",
          fontSize: 12,
        },
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          navigate(`/login?redirectTo=${pathname}`);
        }, 2000);
      }
    } finally {
      setIsBuyingNow(false);
    }
  };

  /** handle sizes */
  const handleSizes = (size) => {
    setSelectedSizes((prevValues) => {
      if (prevValues.includes(size)) {
        return prevValues.filter((s) => s !== size);
      } else {
        return [...prevValues, size];
      }
    });
  };

  /** handle colors */
  const handleColors = (color) => {
    setSelectedColors((prevValues) => {
      if (prevValues.includes(color)) {
        return prevValues.filter((c) => c !== color);
      } else {
        return [...prevValues, color];
      }
    });
  };


  return (
    <div className="min-h-[400px] py-6 px-6 max-w-[1200px] mx-auto relative">
      {isProductLoading ? (
        <ProductPageSkeleton />
      ) : (
        <>
          <div className="product-details">
            <div className="images">
              <img className="main-image" src={mainImgUrl} alt="image" />
              <div className="flex-images">
                {product?.images?.map((image, index) => (
                  <img
                    className={image === mainImgUrl ? "active-image" : "image"}
                    onClick={() => handleMainImage(image)}
                    key={index}
                    src={image}
                    alt={`product-image-${index}`}
                  />
                ))}
              </div>
            </div>
            <div className="info--payment">
              <h1 className="product-title">{product?.title}</h1>
              <ProductDescription description={product?.description} />
              {product?.sizes[0] && (
                <div className="product-sizes">
                  <h1 className="title">Choose Your Size</h1>
                  <div className="sizes">
                    {product?.sizes[0]?.split(",").map((size, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleSizes(size)}
                        className={
                          selectedSizes.includes(size) ? "active-btn" : "btn"
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {product?.colors && (
                <div className="product-colors">
                  <h1 className="title">Choose your color</h1>
                  <div className="colors">
                    {product?.colors?.split(",").map((color, index) => (
                      <button
                        type="button"
                        style={
                          selectedColors.includes(color)
                            ? { backgroundColor: "teal" }
                            : { backgroundColor: color }
                        }
                        key={index}
                        onClick={() => handleColors(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="product-rating">
                <span>4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <div className="more-info">
                <p className="price">$ {isRateLoading ? 'loading...' : (Math.ceil(product?.price * exchangeRate) + 0.99)}</p>
                <AddToCartBtn
                  quantity={quantity}
                  setQuantity={setQuantity}
                  handleAddToCart={handleAddToCart}
                  id={product?._id}
                  isAddingToCart={isAddingToCart}
                  isBuyingNow={isBuyingNow}
                  price={product?.price}
                  product={product}
                  handleBuyNow={handleBuyNow}
                />
              </div>
            </div>
          </div>
          {product?.productDetails && (
            <ProductDetailsBox product={product?.productDetails} />
            )}
            <div className="review">
              <h1 className="title">Leave a review for the product</h1>
              <Rating
                  productId={id}
                  userId={userProfile?._id}
                userName={userProfile?.name}
                isUserAuthenticated={isUserAuthenticated}
                pathname={pathname}
                />
            </div>
        </>
      )}
      <div className="my-8">
        <h1 className="font-semibold text-xl pb-4">You may also like</h1>
        {isRelatedProductsLoading ? (
          <div className="grid gap-3 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductBoxSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Swiper
            className="relative"
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
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              991: { slidesPerView: 4 },
            }}
          >
            {relatedProducts.map(({ _id, images, title, price }) => (
              <SwiperSlide key={_id}>
                <Link to={`/products/${title}/${_id}`}>
                  <div className="w-full h-[150px] rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={images[0]}
                      alt={title}
                    />
                  </div>
                  <div className="flex flex-col gap-[2px] mt-2">
                    <h3 className="font-semibold">{title}</h3>
                    <div className="flex gap-2 items-center justify-start">
                      <span className="font-semibold">4.5</span>
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStarHalfAlt className="text-yellow-400" />
                    </div>
                    <p className="font-semibold">
                      ${ isRateLoading ? 'loading...' : (Math.ceil(price * exchangeRate) + 0.99)}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
            <div
              id="left"
              className="shadow-lg border-2 border-200 rounded-md p-2 inline-block bg-theme-500 text-white cursor-pointer absolute top-[20%] left-2 z-30"
            >
              <MdArrowBackIos className="font-bold" />
            </div>
            <div
              id="right"
              className="shadow-lg border-2 border-200 rounded-md p-2 inline-block absolute right-2 bg-theme-500 text-white cursor-pointer top-[20%] z-30"
            >
              <MdArrowForwardIos className="font-bold" />
            </div>
          </Swiper>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Product;
