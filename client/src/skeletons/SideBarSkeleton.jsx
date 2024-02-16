const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const SideBarSkeleton = () => {
    return (
        <div className={`${shimmer} h-full w-full bg-white flex flex-col gap-4 p-2`}>
            {Array.from({ length: 3 }).map((_, index)=> (
            <div key={index} className="w-full h-[40px] bg-gray-200 shadow-md rounded-sm"></div>
            ))}
        </div>
    )
};


export default SideBarSkeleton;