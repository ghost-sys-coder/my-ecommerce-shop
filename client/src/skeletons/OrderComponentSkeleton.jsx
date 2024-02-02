const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const OrderComponentSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl p-2 shadow-xl flex flex-col gap-4 py-6 px-6 max-w-[900px] mx-auto`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className="h-[100px] flex gap-4 justify-between shadow-sm"
          key={index}
        >
          <div className="w-[100px] h-full rounded-md shadow-md bg-gray-200"></div>
          <div className="flex flex-1 flex-col gap-2 justify-end items-end">
            <div className="flex-1 w-full rounded-md shadow-md bg-gray-200"></div>
            <div className="flex-1 w-full rounded-md shadow-md bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderComponentSkeleton;
