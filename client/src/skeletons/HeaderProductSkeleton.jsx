const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const HeaderProductSkeleton = () => {
  return (
    <div
      className={`${shimmer} h-[300px] relative overflow-hidden rounded-xl p-2 shadow-sm flex flex-col justify-center gap-2 p-2 shadow-md rounded-md`}
    >
      <div className="w-full h-[40px] bg-gray-300 rounded-md"></div>
      <div className="flex flex-col gap-2">
      <div className="w-[70%] h-[40px] rounded-sm bg-gray-300 rounded-md"></div>
      <div className="w-full h-[70px] rounded-sm bg-gray-300 rounded-md"></div>
      <div className="w-[60%] h-[40px] rounded-sm bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default HeaderProductSkeleton;
