const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

const ProductBoxSkeleton = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-400 p-2 shadow-sm`}>
      <div className="h-36 bg-gray-200 rounded-md"></div>
      <div className="py-4">
        <div className="w-2/3 h-5 rounded-md bg-gray-400" />
        <div className="flex justify-between items-start gap-2 mt-4">
          <div className="flex flex-col gap-1 text-sm flex-1">
            <div className="bg-gray-200 w-full h-5 rounded-md" />
            <div className="bg-gray-200 w-full h-5 rounded-md" />
          </div>
          <div className="bg-gray-200 flex-1 h-4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProductBoxSkeleton;