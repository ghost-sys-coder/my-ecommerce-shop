const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const OrdersPageSkeleton = () => {
  return (
      <div className={`${shimmer} relative overflow-hidden rounded-xl p-2 shadow-xl flex md:flex-row flex-col gap-4 max-w-[1200px] mx-auto`}>
          <div className="flex-1">
              <div className="bg-gray-200 h-[50px] w-full rounded-sm my-5"></div>
              <div className="bg-gray-200 h-[40px] w-full rounded-sm mb-4"></div>

              <div className="sm:w-1/3 w-full">
                <div className="bg-gray-200 h-[30px] w-full rounded-sm mb-2"></div>
                <div className="bg-gray-200 h-[30px] w-full rounded-sm mb-2"></div>
                <div className="bg-gray-200 h-[30px] w-full rounded-sm mb-2"></div>
                <div className="bg-gray-200 h-[30px] w-full rounded-sm mb-2"></div>
                <div className="bg-gray-200 h-[30px] w-full rounded-sm mb-2"></div>
                <div className="bg-gray-200 h-[30px] w-full rounded-sm mb-2"></div>
              </div>

              <div className="bg-gray-200 h-[50px] w-full rounded-sm mb-4"></div>

              <div className="sm:w-1/3 w-full">
                  <div className="bg-gray-200 h-[30px] w-full rounded-sm mb-3"></div>
                  <div className="bg-gray-200 h-[25px] w-full rounded-sm"></div>
              </div>

              <div className="bg-gray-200 h-[50px] w-full rounded-sm mb-4"></div>

              <div className="bg-gray-200 h-[50px] w-full rounded-sm mb-4"></div>

              <div className="flex flex-col gap-2">
                  <div className="flex gap-3 justify-between items-center">
                      <div className="w-[50px] h-[50px] rounded-sm bg-gray-200"></div>
                      <div className="w-[100px] h-[30px] rounded-sm bg-gray-200"></div>
                  </div>
                  <div className="flex gap-3 justify-between items-center">
                      <div className="w-[50px] h-[50px] rounded-sm bg-gray-200"></div>
                      <div className="w-[100px] h-[30px] rounded-sm bg-gray-200"></div>
                  </div>
              </div>

          </div> 
          <div className="sm:w-[350px] w-full rounded-md p-2 border-[2px] border-gray-200 flex flex-col gap-2">
             <div className="h-[50px] w-full bg-gray-200 rounded-sm"></div> 
             <div className="h-[50px] w-full bg-gray-200 rounded-sm"></div> 
             <div className="h-[50px] w-full bg-gray-200 rounded-sm"></div> 
             <div className="h-[50px] w-full bg-gray-200 rounded-sm"></div> 
             <div className="h-[50px] w-full bg-gray-200 rounded-sm"></div> 
             <div className="h-[50px] w-full bg-gray-200 rounded-sm"></div> 
          </div>
    </div>
  )
}

export default OrdersPageSkeleton