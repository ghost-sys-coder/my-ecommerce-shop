const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
  
const MiniProductSkeleton = () => {
  return (
      <div className={`${shimmer} relative overflow-hidden rounded-xl p-2 shadow-xl p-3 bg-gray-200 flex flex-col gap-3`}>
          <div className="bg-gray-300 h-[150px] w-full rounded-md"></div>
          <div className="bg-gray-300 h-[50px] w-full rounded-md"></div>
          <div className="bg-gray-300 h-[50px] w-full rounded-md"></div>
    </div>
  )
}

export default MiniProductSkeleton