/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";

const CommentForm = ({
  comment, setComment,
  handleProductRating,
  isHandlingRating,
}) => {
    
  return (
      <form onSubmit={handleProductRating}>
          <div className="input-container">
              <label htmlFor="comment">Write a comment:</label>
              <textarea
                  name="comment"
                  placeholder="Leave a review..."
                  value={comment}
                  onChange={(e)=> setComment(e.target.value)}
              />
          </div>
      <button
        type="submit"
        className="flex gap-2 justify-center items-center outline-none"
      >
        {isHandlingRating ? (
          <>
            <Loader2 />
            <span>Submitting Review...</span>
          </>
        ): (
          <span>Submit Review</span>
        )}
      </button>
    </form>
  )
}

export default CommentForm