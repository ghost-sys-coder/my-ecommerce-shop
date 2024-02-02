import { FaStar } from "react-icons/fa";
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const ProductPageSkeleton = () => {
  return (
    <div className={`${shimmer} min-h-[500px] relative overflow-hidden rounded-xl shadow-sm`}>
      <div className="flex flex-col sm:flex-row gap-4 h-[300px]">
        <div className="flex-1 flex flex-col gap-2 rounded-md p-2">
          <div className="h-[200px] w-full rounded-md mt-2 bg-gray-300 border-2 border-neutral-300">
          </div>
          <div className="flex h-[40px] gap-3">
            <div className="h-full w-[50px] rounded-sm bg-gray-300"></div>
            <div className="h-full w-[50px] rounded-sm bg-gray-300"></div>
            <div className="h-full w-[50px] rounded-sm bg-gray-300"></div>
          </div>
        </div>
        <div className="flex-1 rounded-md flex flex-col gap-2 items-start justify-end p-3">
          <div className="h-[40px] w-full bg-gray-300 rounded-md"></div>
          <div className="w-full h-[200px] bg-gray-300 rounded-md"></div>
          <div className="h-[30px] w-[200px] bg-gray-300 rounded-md"></div>
          <div className="h-[30px] w-[200px] bg-gray-300 rounded-md"></div>
          <div className="h-[30px] w-[200px] bg-gray-300 rounded-md"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full my-3 sm:w-[600px] w-full">
        <div className="h-[40px] rounded-md shadow-md bg-gray-300"></div>
        <div className="w-1/2 h-[25px] rounded-md shadow-md bg-gray-300"></div>
        <div className="w-1/2 h-[25px] rounded-md shadow-md bg-gray-300"></div>
        <div className="h-[40px] rounded-md shadow-md bg-gray-300"></div>

        <div className="mt-2 h-[30px] rounded-md shadow-md bg-gray-300"></div>
        <div className="flex gap-3 text-gray-300">
          <FaStar size={25} />
          <FaStar size={25} />
          <FaStar size={25} />
          <FaStar size={25} />
          <FaStar size={25} />
        </div>
        <div className="mt-3 h-[100px] rounded-md bg-gray-300"></div>
        <div className="h-[40px] rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
