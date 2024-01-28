const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const CategorySkeleton = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl p-2 shadow-xl`}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <div className="h-[50px] w-[50px] rounded-full bg-gray-400"></div>
          <div className="h-[15px] flex-1 rounded-sm bg-gray-400"></div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
