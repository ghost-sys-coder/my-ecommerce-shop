const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const ProductPageSkeleton = () => {
  return (
      <div className={`${shimmer} relative overflow-hidden rounded-xl shadow-xl`}>
          <div className="flex flex-col sm:flex-row gap-4 h-[300px]">
              <div className="h-full flex-1 bg-gray-400 rounded-md p-2">
                  <div className="h-[80%] w-full rounded-md mt-2 bg-gray-300 border-2 border-neutral-300"></div>
                  {/* <div className="flex gap-3">
                      <div className=" w-[50px] rounded-sm bg-gray-300 border-2 border-neutral-400"></div>
                      <div className=" w-[50px] rounded-sm bg-gray-300 border-2 border-neutral-400"></div>
                      <div className=" w-[50px] rounded-sm bg-gray-300 border-2 border-neutral-400"></div>
                  </div> */}
              </div>
              <div className="h-full flex-1 bg-gray-400 rounded-md flex flex-col gap-2 items-start justify-end p-3">
                  <div className="h-7 w-[70%] bg-gray-300 rounded-md"></div>
                  <div className="h-7 w-[70%] bg-gray-300 rounded-md"></div>
                  <div className="h-7 w-[70%] bg-gray-300 rounded-md"></div>
              </div>
          </div>  
    </div>
  )
}

export default ProductPageSkeleton