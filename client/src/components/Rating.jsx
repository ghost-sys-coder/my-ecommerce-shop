/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import CommentForm from "./CommentForm";
import { toastErrorOptions } from "../constants/index.js";
import StarRating from "./StarRating.jsx";

const Rating = ({ productId, userId, userName }) => {
  const [isHandlingRating, setIsHandlingRating] = useState(false);
  const [isProductPurchased, setIsProductPurchased] = useState(undefined);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productRatings, setProductRatings] = useState([]);


  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  /** check whether the current user has already purchased this product */
  useEffect(() => {
    const checkIfCurrentUserHasPurchasedProduct = async () => {
      try {
        const { data } = await axios.get(
          `/orders/check-purchase/paid?userId=${userId}&productId=${productId}`
        );
        setIsProductPurchased(data.hasPurchased);
      } catch (error) {
        console.log(error);
      }
    };
    checkIfCurrentUserHasPurchasedProduct();
  }, [productId, userId]);


  /** submit product rating details */
  const handleProductRating = async (event) => {
    event.preventDefault();

    /** validate */
    if (!rating || rating === 0) {
      return toast.error('Please provide a star rating...', toastErrorOptions);
    }

    if (!comment) {
      return toast.error('Please write a review...', toastErrorOptions);
    }

    setIsHandlingRating(true);

    try {
      const { data, status } = await axios.post('/rating/create', {
        userId,
        productId,
        rating,
        comment,
        userName
      });
      console.log({ data });
      toast.success(data);
      if (status === 200) {
        fetchProductRatings();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, toastErrorOptions);
    } finally {
      setIsHandlingRating(false);
    }
  }

  /** handle fetching product ratings */
  const fetchProductRatings = useCallback(async () => {
    try {
      const { data } = await axios.get(`rating/${productId}`);
      console.log({ data });
      setProductRatings(data);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductRatings();
  }, [fetchProductRatings])

  return (
    <div>
      {isProductPurchased ? (
        <>
          <div className="flex gap-2 justify-start items-center my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={25}
                color={star <= rating ? "#ffc107" : "gray"}
                style={{ cursor: "pointer" }}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
          <CommentForm
            comment={comment}
            setComment={setComment}
            handleProductRating={handleProductRating}
            isHandlingRating={isHandlingRating}
          />
        </>
      ) : (
        <div className="py-2 text-sm font-semibold text-theme-500 flex flex-col gap-1">
            <p>Product reviews are made by those that have purchased the product!</p>
            <p>To ensure that the reviews are real and genuine!</p>
        </div>
      )}
      <div className="comments">
        <h3 className="text-center font-semibold text-theme-700 text-xl">Product Reviews</h3>
        {!productRatings.length ? (
          <p className="text-theme-700 font-semibold text-center">This product has  no reviews!</p>
        ) : (
          productRatings.map(({ _id, rating, userName, comment }) => (
            <div className="" key={_id}>
              <p className="text-theme-700 font-semibold">{comment}</p>
              <StarRating rating={rating} />
              <p className="text-sm font-semibold text-theme-700 pl-2">By <span>{userName}</span></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Rating;
