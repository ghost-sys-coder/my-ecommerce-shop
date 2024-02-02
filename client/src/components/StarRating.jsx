/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i <= 5; i++){
            stars.push(
                <FaStar
                    key={i}
                    size={15}
                    color={i <= rating ? 'yellow': 'gray'}
                />
            )
        }

        return stars;
    }
  return (
      <div className="flex gap-2 justify-start items-center">
          {renderStars()}
          <p className="text-sm font-semibold text-theme-500">{rating} stars</p>
    </div>
  )
}

export default StarRating