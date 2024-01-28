const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const HeaderProductSkeleton = () => {
  return (
    <div
      className={`${shimmer} h-[300px] relative overflow-hidden rounded-xl p-2 shadow-sm flex flex-col justify-center gap-2 p-2 bg-gray-400`}
    >
      <div className="w-[70%] h-[50px] rounded-sm bg-gray-200 rounded-md"></div>
      <div className="w-full h-[100px] rounded-sm bg-gray-200 rounded-md"></div>
      <div className="w-[60%] h-[50px] rounded-sm bg-gray-200 rounded-md"></div>
    </div>
  );
};

export default HeaderProductSkeleton;
