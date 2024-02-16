/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductDescription = ({ description }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [controlChevron, setControlChevron] = useState(false);

  const handleMobileDescDisplay = () => {
    setShowDescription((value) => !value);
    setControlChevron((value) => !value);
  };

  return (
    <>
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="sm:hidden flex flex-col gap-3 my-4">
        <div
          className="flex justify-between items-center h-[50px] px-2 border border-gray-200 rounded-md
        "
          onClick={handleMobileDescDisplay}
        >
          <p className="font-semibold text-gray-700">Product Description</p>
          {controlChevron ? (
            <ChevronUp className="font-semibold text-gray-700 text-xl" />
          ) : (
            <ChevronDown className="font-semibold text-gray-700 text-xl" />
          )}
        </div>
        {showDescription && (
          <div
            className="mobile-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </>
  );
};

export default ProductDescription;
